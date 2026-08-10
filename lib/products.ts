export type CategorySlug =
  | 'agricultural'
  | 'forestry'
  | 'yellow-equipment'
  | 'mining'
  | 'support'
  | 'commercial-vehicles'

export type Category = {
  slug: CategorySlug
  name: string
  shortName: string
  blurb: string
  image: string
}

export type Machine = {
  slug: string
  name: string
  category: CategorySlug
  image: string
  price: string // "R270 000" or "POA"
  vat?: string // e.g. "ex VAT"
  year: string
  hours: string
  location: string
  make: string
  condition: string[]
  description: string
  specs: { label: string; value: string }[]
  featured?: boolean
}

export const CONTACT = {
  name: 'Terrence',
  displayPhone: '082 636 5471',
  waNumber: '27826365471',
  email: 'sales@ekwipt.co.za',
  company: 'E-kwip-T Sales and Service (Pty) Ltd',
}

export function waLink(machineName?: string): string {
  const text = machineName
    ? `Hi E-kwip-T, I'd like more information on the ${machineName}.`
    : `Hi E-kwip-T, I'd like to ask about a machine.`
  return `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(text)}`
}

export function waOrderLink(machine: { name: string; price: string; vat?: string; year: string; hours: string; location: string; make: string }): string {
  const lines = [
    `Hi E-kwip-T, I'd like to order / enquire about:`,
    ``,
    `Machine: ${machine.name}`,
    `Make: ${machine.make}`,
    `Year: ${machine.year}`,
    `Hours: ${machine.hours}`,
    `Price: ${machine.price}${machine.vat ? ` (${machine.vat})` : ''}`,
    `Location: ${machine.location}`,
    ``,
    `Is this still available? Please send me more details.`
  ]
  return `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(lines.join('\n'))}`
}

export const categories: Category[] = [
  {
    slug: 'agricultural',
    name: 'Agricultural Equipment',
    shortName: 'Agricultural',
    blurb: 'Tractors, harvesters, tillage and hay equipment for the farm.',
    image: '/machines/jd-6155r-tractor.png',
  },
  {
    slug: 'forestry',
    name: 'Forestry Equipment',
    shortName: 'Forestry',
    blurb: 'Harvesters, forwarders, chippers and mulchers for plantation work.',
    image: '/machines/forestry-harvester.png',
  },
  {
    slug: 'yellow-equipment',
    name: 'Yellow Equipment',
    shortName: 'Yellow Equipment',
    blurb: 'Dozers, ADTs, excavators and loaders for earthmoving and civils.',
    image: '/machines/bell-b40e-adt.png',
  },
  {
    slug: 'mining',
    name: 'Mining Plant',
    shortName: 'Mining',
    blurb: 'Haul trucks, loaders, drill rigs and graders for the pit.',
    image: '/machines/rigid-dump-truck.png',
  },
  {
    slug: 'support',
    name: 'Support Machinery',
    shortName: 'Support',
    blurb: 'Generators, compressors, pumps and site support gear.',
    image: '/machines/diesel-generator.png',
  },
  {
    slug: 'commercial-vehicles',
    name: 'Commercial Vehicles',
    shortName: 'Vehicles',
    blurb: 'Trucks, vans, bakkies and light commercial vehicles for business and site work.',
    image: '/machines/jcb-3cx-backhoe.png',
  },
]

export const machines: Machine[] = [
  // ---------- YELLOW EQUIPMENT ----------
  {
    slug: 'komatsu-d41-dozer',
    name: 'Komatsu D41 Dozer',
    category: 'yellow-equipment',
    image: '/machines/komatsu-d41-dozer.png',
    price: 'R270 000',
    vat: 'ex VAT',
    year: 'Unknown',
    hours: 'Unknown',
    location: 'North Coast, KZN',
    make: 'Komatsu',
    condition: ['Undercarriage in good condition', 'Machine running well', 'More pictures available'],
    description:
      'Komatsu D41 crawler dozer with canopy. Hours and year unknown but the undercarriage is in good condition and the machine is running well. More pictures available on request.',
    specs: [
      { label: 'Type', value: 'Crawler Dozer' },
      { label: 'Undercarriage', value: 'Good condition' },
      { label: 'Runs', value: 'Yes, running well' },
      { label: 'Location', value: 'North Coast, KZN' },
    ],
    featured: true,
  },
  {
    slug: 'bell-b25d-adt',
    name: '2003 Bell B25D 6x6 ADT',
    category: 'yellow-equipment',
    image: '/machines/bell-b25d-adt.png',
    price: 'POA',
    year: '2003',
    hours: '37 000',
    location: 'Benoni, Gauteng',
    make: 'Bell',
    condition: ['Rebuilt at 18 000 hours', 'Axles and dropbox attended to', 'Video footage available'],
    description:
      '2003 Bell B25D 6x6 articulated dump truck. Showing 37 000 hours with a rebuild carried out at 18 000 hours. Axles and dropbox have been attended to. Video footage available on request. Machine based in the Benoni area, Gauteng.',
    specs: [
      { label: 'Configuration', value: '6x6 ADT' },
      { label: 'Year', value: '2003' },
      { label: 'Hours', value: '37 000' },
      { label: 'Rebuild', value: 'At 18 000 hrs' },
      { label: 'Location', value: 'Benoni, Gauteng' },
    ],
    featured: true,
  },
  {
    slug: 'bell-b30e-adt',
    name: 'Bell B30E 6x6 ADT',
    category: 'yellow-equipment',
    image: '/machines/bell-b30e-adt.png',
    price: 'POA',
    year: '2018',
    hours: '12 400',
    location: 'Pietermaritzburg, KZN',
    make: 'Bell',
    condition: ['Full service history', 'Tyres 70% plus', 'Ready to work'],
    description:
      'Bell B30E 6x6 articulated dump truck with a full service history. Tyres at 70% plus and the machine is ready to work. Inspection welcome.',
    specs: [
      { label: 'Configuration', value: '6x6 ADT' },
      { label: 'Payload', value: '28 t class' },
      { label: 'Year', value: '2018' },
      { label: 'Hours', value: '12 400' },
      { label: 'Location', value: 'Pietermaritzburg, KZN' },
    ],
    featured: true,
  },
  {
    slug: 'bell-b40e-adt',
    name: 'Bell B40E 6x6 ADT',
    category: 'yellow-equipment',
    image: '/machines/bell-b40e-adt.png',
    price: 'POA',
    year: '2019',
    hours: '9 800',
    location: 'Richards Bay, KZN',
    make: 'Bell',
    condition: ['Low hours', 'Recent service', 'Excellent condition'],
    description:
      'Low-hour Bell B40E 6x6 articulated dump truck in excellent condition with a recent service. A strong, high-payload hauler ready for the pit or civils site.',
    specs: [
      { label: 'Configuration', value: '6x6 ADT' },
      { label: 'Payload', value: '39 t class' },
      { label: 'Year', value: '2019' },
      { label: 'Hours', value: '9 800' },
      { label: 'Location', value: 'Richards Bay, KZN' },
    ],
    featured: true,
  },
  {
    slug: 'jcb-3cx-backhoe',
    name: 'JCB 3CX Backhoe Loader',
    category: 'yellow-equipment',
    image: '/machines/jcb-3cx-backhoe.png',
    price: 'R650 000',
    vat: 'ex VAT',
    year: '2020',
    hours: '4 200',
    location: 'Durban, KZN',
    make: 'JCB',
    condition: ['4x4', 'Extending dipper', 'Well maintained'],
    description:
      'JCB 3CX backhoe loader with 4x4 drive and extending dipper. Well maintained with tidy hours. A versatile all-rounder for civils, plumbing and general site work.',
    specs: [
      { label: 'Type', value: 'Backhoe Loader' },
      { label: 'Drive', value: '4x4' },
      { label: 'Year', value: '2020' },
      { label: 'Hours', value: '4 200' },
      { label: 'Location', value: 'Durban, KZN' },
    ],
  },

  // ---------- AGRICULTURAL ----------
  {
    slug: 'john-deere-6155r-tractor',
    name: 'John Deere 6155R Tractor',
    category: 'agricultural',
    image: '/machines/jd-6155r-tractor.png',
    price: 'R980 000',
    vat: 'ex VAT',
    year: '2019',
    hours: '5 100',
    location: 'Winterton, KZN',
    make: 'John Deere',
    condition: ['155 hp', 'Front axle suspension', 'Cab with aircon'],
    description:
      '155 hp John Deere 6155R utility tractor with front axle suspension and a comfortable air-conditioned cab. A reliable mid-frame workhorse for mixed farming.',
    specs: [
      { label: 'Power', value: '155 hp' },
      { label: 'Drive', value: '4WD' },
      { label: 'Year', value: '2019' },
      { label: 'Hours', value: '5 100' },
      { label: 'Location', value: 'Winterton, KZN' },
    ],
    featured: true,
  },
  {
    slug: 'trailed-disc-harrow',
    name: 'Trailed Disc Harrow 28-Disc',
    category: 'agricultural',
    image: '/machines/disc-harrow.png',
    price: 'R135 000',
    vat: 'ex VAT',
    year: '2021',
    hours: 'N/A',
    location: 'Bergville, KZN',
    make: 'Focus',
    condition: ['28 discs', 'Discs in good order', 'Ready to till'],
    description:
      'Heavy-duty trailed disc harrow with 28 discs in good order. Ready to hook up and till. Ideal for primary and secondary land preparation.',
    specs: [
      { label: 'Type', value: 'Trailed Disc Harrow' },
      { label: 'Discs', value: '28' },
      { label: 'Condition', value: 'Good' },
      { label: 'Location', value: 'Bergville, KZN' },
    ],
  },
  {
    slug: 'combine-harvester',
    name: 'John Deere Combine Harvester',
    category: 'agricultural',
    image: '/machines/combine-harvester.png',
    price: 'POA',
    year: '2016',
    hours: '3 600',
    location: 'Bethlehem, Free State',
    make: 'John Deere',
    condition: ['Grain header included', 'Recently serviced', 'Field ready'],
    description:
      'John Deere combine harvester with grain header included. Recently serviced and field ready for the coming season. Full inspection welcome.',
    specs: [
      { label: 'Type', value: 'Combine Harvester' },
      { label: 'Header', value: 'Grain, included' },
      { label: 'Year', value: '2016' },
      { label: 'Engine Hours', value: '3 600' },
      { label: 'Location', value: 'Bethlehem, Free State' },
    ],
  },
  {
    slug: 'round-baler',
    name: 'Round Baler',
    category: 'agricultural',
    image: '/machines/round-baler.png',
    price: 'R210 000',
    vat: 'ex VAT',
    year: '2018',
    hours: 'N/A',
    location: 'Vryheid, KZN',
    make: 'John Deere',
    condition: ['Net and twine wrap', 'Belts in good order', 'Bale count low'],
    description:
      'Round baler with net and twine wrap and belts in good order. Low bale count. A tidy unit for hay and silage operations.',
    specs: [
      { label: 'Type', value: 'Round Baler' },
      { label: 'Wrap', value: 'Net & twine' },
      { label: 'Belts', value: 'Good order' },
      { label: 'Location', value: 'Vryheid, KZN' },
    ],
  },

  // ---------- FORESTRY ----------
  {
    slug: 'forestry-harvester',
    name: 'Forestry Harvester',
    category: 'forestry',
    image: '/machines/forestry-harvester.png',
    price: 'POA',
    year: '2017',
    hours: '11 200',
    location: 'Sabie, Mpumalanga',
    make: 'John Deere',
    condition: ['Harvesting head included', 'Tracks 60%', 'Working machine'],
    description:
      'Tracked forestry harvester with harvesting head included. Tracks at 60% and the machine is working. Ideal for plantation felling and processing.',
    specs: [
      { label: 'Type', value: 'Harvester' },
      { label: 'Head', value: 'Included' },
      { label: 'Year', value: '2017' },
      { label: 'Hours', value: '11 200' },
      { label: 'Location', value: 'Sabie, Mpumalanga' },
    ],
    featured: true,
  },
  {
    slug: 'forestry-forwarder',
    name: 'Forestry Forwarder',
    category: 'forestry',
    image: '/machines/forestry-forwarder.png',
    price: 'POA',
    year: '2016',
    hours: '13 500',
    location: 'Richmond, KZN',
    make: 'Ponsse',
    condition: ['Crane and grapple', 'Bogie tracks', 'Recently serviced'],
    description:
      'Forestry forwarder with loading crane and grapple, fitted with bogie tracks for soft ground. Recently serviced and ready to extract.',
    specs: [
      { label: 'Type', value: 'Forwarder' },
      { label: 'Crane', value: 'With grapple' },
      { label: 'Year', value: '2016' },
      { label: 'Hours', value: '13 500' },
      { label: 'Location', value: 'Richmond, KZN' },
    ],
  },
  {
    slug: 'wood-chipper',
    name: 'Towable Wood Chipper',
    category: 'forestry',
    image: '/machines/wood-chipper.png',
    price: 'R320 000',
    vat: 'ex VAT',
    year: '2020',
    hours: '1 900',
    location: 'Howick, KZN',
    make: 'Bandit',
    condition: ['Diesel engine', 'Sharp knives', 'Road towable'],
    description:
      'Towable diesel wood chipper with recently sharpened knives. Road towable and ready for site clearing and green-waste work.',
    specs: [
      { label: 'Type', value: 'Wood Chipper' },
      { label: 'Drive', value: 'Diesel' },
      { label: 'Year', value: '2020' },
      { label: 'Hours', value: '1 900' },
      { label: 'Location', value: 'Howick, KZN' },
    ],
  },
  {
    slug: 'forestry-mulcher',
    name: 'Tracked Forestry Mulcher',
    category: 'forestry',
    image: '/machines/forestry-mulcher.png',
    price: 'POA',
    year: '2021',
    hours: '2 400',
    location: 'Nelspruit, Mpumalanga',
    make: 'Cat',
    condition: ['Mulching head', 'Rubber tracks', 'Low hours'],
    description:
      'Compact tracked machine with a forestry mulching head. Low hours on rubber tracks. Ideal for land clearing, firebreaks and bush encroachment.',
    specs: [
      { label: 'Type', value: 'Mulcher' },
      { label: 'Tracks', value: 'Rubber' },
      { label: 'Year', value: '2021' },
      { label: 'Hours', value: '2 400' },
      { label: 'Location', value: 'Nelspruit, Mpumalanga' },
    ],
  },

  // ---------- MINING ----------
  {
    slug: 'rigid-dump-truck',
    name: 'Rigid Dump Truck',
    category: 'mining',
    image: '/machines/rigid-dump-truck.png',
    price: 'POA',
    year: '2015',
    hours: '22 000',
    location: 'Middelburg, Mpumalanga',
    make: 'Komatsu',
    condition: ['Rigid haul truck', 'Engine strong', 'Pit ready'],
    description:
      'Rigid mining haul truck with a strong engine, ready for the pit. High-payload hauling for open-cast operations. Inspection and load test welcome.',
    specs: [
      { label: 'Type', value: 'Rigid Haul Truck' },
      { label: 'Year', value: '2015' },
      { label: 'Hours', value: '22 000' },
      { label: 'Location', value: 'Middelburg, Mpumalanga' },
    ],
    featured: true,
  },
  {
    slug: 'wheel-loader',
    name: 'Large Wheel Loader',
    category: 'mining',
    image: '/machines/wheel-loader.png',
    price: 'POA',
    year: '2017',
    hours: '16 800',
    location: 'Kathu, Northern Cape',
    make: 'Cat',
    condition: ['Rock bucket', 'Tyres 65%', 'Well maintained'],
    description:
      'Large wheel loader fitted with a rock bucket. Tyres at 65% and well maintained. A capable primary loader for stockpiles and truck loading.',
    specs: [
      { label: 'Type', value: 'Wheel Loader' },
      { label: 'Bucket', value: 'Rock' },
      { label: 'Year', value: '2017' },
      { label: 'Hours', value: '16 800' },
      { label: 'Location', value: 'Kathu, Northern Cape' },
    ],
  },
  {
    slug: 'surface-drill-rig',
    name: 'Surface Drill Rig',
    category: 'mining',
    image: '/machines/drill-rig.png',
    price: 'POA',
    year: '2016',
    hours: '9 400',
    location: 'Rustenburg, North West',
    make: 'Sandvik',
    condition: ['Tracked', 'Compressor on board', 'Working'],
    description:
      'Tracked surface drilling rig with on-board compressor. A working machine suited to blast-hole drilling on open-cast benches.',
    specs: [
      { label: 'Type', value: 'Surface Drill Rig' },
      { label: 'Chassis', value: 'Tracked' },
      { label: 'Year', value: '2016' },
      { label: 'Hours', value: '9 400' },
      { label: 'Location', value: 'Rustenburg, North West' },
    ],
  },
  {
    slug: 'motor-grader',
    name: 'Motor Grader',
    category: 'mining',
    image: '/machines/motor-grader.png',
    price: 'R1 450 000',
    vat: 'ex VAT',
    year: '2018',
    hours: '8 700',
    location: 'Lephalale, Limpopo',
    make: 'Cat',
    condition: ['Ripper fitted', 'Blade good', 'Haul-road ready'],
    description:
      'Motor grader with rear ripper fitted and a blade in good order. Ready for haul-road maintenance on mine and civils sites.',
    specs: [
      { label: 'Type', value: 'Motor Grader' },
      { label: 'Ripper', value: 'Fitted' },
      { label: 'Year', value: '2018' },
      { label: 'Hours', value: '8 700' },
      { label: 'Location', value: 'Lephalale, Limpopo' },
    ],
  },

  // ---------- SUPPORT MACHINERY ----------
  {
    slug: 'diesel-generator',
    name: 'Silent Diesel Generator',
    category: 'support',
    image: '/machines/diesel-generator.png',
    price: 'R185 000',
    vat: 'ex VAT',
    year: '2021',
    hours: '1 200',
    location: 'Durban, KZN',
    make: 'FG Wilson',
    condition: ['Canopy / silent', 'Low hours', 'ATS ready'],
    description:
      'Silent canopy diesel generator with low hours, ATS ready. A dependable back-up or site power solution.',
    specs: [
      { label: 'Type', value: 'Diesel Generator' },
      { label: 'Enclosure', value: 'Silent canopy' },
      { label: 'Year', value: '2021' },
      { label: 'Hours', value: '1 200' },
      { label: 'Location', value: 'Durban, KZN' },
    ],
    featured: true,
  },
  {
    slug: 'water-bowser',
    name: 'Towable Water Bowser',
    category: 'support',
    image: '/machines/water-bowser.png',
    price: 'R95 000',
    vat: 'ex VAT',
    year: '2020',
    hours: 'N/A',
    location: 'Newcastle, KZN',
    make: 'Custom',
    condition: ['Pump fitted', 'Spray bar', 'Road towable'],
    description:
      'Towable water bowser with pump and spray bar for dust suppression and site water supply. Road towable and ready to work.',
    specs: [
      { label: 'Type', value: 'Water Bowser' },
      { label: 'Pump', value: 'Fitted' },
      { label: 'Spray Bar', value: 'Yes' },
      { label: 'Location', value: 'Newcastle, KZN' },
    ],
  },
  {
    slug: 'towable-air-compressor',
    name: 'Towable Air Compressor',
    category: 'support',
    image: '/machines/air-compressor.png',
    price: 'R145 000',
    vat: 'ex VAT',
    year: '2019',
    hours: '2 800',
    location: 'Pinetown, KZN',
    make: 'Atlas Copco',
    condition: ['Diesel driven', 'Good output', 'Road towable'],
    description:
      'Diesel-driven towable air compressor with good output. Road towable, ideal for breakers, drills and general compressed-air work on site.',
    specs: [
      { label: 'Type', value: 'Air Compressor' },
      { label: 'Drive', value: 'Diesel' },
      { label: 'Year', value: '2019' },
      { label: 'Hours', value: '2 800' },
      { label: 'Location', value: 'Pinetown, KZN' },
    ],
  },
  {
    slug: 'diesel-forklift',
    name: '3-Ton Diesel Forklift',
    category: 'support',
    image: '/machines/forklift.png',
    price: 'R165 000',
    vat: 'ex VAT',
    year: '2018',
    hours: '6 500',
    location: 'Cato Ridge, KZN',
    make: 'Toyota',
    condition: ['3-ton lift', 'Side shift', 'Solid tyres'],
    description:
      '3-ton diesel forklift with side shift and solid tyres. A reliable yard and warehouse workhorse.',
    specs: [
      { label: 'Type', value: 'Diesel Forklift' },
      { label: 'Capacity', value: '3 ton' },
      { label: 'Year', value: '2018' },
      { label: 'Hours', value: '6 500' },
      { label: 'Location', value: 'Cato Ridge, KZN' },
    ],
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getMachinesByCategory(slug: string): Machine[] {
  return machines.filter((m) => m.category === slug)
}

export function getMachine(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug)
}

export function getFeatured(limit?: number): Machine[] {
  const list = machines.filter((m) => m.featured)
  return typeof limit === 'number' ? list.slice(0, limit) : list
}

export function categoryCount(slug: string): number {
  return machines.filter((m) => m.category === slug).length
}
