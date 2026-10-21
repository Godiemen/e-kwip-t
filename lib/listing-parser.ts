export type ParsedListing = {
  name: string
  category_slug: string
  make: string
  year: string
  hours: string
  price: string
  vat: string
  location: string
  condition: string[]
  description: string
}

const FIELD_ALIASES: Record<string, keyof ParsedListing> = {
  name: 'name',
  machine: 'name',
  category: 'category_slug',
  cat: 'category_slug',
  make: 'make',
  brand: 'make',
  year: 'year',
  hours: 'hours',
  hrs: 'hours',
  price: 'price',
  vat: 'vat',
  location: 'location',
  loc: 'location',
  condition: 'condition',
  description: 'description',
  desc: 'description',
  notes: 'description',
}

const KNOWN_MAKES: { canonical: string; patterns: string[] }[] = [
  { canonical: 'Atlas Copco', patterns: ['atlas copco'] },
  { canonical: 'John Deere', patterns: ['john deere', 'deere', 'jd'] },
  { canonical: 'Massey Ferguson', patterns: ['massey ferguson', 'massey', 'mf'] },
  { canonical: 'New Holland', patterns: ['new holland'] },
  { canonical: 'Ingersoll Rand', patterns: ['ingersoll rand', 'ingersoll'] },
  { canonical: 'Caterpillar', patterns: ['caterpillar', 'cat'] },
  { canonical: 'Liebherr', patterns: ['liebherr'] },
  { canonical: 'Komatsu', patterns: ['komatsu'] },
  { canonical: 'Hitachi', patterns: ['hitachi'] },
  { canonical: 'Hyundai', patterns: ['hyundai'] },
  { canonical: 'Bobcat', patterns: ['bobcat'] },
  { canonical: 'Doosan', patterns: ['doosan'] },
  { canonical: 'Kubota', patterns: ['kubota'] },
  { canonical: 'Landini', patterns: ['landini'] },
  { canonical: 'Perkins', patterns: ['perkins'] },
  { canonical: 'Cummins', patterns: ['cummins'] },
  { canonical: 'Yanmar', patterns: ['yanmar'] },
  { canonical: 'Valtra', patterns: ['valtra'] },
  { canonical: 'Deutz', patterns: ['deutz'] },
  { canonical: 'Terex', patterns: ['terex'] },
  { canonical: 'Volvo', patterns: ['volvo'] },
  { canonical: 'Bell', patterns: ['bell'] },
  { canonical: 'Case', patterns: ['case'] },
  { canonical: 'JCB', patterns: ['jcb'] },
  { canonical: 'KSB', patterns: ['ksb'] },
  { canonical: 'Sany', patterns: ['sany'] },
  { canonical: 'XCMG', patterns: ['xcmg'] },
]

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  support: [
    'pump',
    'generator',
    'genset',
    'compressor',
    'welder',
    'irrigation',
    'borehole',
    'centrifugal',
  ],
  forestry: ['forwarder', 'chipper', 'mulcher', 'skidder', 'feller', 'timber', 'firewood'],
  agricultural: [
    'tractor',
    'harvester',
    'planter',
    'baler',
    'plough',
    'plow',
    'sprayer',
    'combine',
    'ripper',
    'tiller',
    'boomspray',
  ],
  'yellow-equipment': [
    'excavator',
    'dozer',
    'bulldozer',
    'adt',
    'dump truck',
    'front end loader',
    'tlb',
    'grader',
    'backhoe',
    'roller',
    'compactor',
    'skid steer',
  ],
  mining: ['haul truck', 'drill rig', 'lhd', 'shuttle car', 'rock breaker'],
}

const VAT_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\bno\s*vat\b/i, label: 'no VAT' },
  { re: /\b(?:ex|excl|excluding)\s*\.?\s*vat\b/i, label: 'ex VAT' },
  { re: /\b(?:incl|including|inc)\s*\.?\s*vat\b/i, label: 'incl VAT' },
  { re: /\b(?:plus|\+)\s*vat\b/i, label: 'plus VAT' },
  { re: /\bvat\s*(?:excl|excluded)\b/i, label: 'ex VAT' },
  { re: /\bvat\s*(?:incl|included)\b/i, label: 'incl VAT' },
]

const PRICE_WITH_R = /R\s*(\d[\d.,\s]*?)\s*(k|m)?(?=$|[^\dk.,\s]|\s*$)/i
const PRICE_BARE = /^\s*(\d[\d.,]*)\s*(k|m)\b/i
const POA_RE = /\b(?:poa|price on application|negotiable|make an offer)\b/i

/**
 * Matches the slug convention used by the admin screen so bot-created and
 * hand-created listings are indistinguishable.
 */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Groups thousands with a plain ASCII space, matching the existing listing
 * data. Deliberately avoids toLocaleString, which emits a non-breaking space.
 */
function groupThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function formatRands(amount: number): string {
  return 'R' + groupThousands(amount)
}

function toAmount(digits: string, suffix: string | undefined): number | null {
  const cleaned = digits.replace(/[\s,]/g, '')
  const value = Number.parseFloat(cleaned)
  if (!Number.isFinite(value) || value <= 0) return null

  const multiplier = suffix?.toLowerCase() === 'k' ? 1_000 : suffix?.toLowerCase() === 'm' ? 1_000_000 : 1
  return value * multiplier
}

function matchVat(line: string): { label: string; matched: string } | null {
  for (const { re, label } of VAT_PATTERNS) {
    const m = line.match(re)
    if (m) return { label, matched: m[0] }
  }
  return null
}

type PriceLine = { price: string; vat: string }

/**
 * Treats a line as a dedicated price line only when almost nothing remains
 * after the amount and any VAT wording are removed. This stops an amount
 * mentioned inside marketing copy from being read as the asking price.
 */
function asPriceLine(line: string): PriceLine | null {
  const vat = matchVat(line)
  let remainder = vat ? line.replace(vat.matched, ' ') : line
  let price = ''

  const withR = remainder.match(PRICE_WITH_R)
  const bare = withR ? null : remainder.match(PRICE_BARE)
  const hit = withR ?? bare

  if (hit) {
    const amount = toAmount(hit[1], hit[2])
    if (amount === null) return null
    price = formatRands(amount)
    remainder = remainder.replace(hit[0], ' ')
  } else if (POA_RE.test(remainder)) {
    price = 'POA'
    remainder = remainder.replace(POA_RE, ' ')
  } else {
    return null
  }

  const leftover = remainder.replace(/\b(?:price|asking|only|incl|excl|for|at|is)\b/gi, ' ').trim()
  const leftoverWords = leftover.split(/\s+/).filter(Boolean)
  if (leftoverWords.length > 2) return null

  return { price, vat: vat?.label ?? '' }
}

function inferMake(name: string): string {
  const haystack = name.toLowerCase()
  for (const { canonical, patterns } of KNOWN_MAKES) {
    for (const pattern of patterns) {
      const re = new RegExp(`\\b${pattern.replace(/\s+/g, '\\s+')}\\b`)
      if (re.test(haystack)) return canonical
    }
  }
  return ''
}

/**
 * Picks the category whose keywords appear most often in the listing text.
 * Returns an empty string when nothing matches, so the caller can ask rather
 * than guess.
 */
export function inferCategory(text: string): string {
  const haystack = text.toLowerCase()
  let best = ''
  let bestScore = 0

  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter((k) => haystack.includes(k)).length
    if (score > bestScore) {
      best = slug
      bestScore = score
    }
  }
  return best
}

function inferYear(name: string): string {
  const explicit = name.match(/\b(19[5-9]\d|20[0-4]\d)\s*(?:model|my)\b/i)
  if (explicit) return explicit[1]

  const bare = name.match(/\b(19[5-9]\d|20[0-4]\d)\b/)
  return bare ? bare[1] : ''
}

function inferHours(text: string): string {
  const m = text.match(/(\d[\d\s,]*)\s*(?:hrs?|hours)\b/i)
  if (!m) return ''
  const cleaned = m[1].replace(/[\s,]/g, '')
  if (!cleaned) return ''
  const value = Number.parseInt(cleaned, 10)
  return Number.isFinite(value) ? groupThousands(value) : ''
}

/**
 * Parses an accumulated WhatsApp submission into listing fields.
 *
 * Handles the way listings are actually written: a title line, free-form
 * marketing copy, and a short price line such as "R55k no vat". Explicit
 * "key: value" lines are still honoured and always win over inference.
 * Text is never discarded, and never reworded.
 */
export function parseListing(text: string): ParsedListing {
  const parsed: ParsedListing = {
    name: '',
    category_slug: '',
    make: '',
    year: '',
    hours: '',
    price: '',
    vat: '',
    location: '',
    condition: [],
    description: '',
  }

  const descriptionLines: string[] = []
  let explicitDescription = ''

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    const sep = line.indexOf(':')
    const key = sep > 0 ? line.slice(0, sep).trim().toLowerCase() : ''
    const field = FIELD_ALIASES[key]

    if (field) {
      const value = line.slice(sep + 1).trim()
      if (!value) continue

      if (field === 'condition') {
        parsed.condition = value
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean)
      } else if (field === 'category_slug') {
        parsed.category_slug = slugify(value)
      } else if (field === 'description') {
        explicitDescription = value
      } else {
        parsed[field] = value
      }
      continue
    }

    if (!parsed.name) {
      parsed.name = line
      continue
    }

    const priceLine = !parsed.price ? asPriceLine(line) : null
    if (priceLine) {
      parsed.price = priceLine.price
      if (priceLine.vat && !parsed.vat) parsed.vat = priceLine.vat
      continue
    }

    descriptionLines.push(line)
  }

  parsed.description = explicitDescription || descriptionLines.join(' ')

  if (!parsed.category_slug) {
    parsed.category_slug = inferCategory(`${parsed.name} ${parsed.description}`)
  }
  if (!parsed.make) parsed.make = inferMake(parsed.name)
  if (!parsed.year) parsed.year = inferYear(parsed.name)
  if (!parsed.hours) parsed.hours = inferHours(`${parsed.name} ${parsed.description}`)
  if (!parsed.price) parsed.price = 'POA'

  return parsed
}

export const FORMAT_HELP = [
  'Just send it the way you would write an advert:',
  '',
  'Line 1 - the machine name',
  'Then  - the description, as many lines as you like',
  'Then  - the price on its own line, e.g. R55k no vat',
  '',
  'Attach the photos, then tap Post it or send DONE.',
  '',
  'I work out the category, make, year and hours where I can.',
  'To set one yourself, add a line like "category: support".',
  'Send CANCEL to discard.',
].join('\n')
