import crypto from 'crypto'

const GRAPH_VERSION = 'v23.0'

function graphUrl(path: string): string {
  return `https://graph.facebook.com/${GRAPH_VERSION}/${path}`
}

function token(): string {
  const t = process.env.WHATSAPP_TOKEN
  if (!t) throw new Error('WHATSAPP_TOKEN is not set')
  return t
}

/**
 * Verifies Meta's X-Hub-Signature-256 header against the raw request body.
 * Must be given the exact raw body string, not a re-serialised object.
 */
export function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET
  if (!secret || !header?.startsWith('sha256=')) return false

  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(header)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/**
 * Sends a plain text WhatsApp message. Never throws: a failed reply should not
 * take down the webhook, which must still return 200 to stop Meta retrying.
 */
export async function sendText(to: string, body: string): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!phoneNumberId) return

  try {
    const res = await fetch(graphUrl(`${phoneNumberId}/messages`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { preview_url: false, body },
      }),
    })
    if (!res.ok) {
      console.error('[whatsapp] sendText failed', res.status, await res.text())
    }
  } catch (err) {
    console.error('[whatsapp] sendText threw', err)
  }
}

export const POST_BUTTON_ID = 'post_listing'
export const CANCEL_BUTTON_ID = 'cancel_listing'

/**
 * Sends a message with tappable Post it / Discard buttons. Falls back to a
 * plain text message if the interactive send fails, so the sender is never
 * left without a reply.
 */
export async function sendPostPrompt(to: string, body: string): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!phoneNumberId) return

  try {
    const res = await fetch(graphUrl(`${phoneNumberId}/messages`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: body },
          action: {
            buttons: [
              { type: 'reply', reply: { id: POST_BUTTON_ID, title: 'Post it' } },
              { type: 'reply', reply: { id: CANCEL_BUTTON_ID, title: 'Discard' } },
            ],
          },
        },
      }),
    })
    if (!res.ok) {
      console.error('[whatsapp] sendPostPrompt failed', res.status, await res.text())
      await sendText(to, `${body}\n\nSend DONE to post, or CANCEL to discard.`)
    }
  } catch (err) {
    console.error('[whatsapp] sendPostPrompt threw', err)
    await sendText(to, `${body}\n\nSend DONE to post, or CANCEL to discard.`)
  }
}

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export type DownloadedMedia = {
  bytes: Buffer
  mimeType: string
  ext: string
}

/**
 * Resolves a WhatsApp media id to its bytes. This is deliberately two calls:
 * the id yields a short-lived URL, and that URL still requires the bearer
 * token to fetch.
 */
export async function downloadMedia(mediaId: string): Promise<DownloadedMedia | null> {
  try {
    const metaRes = await fetch(graphUrl(mediaId), {
      headers: { Authorization: `Bearer ${token()}` },
    })
    if (!metaRes.ok) {
      console.error('[whatsapp] media lookup failed', metaRes.status)
      return null
    }

    const meta = (await metaRes.json()) as { url?: string; mime_type?: string }
    if (!meta.url) return null

    const fileRes = await fetch(meta.url, {
      headers: { Authorization: `Bearer ${token()}` },
    })
    if (!fileRes.ok) {
      console.error('[whatsapp] media download failed', fileRes.status)
      return null
    }

    const mimeType = meta.mime_type?.split(';')[0]?.trim() || 'image/jpeg'
    return {
      bytes: Buffer.from(await fileRes.arrayBuffer()),
      mimeType,
      ext: EXT_BY_MIME[mimeType] ?? 'jpg',
    }
  } catch (err) {
    console.error('[whatsapp] downloadMedia threw', err)
    return null
  }
}
