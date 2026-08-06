import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { SITE } from '@/data/site'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/fleet/', label: 'The Fleet' },
  { href: '/quote/', label: 'Get a Quote' },
]

export default function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] bg-void">
        <p className="label truncate px-3 py-2 text-center text-[0.5rem] text-steel sm:text-[0.5625rem]">
          This is your sign to book a car for that upcoming event
        </p>
        <div className="tube opacity-60" data-accent-tween />
      </div>

      <header
        className={`fixed inset-x-0 top-[29px] z-[65] transition-colors duration-300 ${
          solid ? 'bg-void/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
          <a href="/" aria-label={`${SITE.name} home`} className="shrink-0">
            <img src="/img/logo-sm.png" alt={SITE.name} width={44} height={47} className="h-10 w-auto" />
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={current === n.href ? 'page' : undefined}
                className="label text-[0.625rem] transition-colors hover:text-bone"
                style={current === n.href ? { color: 'var(--accent)' } : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold tracking-wide transition-colors hover:bg-white/5 sm:inline-flex"
              style={{ borderColor: 'color-mix(in oklab, var(--accent) 60%, transparent)', color: 'var(--accent)' }}
              data-accent-tween
            >
              <Phone size={14} strokeWidth={2.5} />
              WhatsApp us
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[64] bg-void/97 pt-32 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="border-b border-white/10 py-5 font-display text-3xl font-extrabold tracking-tight uppercase"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="mt-8 inline-flex items-center gap-2 text-lg font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              <Phone size={18} /> {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
