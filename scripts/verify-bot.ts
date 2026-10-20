import { parseListing, slugify, inferCategory } from '../lib/listing-parser.ts'
import { verifySignature } from '../lib/whatsapp.ts'
import crypto from 'crypto'

let pass = 0
let fail = 0

function check(name: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual)
  const e = JSON.stringify(expected)
  if (a === e) {
    pass++
    console.log(`  PASS  ${name}`)
  } else {
    fail++
    console.log(`  FAIL  ${name}\n        expected ${e}\n        actual   ${a}`)
  }
}

console.log('\nreal submission - KSB pump, exactly as the owner types it')
const ksb = parseListing(
  [
    'KSB WKLn 65/3 multistage ccentrifugal pump pto driven',
    '',
    'looking for reliable hgh water solution for your farm or plot? This robust, genuine KSB (finish name) is built fofr serious agricultural andd irrigation workk',
    '',
    'R55k no vat',
  ].join('\n'),
)
check('name is the title line', ksb.name, 'KSB WKLn 65/3 multistage ccentrifugal pump pto driven')
check('category inferred as support', ksb.category_slug, 'support')
check('make inferred from title', ksb.make, 'KSB')
check('R55k normalised to rands', ksb.price, 'R55 000')
check('no vat captured, wording preserved', ksb.vat, 'no VAT')
check(
  'description is the prose only, price line removed',
  ksb.description,
  'looking for reliable hgh water solution for your farm or plot? This robust, genuine KSB (finish name) is built fofr serious agricultural andd irrigation workk',
)
check('typos left exactly as written', ksb.description.includes('ccentrifugal'), false)
check('no year invented for a pump', ksb.year, '')
check('no hours invented for a pump', ksb.hours, '')
check('slug from the title', slugify(ksb.name), 'ksb-wkln-65-3-multistage-ccentrifugal-pump-pto-driven')

console.log('\nprice formats')
check('k suffix', parseListing('X\nR55k').price, 'R55 000')
check('m suffix with decimal', parseListing('X\nR1.2m').price, 'R1 200 000')
check('spaced thousands', parseListing('X\nR850 000').price, 'R850 000')
check('comma thousands', parseListing('X\nR270,000').price, 'R270 000')
check('bare amount with k', parseListing('X\n55k no vat').price, 'R55 000')
check('POA wording', parseListing('X\nPOA').price, 'POA')
check('price word prefix', parseListing('X\nPrice R90k ex vat').price, 'R90 000')
check('missing price defaults to POA', parseListing('X\njust some prose here').price, 'POA')

console.log('\nvat wording')
check('ex vat', parseListing('X\nR90k ex vat').vat, 'ex VAT')
check('excluding vat', parseListing('X\nR90k excluding vat').vat, 'ex VAT')
check('incl vat', parseListing('X\nR90k incl vat').vat, 'incl VAT')
check('plus vat', parseListing('X\nR90k plus vat').vat, 'plus VAT')
check('no vat phrasing kept distinct from ex vat', parseListing('X\nR90k no vat').vat, 'no VAT')

console.log('\namounts inside prose are not treated as the price')
const prose = parseListing(
  [
    'Komatsu D41 Dozer',
    'This machine would cost you R2.5m new from the dealer but we are clearing it out',
    'R850 000 ex vat',
  ].join('\n'),
)
check('price comes from the dedicated price line', prose.price, 'R850 000')
check('vat from price line', prose.vat, 'ex VAT')
check('prose amount stays in the description', prose.description.includes('R2.5m'), true)
check('category inferred as yellow equipment', prose.category_slug, 'yellow-equipment')
check('make inferred', prose.make, 'Komatsu')

console.log('\nexplicit keys still win over inference')
const keyed = parseListing(
  ['KSB pump', 'category: agricultural', 'make: Grundfos', 'price: R12 345', 'location: Mbombela'].join('\n'),
)
check('explicit category overrides keyword guess', keyed.category_slug, 'agricultural')
check('explicit make overrides brand guess', keyed.make, 'Grundfos')
check('explicit price kept verbatim', keyed.price, 'R12 345')
check('location', keyed.location, 'Mbombela')

console.log('\ninference details')
check('tractor to agricultural', inferCategory('John Deere 6155R tractor'), 'agricultural')
check('chipper to forestry', inferCategory('Bandit timber chipper'), 'forestry')
check('generator to support', inferCategory('diesel generator 100kva'), 'support')
check('unknown stays empty for the bot to ask', inferCategory('shiny red thing'), '')
check('JD canonicalised', parseListing('JD 6155R Tractor').make, 'John Deere')
check('CAT canonicalised', parseListing('CAT 320 excavator').make, 'Caterpillar')
check('year from model wording', parseListing('Bell B40E 2018 model').year, '2018')
check('hours grouped like existing data', parseListing('X\nhas done 7200 hrs since new').hours, '7 200')

console.log('\nnothing the sender typed is discarded')
const loose = parseListing('Hitachi ZX350\nStrong undercarriage\nNew bucket')
check('loose lines joined into description', loose.description, 'Strong undercarriage New bucket')
check('unknown keys kept, never dropped', parseListing('X\nserviced: at 6000hrs').description.length > 0, true)
check('explicit desc wins over loose lines', parseListing('X\nloose\ndesc: real').description, 'real')

console.log('\nslugify matches admin convention')
check('spaces and caps', slugify('Komatsu D41 Dozer'), 'komatsu-d41-dozer')
check('punctuation stripped', slugify('JD 6155R -- Tractor!'), 'jd-6155r-tractor')
check('no leading or trailing dashes', slugify('  Bell B40E  '), 'bell-b40e')

console.log('\nverifySignature')
process.env.WHATSAPP_APP_SECRET = 'test-secret'
const body = '{"entry":[{"changes":[]}]}'
const good = 'sha256=' + crypto.createHmac('sha256', 'test-secret').update(body).digest('hex')
check('valid signature accepted', verifySignature(body, good), true)
check('tampered body rejected', verifySignature(body + 'x', good), false)
check('wrong secret rejected', verifySignature(body, 'sha256=' + 'a'.repeat(64)), false)
check('missing header rejected', verifySignature(body, null), false)
check('malformed header rejected', verifySignature(body, 'md5=abc'), false)

console.log(`\nTests run: ${pass + fail}`)
console.log(`Tests passed: ${pass}`)
console.log(`Tests skipped: 0`)
console.log(`Tests failed: ${fail}`)
if (fail > 0) process.exit(1)
