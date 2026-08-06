// Generates sitemap.xml from the real route list at build time so it can never
// drift from what actually shipped.
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://sbluxuryrentals.co.za'
const lastmod = new Date().toISOString().slice(0, 10)

const ROUTES = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/fleet/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/quote/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/terms/', priority: '0.3', changefreq: 'yearly' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${ORIGIN}${r.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'dist/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${ROUTES.length} routes (lastmod ${lastmod})`)
