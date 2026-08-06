export const SITE = {
  name: 'SB Luxury Rentals',
  legalName: 'SB Luxury Rentals (Pty) Ltd',
  reg: 'K2026/225152/07',
  url: 'https://sbluxuryrentals.co.za',
  email: 'info@sbluxuryrentals.co.za',
  phone: '+27 64 652 0684',
  phoneRaw: '+27646520684',
  whatsapp: '27646520684',
  region: 'Gauteng, South Africa',
  areas: ['Johannesburg', 'Pretoria', 'Sandton', 'Centurion', 'Midrand', 'Kempton Park'],
  minHours: 3,
  maxHours: 12,
  // TODO(client): the old site linked to bare facebook.com / instagram.com / tiktok.com —
  // no handles were ever set. Drop the real handles in here and they flow to the
  // footer, the header and the JSON-LD sameAs array.
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
} as const

export const EVENT_TYPES = [
  'Matric dance',
  'Wedding',
  'Premiere / red carpet',
  'Photo shoot',
  'Music video',
  'Birthday / celebration',
  'Other',
] as const
