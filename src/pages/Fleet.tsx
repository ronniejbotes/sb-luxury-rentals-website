import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Section } from '@/components/Section'
import { SITE } from '@/data/site'
import { VEHICLES } from '@/data/vehicles'

export default function Fleet() {
  return (
    <>
      <header className="grain relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24">
        <div aria-hidden className="grain-layer" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 60% at 50% 0%, rgba(217,177,104,0.10), transparent 60%), linear-gradient(180deg,#101216,#0a0b0d)',
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
          <p className="label mb-5" style={{ color: 'var(--accent)' }}>
            {VEHICLES.length} cars · one fleet · no filler
          </p>
          <h1 style={{ fontSize: 'clamp(2.6rem, 10vw, 8rem)' }}>The Fleet</h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
            Every car here is one we actually own and run. There is no phantom inventory, no stock photography and no
            &ldquo;subject to availability&rdquo; supercar we would have to go and find. Six cars, all chauffeur-driven,
            all bookable from {SITE.minHours} to {SITE.maxHours} hours.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {VEHICLES.map((v) => (
              <a
                key={v.slug}
                href={`#${v.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/5"
                style={{ color: v.accent }}
              >
                {v.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {VEHICLES.map((v, i) => (
        <Section
          key={v.slug}
          id={v.slug}
          className={`scroll-mt-28 border-t border-white/10 ${i % 2 === 1 ? 'bg-surface' : ''}`}
        >
          <div
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              i % 2 === 1 ? '[&>*:first-child]:lg:order-2' : ''
            }`}
          >
            {/* Stage */}
            <Reveal className="relative">
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  background: `radial-gradient(110% 80% at 50% 88%, color-mix(in oklab, ${v.accent} 24%, transparent), transparent 60%), linear-gradient(180deg,#14171b,#0a0b0d)`,
                }}
              >
                <div className="flex justify-center px-4 pt-14 pb-10">
                  <div className="tube absolute inset-x-[18%] top-8" style={{ ['--accent' as string]: v.accent }} />
                  <img
                    src={v.cutout}
                    alt={v.alt}
                    width={1400}
                    height={780}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className="relative h-auto w-full object-contain"
                    style={{ filter: 'drop-shadow(0 30px 35px rgba(0,0,0,0.7))' }}
                  />
                </div>
              </div>
              {v.gallery?.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={1600}
                  loading="lazy"
                  className="mt-3 aspect-[16/10] w-full rounded-sm object-cover"
                />
              ))}
            </Reveal>

            {/* Detail */}
            <Reveal delay={70}>
              <p className="label mb-4" style={{ color: v.accent }}>
                {String(i + 1).padStart(2, '0')} / {String(VEHICLES.length).padStart(2, '0')} · {v.make}
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>{v.name}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="font-serif text-xl text-steel italic">{v.tagline}</p>
                {v.plate && <span className="plate">{v.plate}</span>}
              </div>
              <p className="mt-6 text-base leading-relaxed text-steel">{v.blurb}</p>

              <dl className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/5">
                {v.specs.map((s) => (
                  <div key={s.label} className="bg-void p-4">
                    <dt className="label text-[0.5625rem]">{s.label}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-bone">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {v.bestFor.map((b) => (
                  <span key={b} className="label rounded-full border border-white/15 px-3 py-1.5 text-[0.5625rem]">
                    {b}
                  </span>
                ))}
              </div>

              <a
                href={`/quote/?car=${v.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-extrabold tracking-wide text-void uppercase transition-transform duration-150 hover:scale-[1.03]"
                style={{ background: v.accent }}
              >
                Book the {v.name} <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section className="border-t border-white/10 bg-surface text-center">
        <Reveal>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>Seen the one?</h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-steel">
            Tick it on the quote form with your date and hours. If you want something we do not own, ask anyway — we can
            often source it.
          </p>
          <a
            href="/quote/"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-bone px-8 py-4 font-display text-sm font-extrabold tracking-wide text-void uppercase transition-transform duration-150 hover:scale-[1.03]"
          >
            Get a quote <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </Reveal>
      </Section>
    </>
  )
}
