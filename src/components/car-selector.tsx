import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { VEHICLES } from '@/data/vehicles'

const DUR = 600
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const N = VEHICLES.length

type Role = 'center' | 'left' | 'right' | 'back'

function roleFor(i: number, active: number): Role {
  let d = (i - active + N) % N
  if (d > N / 2) d -= N
  if (d === 0) return 'center'
  if (d === 1) return 'right'
  if (d === -1) return 'left'
  return 'back'
}

/**
 * Cars are landscape, so each one is sized by its height as a share of the
 * stage and lets its width follow. That way the stage can never be overrun on
 * a short laptop screen or a tall phone.
 */
function styleFor(role: Role, mobile: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    width: 'auto',
    transition: `transform ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}, left ${DUR}ms ${EASE}, height ${DUR}ms ${EASE}`,
    willChange: 'transform, filter, opacity',
  }
  switch (role) {
    case 'center':
      return {
        ...base,
        // min() lets one expression serve a 390px phone and a 27" monitor:
        // narrow screens are clamped by width, wide ones by stage height.
        height: 'min(66vw, 60%)',
        bottom: mobile ? '17%' : '9%',
        transform: 'translateX(-50%)',
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.8))',
        opacity: 1,
        zIndex: 30,
      }
    case 'left':
    case 'right':
      return {
        ...base,
        height: 'min(22vw, 24%)',
        left: role === 'left' ? (mobile ? '12%' : '15%') : mobile ? '88%' : '85%',
        bottom: mobile ? '19%' : '11%',
        transform: 'translateX(-50%)',
        filter: 'blur(2px) brightness(0.5) drop-shadow(0 10px 14px rgba(0,0,0,0.6))',
        opacity: 0.75,
        zIndex: 20,
        cursor: 'pointer',
      }
    default:
      return {
        ...base,
        height: 'min(16vw, 17%)',
        bottom: mobile ? '20%' : '12%',
        transform: 'translateX(-50%)',
        filter: 'blur(6px) brightness(0.3)',
        opacity: 0.25,
        zIndex: 10,
        pointerEvents: 'none',
      }
  }
}

export default function CarSelector() {
  const [active, setActive] = useState(0)
  const [busy, setBusy] = useState(false)
  const [mobile, setMobile] = useState(false)
  const touch = useRef<number | null>(null)
  const car = VEHICLES[active]

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Preload every cutout so switching never flashes an empty stage.
  useEffect(() => {
    VEHICLES.forEach((v) => {
      const img = new Image()
      img.src = v.cutout
    })
  }, [])

  const goTo = useCallback(
    (next: number) => {
      if (busy) return
      setBusy(true)
      setActive(((next % N) + N) % N)
      window.setTimeout(() => setBusy(false), DUR * 0.5)
    },
    [busy],
  )

  const navigate = useCallback(
    (dir: 'next' | 'prev') => goTo(active + (dir === 'next' ? 1 : -1)),
    [active, goTo],
  )

  // The selected car's colour drives the accent for the whole document.
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', car.accent)
  }, [car.accent])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <section
      aria-label="Choose a car"
      className="grain relative isolate flex w-full flex-col overflow-hidden"
      style={{ height: '100svh', minHeight: 660 }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 45) navigate(dx < 0 ? 'next' : 'prev')
        touch.current = null
      }}
    >
      {/* Stage lighting: one cold pool of the car's colour on polished concrete. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(105% 62% at 50% 62%, color-mix(in oklab, ${car.accent} 30%, transparent) 0%, transparent 64%),
                       radial-gradient(70% 40% at 50% 8%, rgba(255,255,255,0.06) 0%, transparent 70%),
                       linear-gradient(180deg, #0e1014 0%, #0a0b0d 58%, #06070a 100%)`,
          transition: `background ${DUR}ms ${EASE}`,
        }}
      />

      {/* ── Stage ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1">
        {/* The fluoro tube overhead. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[9%] z-[1] flex justify-center">
          <div className="tube w-[58%]" style={{ transition: `background ${DUR}ms ${EASE}` }} />
        </div>

        {/* The car's name, oversized, embossed into the back wall. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[30%] z-[2] sm:top-[17%] flex select-none justify-center"
        >
          <span
            className="font-display whitespace-nowrap uppercase"
            style={{
              fontSize: 'clamp(64px, 17.5vw, 250px)',
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: '-0.045em',
              color: 'transparent',
              WebkitTextStroke: `2px color-mix(in oklab, ${car.accent} 55%, transparent)`,
              transition: `-webkit-text-stroke-color ${DUR}ms ${EASE}`,
            }}
          >
            {car.ghost}
          </span>
        </div>

        {/* Floor. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[17%] z-[2] border-t sm:bottom-[9%] border-white/[0.08]"
        />

        {/* The cars. */}
        <div className="absolute inset-0 z-[3]">
          {VEHICLES.map((v, i) => {
            const role = roleFor(i, active)
            return (
              <div
                key={v.slug}
                style={styleFor(role, mobile)}
                onClick={role === 'left' || role === 'right' ? () => goTo(i) : undefined}
                aria-hidden={role !== 'center'}
              >
                <img
                  src={v.cutout}
                  alt={role === 'center' ? v.alt : ''}
                  draggable={false}
                  width={1400}
                  height={780}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  className="h-full w-auto max-w-none select-none object-contain"
                />
                {role === 'center' && (
                  <img
                    aria-hidden
                    src={v.cutout}
                    alt=""
                    draggable={false}
                    className="absolute inset-x-0 top-full h-full w-auto max-w-none -scale-y-100 object-contain opacity-[0.22] blur-[2px]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 60%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 60%)',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Section label. */}
        <div className="absolute top-24 left-4 z-40 sm:left-8 md:top-28 lg:left-14">
          <p className="label" style={{ color: 'var(--accent)' }}>
            The Garage
          </p>
          <p className="label mt-1">Six cars. Pick yours.</p>
        </div>

        {/* Plate badge floats on the stage, top right. */}
        {car.plate && (
          <div className="absolute top-24 right-4 z-40 hidden sm:right-8 sm:block md:top-28 lg:right-14">
            <span className="plate">{car.plate}</span>
          </div>
        )}
      </div>

      {/* ── Panel ─────────────────────────────────────────────────────────── */}
      <div className="relative z-40 border-t border-white/10 bg-void/55 backdrop-blur-[2px]">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:py-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="font-mono text-xs font-bold tracking-[0.2em] tabular-nums"
                style={{ color: 'var(--accent)' }}
              >
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="flex max-w-56 flex-1 gap-1">
                {VEHICLES.map((v, i) => (
                  <button
                    key={v.slug}
                    onClick={() => goTo(i)}
                    aria-label={`Show ${v.name}`}
                    aria-current={i === active}
                    className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                    style={{ background: i === active ? car.accent : 'rgba(255,255,255,0.16)' }}
                  />
                ))}
              </div>
              <span className="font-mono text-xs tracking-[0.2em] text-dim tabular-nums">
                {String(N).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="text-bone" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)', lineHeight: 0.92 }}>
                {car.name}
              </h1>
              <p className="font-serif text-lg text-steel italic">{car.tagline}</p>
            </div>

            <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-steel sm:block">{car.blurb}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => navigate('prev')}
                aria-label="Previous car"
                className="grid h-12 w-12 place-items-center rounded-full border-2 transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10"
                style={{ borderColor: 'color-mix(in oklab, var(--accent) 70%, white 20%)' }}
              >
                <ArrowLeft size={22} strokeWidth={2.25} />
              </button>
              <button
                onClick={() => navigate('next')}
                aria-label="Next car"
                className="grid h-12 w-12 place-items-center rounded-full border-2 transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10"
                style={{ borderColor: 'color-mix(in oklab, var(--accent) 70%, white 20%)' }}
              >
                <ArrowRight size={22} strokeWidth={2.25} />
              </button>
              <a
                href={`/quote/?car=${car.slug}`}
                className="ml-1 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold tracking-wide text-void transition-transform duration-150 hover:scale-[1.03]"
                style={{ background: 'var(--accent)' }}
              >
                Book this car
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Spec sheet */}
          <dl className="hidden grid-cols-2 gap-x-8 gap-y-4 self-center border-l border-white/10 pl-10 lg:grid">
            {car.specs.slice(0, 4).map((s) => (
              <div key={s.label}>
                <dt className="label text-[0.5625rem]">{s.label}</dt>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="grain-layer z-50" aria-hidden />
    </section>
  )
}
