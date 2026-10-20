import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import {
  verifySignature,
  sendText,
  sendPostPrompt,
  downloadMedia,
  POST_BUTTON_ID,
  CANCEL_BUTTON_ID,
} from '@/lib/whatsapp'
import { parseListing, slugify, FORMAT_HELP, type ParsedListing } from '@/lib/listing-parser'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type PendingRow = {
  phone: string
  text_parts: string[]
  image_urls: string[]
}

function ok() {
  return new NextResponse('OK', { status: 200 })
}

function normalisePhone(p: string): string {
  return p.replace(/\D/g, '')
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (
    verifyToken &&
    params.get('hub.mode') === 'subscribe' &&
    params.get('hub.verify_token') === verifyToken
  ) {
    return new NextResponse(params.get('hub.challenge') ?? '', { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  const raw = await req.text()

  if (!verifySignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  let message: any
  try {
    const body = JSON.parse(raw)
    message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
  } catch {
    return ok()
  }

  if (!message?.from) return ok()

  const owner = process.env.OWNER_WHATSAPP
  if (!owner || normalisePhone(message.from) !== normalisePhone(owner)) {
    console.warn('[whatsapp] ignoring message from non-owner')
    return ok()
  }

  try {
    await handleOwnerMessage(message)
  } catch (err) {
    console.error('[whatsapp] handler threw', err)
    await sendText(message.from, 'Something went wrong on my side. Nothing was posted.')
  }

  return ok()
}

async function handleOwnerMessage(message: any) {
  const from: string = message.from

  if (message.type === 'interactive') {
    const buttonId: string | undefined = message.interactive?.button_reply?.id
    if (buttonId === POST_BUTTON_ID) {
      await publishPending(from)
      return
    }
    if (buttonId === CANCEL_BUTTON_ID) {
      await clearPending(from)
      await sendText(from, 'Discarded. Nothing was posted.')
      return
    }
    return
  }

  if (message.type === 'text') {
    const body: string = message.text?.body?.trim() ?? ''
    const command = body.toUpperCase()

    if (command === 'HELP') {
      await sendText(from, FORMAT_HELP)
      return
    }
    if (command === 'CANCEL') {
      await clearPending(from)
      await sendText(from, 'Cleared. Nothing was posted.')
      return
    }
    if (command === 'DONE') {
      await publishPending(from)
      return
    }

    await acknowledge(from, await appendText(from, body))
    return
  }

  if (message.type === 'image') {
    const mediaId: string | undefined = message.image?.id
    if (!mediaId) return

    const media = await downloadMedia(mediaId)
    if (!media) {
      await sendText(from, 'I could not download that photo. Please send it again.')
      return
    }

    const supabase = getSupabaseAdmin()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${media.ext}`
    const { error } = await supabase.storage.from('machines').upload(fileName, media.bytes, {
      cacheControl: '3600',
      upsert: false,
      contentType: media.mimeType,
    })

    if (error) {
      console.error('[whatsapp] storage upload failed', error.message)
      await sendText(from, 'Photo upload failed. Please send it again.')
      return
    }

    const { data } = supabase.storage.from('machines').getPublicUrl(fileName)
    const caption: string = message.image?.caption?.trim() ?? ''
    await acknowledge(from, await appendImage(from, data.publicUrl, caption))
    return
  }

  await sendText(from, 'I can only handle photos and text. Send HELP for the format.')
}

async function getPending(phone: string): Promise<PendingRow> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from('whatsapp_pending')
    .select('phone, text_parts, image_urls')
    .eq('phone', phone)
    .maybeSingle()

  return (data as PendingRow) ?? { phone, text_parts: [], image_urls: [] }
}

async function savePending(row: PendingRow): Promise<PendingRow> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('whatsapp_pending').upsert(
    {
      phone: row.phone,
      text_parts: row.text_parts,
      image_urls: row.image_urls,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'phone' },
  )
  if (error) throw new Error(`pending upsert failed: ${error.message}`)
  return row
}

async function clearPending(phone: string) {
  const supabase = getSupabaseAdmin()
  await supabase.from('whatsapp_pending').delete().eq('phone', phone)
}

type AppendResult = { row: PendingRow; wasEmpty: boolean }

function isEmpty(row: PendingRow): boolean {
  return !row.text_parts.length && !row.image_urls.length
}

async function appendText(phone: string, text: string): Promise<AppendResult> {
  const pending = await getPending(phone)
  const wasEmpty = isEmpty(pending)
  if (text) pending.text_parts = [...pending.text_parts, text]
  return { row: await savePending(pending), wasEmpty }
}

async function appendImage(phone: string, url: string, caption: string): Promise<AppendResult> {
  const pending = await getPending(phone)
  const wasEmpty = isEmpty(pending)
  pending.image_urls = [...pending.image_urls, url]
  if (caption) pending.text_parts = [...pending.text_parts, caption]
  return { row: await savePending(pending), wasEmpty }
}

/**
 * Prompts with tappable buttons the first time something is added to a
 * submission, then acknowledges quietly. The buttons stay tappable in the
 * chat history, so one prompt per submission is enough.
 */
async function acknowledge(from: string, result: AppendResult) {
  const photos = result.row.image_urls.length
  const status = `Saved. ${photos} photo${photos === 1 ? '' : 's'} so far.`

  if (result.wasEmpty) await sendPostPrompt(from, status)
  else await sendText(from, status)
}

async function validCategorySlugs(): Promise<string[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('categories').select('slug')
  if (error) throw new Error(`category lookup failed: ${error.message}`)
  return (data ?? []).map((c: { slug: string }) => c.slug)
}

async function uniqueSlug(base: string): Promise<string> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('machines').select('slug').like('slug', `${base}%`)
  if (error) throw new Error(`slug lookup failed: ${error.message}`)

  const taken = new Set((data ?? []).map((m: { slug: string }) => m.slug))
  if (!taken.has(base)) return base

  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

function summarise(listing: ParsedListing, slug: string, photoCount: number): string {
  const rows = [
    `Name: ${listing.name}`,
    `Category: ${listing.category_slug}`,
    listing.make && `Make: ${listing.make}`,
    listing.year && `Year: ${listing.year}`,
    listing.hours && `Hours: ${listing.hours}`,
    `Price: ${listing.price}${listing.vat ? ` (${listing.vat})` : ''}`,
    listing.location && `Location: ${listing.location}`,
    `Photos: ${photoCount}`,
  ].filter(Boolean)

  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  const link = base ? `\n\n${base}/stock/${slug}` : `\n\nSlug: ${slug}`
  return `Posted.\n\n${rows.join('\n')}${link}`
}

async function publishPending(from: string) {
  const pending = await getPending(from)
  const text = pending.text_parts.join('\n').trim()

  if (!text && !pending.image_urls.length) {
    await sendText(from, 'Nothing to post yet. Send photos and details first, then DONE.')
    return
  }

  const listing = parseListing(text)

  if (!listing.name) {
    await sendText(from, 'I need a machine name before I can post. Send HELP for the format.')
    return
  }

  const categories = await validCategorySlugs()
  if (!categories.includes(listing.category_slug)) {
    await sendText(
      from,
      `I need a valid category. Reply with one of:\n${categories
        .map((c) => `category: ${c}`)
        .join('\n')}\n\nThen send DONE again. Your photos and details are still saved.`,
    )
    return
  }

  const slug = await uniqueSlug(slugify(listing.name))
  const [cover, ...rest] = pending.image_urls

  await clearPending(from)

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('machines').insert({
    slug,
    name: listing.name,
    category_slug: listing.category_slug,
    image: cover ?? null,
    images: rest,
    price: listing.price,
    vat: listing.vat || null,
    year: listing.year || 'Unknown',
    hours: listing.hours || 'Unknown',
    location: listing.location || 'Unknown',
    make: listing.make || 'Unknown',
    condition: listing.condition,
    description: listing.description || null,
    featured: false,
  })

  if (error) {
    console.error('[whatsapp] insert failed', error.message)
    await savePending(pending)
    await sendText(from, `Could not post: ${error.message}\n\nYour submission is still saved. Fix and send DONE again.`)
    return
  }

  await sendText(from, summarise(listing, slug, pending.image_urls.length))
}
