# SB Luxury Rentals — website

Rebuild of [sbluxuryrentals.co.za](https://sbluxuryrentals.co.za), replacing the Hostinger
website-builder site. Ships as plain static files plus one PHP script, so it drops straight
into Hostinger `public_html` — no Node runtime on the server, no builder lock-in.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/  (also regenerates dist/sitemap.xml)
npm run preview  # serve dist/ locally
```

## Deploying to Hostinger

1. `npm run build`
2. Upload **everything inside `dist/`** (not the folder itself) into `public_html`,
   via hPanel File Manager or FTP. Include the dotfile `.htaccess`.
3. Confirm `public_html/send-quote.php` is there and readable.
4. In hPanel → Emails, make sure the mailbox `info@sbluxuryrentals.co.za` exists.
   PHP `mail()` on Hostinger requires the `From:` address to be a real mailbox on
   the domain, which is why the script sends **from** `info@` and sets
   `Reply-To:` to the person filling in the form.
5. Delete the old builder site from the domain so it stops serving.

### What `.htaccess` does

- forces HTTPS and the non-www host
- 301s the old builder URLs (`/about-sb-luxury-rentals`, `/quote-for-your-luxury-rental`,
  `/luxury-rentals-terms`, `/get-quote`) to the new pages so existing links and rankings survive
- serves a real `404.html` — this is a multi-page build, so there is deliberately **no**
  catch-all rewrite to `index.html` (that trick returns 200 for URLs that do not exist,
  which Google reads as a soft 404)
- long cache on hashed assets, no cache on HTML

## The quote form

`src/pages/Quote.tsx` POSTs JSON to `/send-quote.php`, which emails
**info@sbluxuryrentals.co.za** — the same address the old form used.

- honeypot field + header-injection stripping + length caps
- if the endpoint is missing or the mail server refuses, the UI degrades to
  WhatsApp and `mailto:` links **with the whole enquiry pre-filled**, so a broken
  server never costs a lead
- `?car=<slug>` pre-ticks a car (the selector and fleet page both link that way)

Moving off PHP later? Point the `fetch` in `Quote.tsx` at a Formspree/Web3Forms
endpoint. Nothing else changes.

## Content and assets

Everything came off the live site — logo, all six cars, the descriptions and the
full terms. Originals are kept in `_source-assets/` for reference; the web-ready
WebP versions live in `public/img/`.

The six car cutouts (`public/img/cut-*.webp`) were made by running the real photos
through Higgsfield background removal. **No car imagery is AI-generated** and no
vehicle exists on the site that the business does not actually own.

### Adding or changing a car

`src/data/vehicles.ts` is the single source of truth — the selector, the fleet page,
the quote form's car picker and the footer all read from it. Add an entry, drop
`cut-<name>.webp` and `<name>-1600.webp` into `public/img/`, done.

### Business details

`src/data/site.ts` holds phone, email, service areas and hire limits.

> ⚠️ **Social links are placeholders.** The old site linked to bare
> `facebook.com` / `instagram.com` / `tiktok.com` — no handles were ever set.
> Put the real ones in `SITE.social` and in the `sameAs` array in `index.html`.

## Design direction — "Parkade After Dark"

A basement valet deck at 11pm: cold light on polished concrete, everything near-black,
and the only colour in the room is the car itself. It resolves the tension between a
black-tie script logo and six loud JDM show cars by letting the restraint carry the
luxury and the cars carry the noise.

- **Livery bleed** — the selected car's real colour becomes `--accent` for the whole
  document: buttons, rules, focus rings, the stage light, the ghost lettering.
- **Numberplate device** — cars are badged with their actual plates (`MS OTAKU GP`,
  `OTAKU JR GP`, `OTAKU GP`), set as SA plates.
- **Concrete and tube** — a grain layer and a single fluoro light-bar rule as the
  section divider.
- Type: Archivo (display) · Schibsted Grotesk (UI) · Instrument Serif (editorial) ·
  Martian Mono (labels).
- Motion: 600ms `cubic-bezier(.22,1,.36,1)` on the selector, 620ms opacity + 16px rise
  on scroll reveal, once. Nothing auto-advances; `prefers-reduced-motion` is honoured.

## Pages

| Route     | Entry                    | Notes                                          |
| --------- | ------------------------ | ---------------------------------------------- |
| `/`       | `src/entries/home.tsx`   | Game-style car selector, occasions, FAQ         |
| `/fleet/` | `src/entries/fleet.tsx`  | All six cars with specs, anchored per `#slug`   |
| `/quote/` | `src/entries/quote.tsx`  | Quote form → `info@sbluxuryrentals.co.za`       |
| `/terms/` | `src/entries/terms.tsx`  | Full terms of service, 19 clauses               |
| `404.html`| —                        | Static, no JS                                   |

Each route is a real HTML file with its own `<title>`, description, canonical and
Open Graph tags, so crawlers get a 200 and correct metadata without executing JS.

## SEO

- JSON-LD in `index.html`: Organization, AutoRental/LocalBusiness, Service,
  OfferCatalog (all six cars), FAQPage, WebSite. Fleet and quote pages carry
  CollectionPage / ContactPage plus BreadcrumbList.
- `robots.txt` and a build-generated `sitemap.xml` (`scripts/postbuild.mjs`).
- `lang="en-ZA"`, one `<h1>` per page, descriptive per-image alt text naming the
  car and the service area.
- `og.jpg` (1200×630) is generated for link previews — WhatsApp is the main sharing
  channel in South Africa and reads OG tags.

**Still to do off-site:** create a Google Business Profile as a service-area business
(category "Car rental agency"), and add the real social handles to `sameAs`.
