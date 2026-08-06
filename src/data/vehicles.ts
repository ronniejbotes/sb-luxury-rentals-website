export type Vehicle = {
  slug: string
  /** Short name used in the selector and the quote form. */
  name: string
  make: string
  /** The oversized word that sits behind the car in the selector. */
  ghost: string
  tagline: string
  /** Client's own copy, carried over from the old site. */
  blurb: string
  accent: string
  plate?: string
  specs: { label: string; value: string }[]
  bestFor: string[]
  /** Transparent cutout used by the selector; falls back to `photo`. */
  cutout: string
  photo: string
  photoSmall: string
  gallery?: { src: string; alt: string }[]
  alt: string
}

export const VEHICLES: Vehicle[] = [
  {
    slug: 'subaru-wrx-sti-itasha',
    name: 'Subaru WRX STI',
    make: 'Subaru',
    ghost: 'STI',
    tagline: 'The Miku car',
    blurb:
      'Vibrant Hatsune Miku anime livery finished in a bold blue fading to pink colour scheme. Featuring the ONLY pink set of heart wheels in South Africa, and a turbo sound that demands attention.',
    accent: '#2BA8F5',
    plate: 'MS OTAKU GP',
    specs: [
      { label: 'Livery', value: 'Hatsune Miku itasha, blue → pink fade' },
      { label: 'Wheels', value: 'Pink heart wheels — the only set in SA' },
      { label: 'Sound', value: 'Turbocharged boxer, full spool' },
      { label: 'Seats', value: '4 passengers + chauffeur' },
    ],
    bestFor: ['Matric dance', 'Music video', 'Photo shoot'],
    cutout: '/img/cut-wrx-sti.webp',
    photo: '/img/wrx-sti-1600.webp',
    photoSmall: '/img/wrx-sti-800.webp',
    gallery: [
      {
        src: '/img/wrx-sti-alt-1600.webp',
        alt: 'Rear quarter of the pink-to-blue Hatsune Miku itasha Subaru WRX STI, a chauffeur-driven show car for hire in Johannesburg',
      },
    ],
    alt: 'Hatsune Miku itasha Subaru WRX STI with pink heart wheels, chauffeur-driven show car for hire in Gauteng',
  },
  {
    slug: 'honda-civic-type-r-fk8-itasha',
    name: 'Honda Civic Type R',
    make: 'Honda',
    ghost: 'TYPE R',
    tagline: 'FK8 · sakura itasha',
    blurb:
      'A turbocharged performance legend wrapped in striking anime itasha artwork and cherry blossom accents. Aggressive Type R styling and race-inspired aero ensure this machine turns heads everywhere it goes.',
    accent: '#F2789E',
    plate: 'OTAKU JR GP',
    specs: [
      { label: 'Livery', value: 'Anime itasha with cherry blossom accents' },
      { label: 'Aero', value: 'Factory Type R wing and race-inspired kit' },
      { label: 'Engine', value: 'Turbocharged VTEC' },
      { label: 'Seats', value: '4 passengers + chauffeur' },
    ],
    bestFor: ['Matric dance', 'Premiere', 'Photo shoot'],
    cutout: '/img/cut-civic-type-r.webp',
    photo: '/img/civic-type-r-1600.webp',
    photoSmall: '/img/civic-type-r-800.webp',
    gallery: [
      {
        src: '/img/civic-type-r-alt-1600.webp',
        alt: 'Side profile of the cherry-blossom itasha Honda Civic Type R FK8 available for chauffeur-driven hire in Pretoria',
      },
    ],
    alt: 'Anime itasha Honda Civic Type R FK8 with cherry blossom livery, chauffeur-driven show car for hire in Gauteng',
  },
  {
    slug: 'rocket-bunny-toyota-gt86',
    name: 'Rocket Bunny GT86',
    make: 'Toyota',
    ghost: 'GT86',
    tagline: 'Widebody · printstream',
    blurb:
      'Bold printstream anime styling paired with a wide-body kit and aggressive aero elements. Finished with a massive rear wing and a striking black-and-white design that guarantees head turns.',
    accent: '#E9E5DC',
    plate: 'OTAKU GP',
    specs: [
      { label: 'Body', value: 'Rocket Bunny widebody kit' },
      { label: 'Livery', value: 'Black-and-white printstream graphics' },
      { label: 'Aero', value: 'Oversized GT rear wing' },
      { label: 'Seats', value: '3 passengers + chauffeur' },
    ],
    bestFor: ['Premiere', 'Music video', 'Photo shoot'],
    cutout: '/img/cut-gt86.webp',
    photo: '/img/gt86-1600.webp',
    photoSmall: '/img/gt86-800.webp',
    gallery: [
      {
        src: '/img/gt86-alt-1600.webp',
        alt: 'Bronze wheel and widebody arch detail on the Rocket Bunny Toyota GT86 show car for hire in Sandton',
      },
    ],
    alt: 'Rocket Bunny widebody Toyota GT86 with printstream livery and GT wing, chauffeur-driven show car for hire in Gauteng',
  },
  {
    slug: 'subaru-wrx-black',
    name: 'Subaru WRX',
    make: 'Subaru',
    ghost: 'WRX',
    tagline: 'Fully built · blacked out',
    blurb:
      'Fully built. Aggressive stance, 18-inch wheels and semi-slicks. Equipped with a roll cage, nitrous system and HKS exhaust for peak performance and sound. Finished with a full body kit and ambient interior lighting for a clean, modern look.',
    accent: '#E8503A',
    specs: [
      { label: 'Wheels', value: '18-inch on semi-slicks' },
      { label: 'Build', value: 'Roll cage, nitrous system, full body kit' },
      { label: 'Exhaust', value: 'HKS' },
      { label: 'Interior', value: 'Ambient lighting' },
    ],
    bestFor: ['Matric dance', 'Birthday', 'Music video'],
    cutout: '/img/cut-wrx.webp',
    photo: '/img/wrx-1600.webp',
    photoSmall: '/img/wrx-800.webp',
    alt: 'Blacked-out fully built Subaru WRX with roll cage and body kit, chauffeur-driven show car for hire in Centurion',
  },
  {
    slug: 'bmw-m2-competition',
    name: 'BMW M2 Competition',
    make: 'BMW',
    ghost: 'M2',
    tagline: 'F87 · bagged',
    blurb:
      'BMW M2 Competition on air, finished with an out-of-this-world wrap and a clean, aggressive stance. Sounds like a beast unleashed from hell, yet looks like an angel descending from heaven. Fitment that will make Tyre-Mart jealous.',
    accent: '#1FC2B7',
    specs: [
      { label: 'Suspension', value: 'Air ride — adjustable stance' },
      { label: 'Finish', value: 'Custom teal wrap' },
      { label: 'Engine', value: 'S55 twin-turbo straight six' },
      { label: 'Seats', value: '3 passengers + chauffeur' },
    ],
    bestFor: ['Wedding', 'Matric dance', 'Premiere'],
    cutout: '/img/cut-m2.webp',
    photo: '/img/m2-1600.webp',
    photoSmall: '/img/m2-800.webp',
    alt: 'Teal-wrapped BMW M2 Competition on air suspension, chauffeur-driven show car for hire in Johannesburg',
  },
  {
    slug: 'toyota-altezza',
    name: 'Toyota Altezza',
    make: 'Toyota',
    ghost: 'ALTEZZA',
    tagline: 'Slammed · gold fitment',
    blurb:
      'Altezza on a slammed setup, finished in a bold magenta that demands attention. Aggressive fitment with gold wheels gives it a loud stance — so precise it looks factory perfected. Also known as the German killer.',
    accent: '#D62C86',
    specs: [
      { label: 'Stance', value: 'Slammed, aggressive fitment' },
      { label: 'Wheels', value: 'Gold multi-spoke' },
      { label: 'Finish', value: 'Bold magenta' },
      { label: 'Seats', value: '4 passengers + chauffeur' },
    ],
    bestFor: ['Matric dance', 'Photo shoot', 'Birthday'],
    cutout: '/img/cut-altezza.webp',
    photo: '/img/altezza-1600.webp',
    photoSmall: '/img/altezza-800.webp',
    alt: 'Magenta slammed Toyota Altezza on gold wheels, chauffeur-driven show car for hire in Midrand',
  },
]
