import { ArrowUpRight, Clock, MapPin, ShieldCheck, UserRound } from 'lucide-react'
import CarSelector from '@/components/CarSelector'
import Reveal from '@/components/Reveal'
import { Section, SectionHead } from '@/components/Section'
import { SITE } from '@/data/site'
import { VEHICLES } from '@/data/vehicles'

const TRUST = [
  { icon: UserRound, label: 'Chauffeur-driven', detail: 'Every booking. No self-drive, ever.' },
  { icon: Clock, label: '3 to 12 hours', detail: 'Book the block of time you actually need.' },
  { icon: MapPin, label: 'Gauteng-wide', detail: 'Joburg, Pretoria, Sandton, Centurion, Midrand.' },
  { icon: ShieldCheck, label: 'Registered company', detail: `${SITE.legalName} · Reg ${SITE.reg}` },
]

const OCCASIONS = [
  {
    title: 'Matric dance',
    copy: 'The one photo everyone keeps. Pull up in something nobody else at the venue has, with a driver who knows to wait for the shot.',
    hours: 'Typically 3–5 hours',
    img: '/img/wrx-sti-alt-800.webp',
    alt: 'Pink and blue Hatsune Miku itasha Subaru WRX STI arriving for a matric dance in Johannesburg',
  },
  {
    title: 'Weddings',
    copy: 'Clean lines, a driver in the loop with your coordinator, and a car that suits the couple rather than the venue brochure.',
    hours: 'Typically 4–8 hours',
    img: '/img/m2-800.webp',
    alt: 'Teal BMW M2 Competition used as a chauffeur-driven wedding car in Pretoria',
  },
  {
    title: 'Premieres & launches',
    copy: 'Arrival is the story. Widebody, wing, and a stance that makes the red carpet worth standing on.',
    hours: 'Typically 3–6 hours',
    img: '/img/gt86-800.webp',
    alt: 'Rocket Bunny widebody Toyota GT86 on a red carpet arrival in Sandton',
  },
  {
    title: 'Shoots & music videos',
    copy: 'Hero cars for stills and video, with a driver who can do repeat passes. Tell us the location and the shot list.',
    hours: 'Typically 6–12 hours',
    img: '/img/civic-type-r-alt-800.webp',
    alt: 'Cherry blossom itasha Honda Civic Type R FK8 on a music video shoot in Gauteng',
  },
]

const STEPS = [
  { n: '01', t: 'Pick your car', d: 'Run through the six in the garage above and land on the one that fits the night.' },
  { n: '02', t: 'Send the date and hours', d: 'Date, pickup point, how long you need it. Minimum three hours, maximum twelve.' },
  { n: '03', t: 'Lock it in', d: '50% upfront secures the booking. The damage deposit is separate and shown on the invoice.' },
  { n: '04', t: 'The driver arrives', d: 'Clean car, on time, at your address. You get in. That is the whole job.' },
]

const FAQS = [
  {
    q: 'Can I drive the car myself?',
    a: 'No. Every SB Luxury Rentals booking is chauffeur-driven. Under no circumstances may a client operate the vehicle — it is the one rule we never bend.',
  },
  {
    q: 'How long can I book a car for?',
    a: 'Three hours is the minimum and twelve hours is the maximum for a single booking. Need extra time on the night? Overtime can be arranged subject to driver and vehicle availability, charged at the rate on your quote.',
  },
  {
    q: 'What do I pay upfront?',
    a: 'A 50% upfront payment secures the booking and is non-refundable. A refundable damage deposit is charged separately and is always shown clearly on the invoice. Any unused portion comes back to you within 3–7 business days after the booking.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'More than 72 hours before the booking, the balance (excluding the non-refundable deposit) is refunded. Between 24 and 72 hours, 50% of the total fee is refunded. Under 24 hours, no refund applies.',
  },
  {
    q: 'Where do you operate?',
    a: `We cover ${SITE.areas.join(', ')} and the wider Gauteng area. Travel outside that is possible — mention the location in your quote request and we will price it in.`,
  },
  {
    q: 'Can I book more than one car?',
    a: 'Yes. Multi-car arrivals are common for matric dances and weddings. Tick every car you want on the quote form and we will put a package together.',
  },
]

export default function Home() {
  return (
    <>
      <CarSelector />

      {/* Trust strip */}
      <div className="border-y border-white/10 bg-surface">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-white/5 sm:px-0 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="bg-surface p-6 sm:p-8">
              <Icon size={18} style={{ color: 'var(--accent)' }} data-accent-tween />
              <p className="mt-4 font-display text-sm font-extrabold tracking-tight uppercase">{label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-dim">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHead
              kicker="Why us"
              title={
                <>
                  Anyone can send
                  <br />a black sedan.
                </>
              }
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
              SB Luxury Rentals runs six cars, and not one of them is a rental-fleet filler. Itasha liveries you will
              not see twice in Gauteng, a widebody GT86, a bagged M2, a fully built WRX. They get photographed at every
              event they turn up to — which is rather the point.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
              You get the car and a professional chauffeur, from three hours up to a full twelve-hour day. You never
              touch the wheel, you never park it, and you never explain to anyone why you chose it.
            </p>
            <a
              href="/fleet/"
              className="mt-8 inline-flex items-center gap-2 border-b pb-1 font-display text-lg font-extrabold tracking-tight uppercase transition-opacity hover:opacity-70"
              style={{ borderColor: 'var(--accent)' }}
            >
              See all six <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </Reveal>

          <Reveal delay={80} className="relative">
            <img
              src="/img/hero-garage-1600.webp"
              srcSet="/img/hero-garage-800.webp 800w, /img/hero-garage-1600.webp 1600w"
              sizes="(max-width: 1024px) 100vw, 45vw"
              alt="Itasha Subaru WRX STI and Rocket Bunny Toyota GT86 parked in a Johannesburg parkade before an event"
              width={1600}
              height={1067}
              loading="lazy"
              className="h-full w-full rounded-sm object-cover"
            />
            <p className="label mt-3">Parkade, Johannesburg · the STI and the GT86</p>
          </Reveal>
        </div>
      </Section>

      {/* Occasions */}
      <Section id="occasions" className="border-t border-white/10 bg-surface">
        <Reveal>
          <SectionHead
            kicker="Occasions"
            title="What people book us for"
            intro="Four things make up almost every booking we take. If yours is not on the list, it is still a yes — just tell us what you are planning."
          />
        </Reveal>
        <div className="mt-14 grid gap-px bg-white/5 sm:grid-cols-2">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 60} className="group bg-surface">
              <article className="flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={o.img}
                    alt={o.alt}
                    width={800}
                    height={533}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-snap)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl">{o.title}</h3>
                    <span className="label shrink-0 text-[0.5625rem]">{o.hours}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{o.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <Reveal>
          <SectionHead kicker="How it works" title="Four steps, no showroom visit" />
        </Reveal>
        <ol className="mt-14 grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 60} className="bg-void p-6 sm:p-8">
              <span
                className="font-mono text-xs font-bold tracking-[0.2em]"
                style={{ color: 'var(--accent)' }}
                data-accent-tween
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-lg">{s.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Sourcing — carried over from the old site because it is a real offering */}
      <Section className="border-y border-white/10 bg-surface">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <SectionHead
              kicker="Not in the garage?"
              title="Something specific in mind?"
              intro="If the car you want is not one of our six, say so. Through our network and partnerships we can often arrange access to vehicles well outside our own fleet. Tell us what you are picturing and we will tell you honestly whether we can get it."
            />
          </Reveal>
          <Reveal delay={80}>
            <a
              href="/quote/?car=other"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold tracking-wide text-void uppercase transition-transform duration-150 hover:scale-[1.03]"
              style={{ background: 'var(--accent)' }}
              data-accent-tween
            >
              Request a specific car <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <SectionHead kicker="Questions" title="Before you book" />
            <p className="mt-6 text-sm leading-relaxed text-steel">
              Everything below is straight out of our terms. The full document lives on the{' '}
              <a href="/terms/" className="underline underline-offset-4 hover:text-bone">
                terms page
              </a>
              .
            </p>
          </Reveal>
          <div>
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group border-b border-white/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-extrabold tracking-tight uppercase [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="shrink-0 text-2xl leading-none font-normal transition-transform duration-200 group-open:rotate-45"
                      style={{ color: 'var(--accent)' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="relative overflow-hidden border-t border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          data-accent-tween
          style={{
            background: `radial-gradient(80% 120% at 50% 120%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 65%)`,
            transition: 'background 600ms var(--ease-stage)',
          }}
        />
        <Reveal className="relative text-center">
          <p className="label mb-5" style={{ color: 'var(--accent)' }}>
            {VEHICLES.length} cars · {SITE.minHours}–{SITE.maxHours} hours · Gauteng
          </p>
          <h2 style={{ fontSize: 'clamp(2.4rem, 8vw, 6.5rem)' }}>
            Book the
            <br />
            grand entrance
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-steel">
            Send us the date and the car. We come back with a quote, usually the same day.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/quote/"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold tracking-wide text-void uppercase transition-transform duration-150 hover:scale-[1.03]"
              style={{ background: 'var(--accent)' }}
            >
              Get a quote <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-display text-sm font-extrabold tracking-wide uppercase transition-colors hover:bg-white/5"
            >
              WhatsApp {SITE.phone}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
