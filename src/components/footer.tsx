import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import { SITE } from '@/data/site'
import { VEHICLES } from '@/data/vehicles'

function TikTok(props: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={props.size ?? 18} height={props.size ?? 18} fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.69a5.67 5.67 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.29 1.37V7.3a4.29 4.29 0 0 1-3.23-1.48Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="grain relative border-t border-white/10 bg-surface">
      <div className="grain-layer" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/img/logo.png" alt={SITE.name} width={112} height={119} className="h-16 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">
              Chauffeur-driven show cars for the moments worth arriving late to. Serving{' '}
              {SITE.areas.slice(0, 4).join(', ')} and the rest of Gauteng.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-steel transition-colors hover:border-white/40 hover:text-bone"
              >
                <Instagram size={17} />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-steel transition-colors hover:border-white/40 hover:text-bone"
              >
                <Facebook size={17} />
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener"
                aria-label="TikTok"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-steel transition-colors hover:border-white/40 hover:text-bone"
              >
                <TikTok size={17} />
              </a>
            </div>
          </div>

          <div>
            <p className="label mb-5">The Fleet</p>
            <ul className="space-y-2.5">
              {VEHICLES.map((v) => (
                <li key={v.slug}>
                  <a href={`/fleet/#${v.slug}`} className="text-sm text-steel transition-colors hover:text-bone">
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-5">Get in touch</p>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 text-sm text-steel transition-colors hover:text-bone"
                >
                  <Phone size={15} /> {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-steel transition-colors hover:text-bone"
                >
                  <Mail size={15} /> {SITE.email}
                </a>
              </li>
              <li>
                <a href="/quote/" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Request a quote →
                </a>
              </li>
              <li>
                <a href="/terms/" className="text-sm text-steel transition-colors hover:text-bone">
                  Terms &amp; conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[0.5625rem]">
            © {new Date().getFullYear()} {SITE.legalName} · Reg {SITE.reg}
          </p>
          <p className="label text-[0.5625rem]">Chauffeur-driven only · No self-drive · {SITE.region}</p>
        </div>
      </div>
    </footer>
  )
}
