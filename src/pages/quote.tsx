import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, Check, Loader2, Phone } from 'lucide-react'
import { EVENT_TYPES, SITE } from '@/data/site'
import { VEHICLES } from '@/data/vehicles'

const HOURS = Array.from({ length: SITE.maxHours - SITE.minHours + 1 }, (_, i) => SITE.minHours + i)

const FIELD =
  'w-full rounded-sm border border-white/15 bg-void px-4 py-3.5 text-[0.9375rem] text-bone placeholder:text-dim transition-colors focus:border-[var(--accent)] focus:outline-none'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function Quote() {
  const [cars, setCars] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  /** A missing field is the sender's problem; a dead endpoint is ours. Say which. */
  const [errorKind, setErrorKind] = useState<'validation' | 'send'>('send')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    hours: '',
    area: '',
    details: '',
    company: '', // honeypot
  })

  // Deep link from the selector / fleet page: /quote/?car=bmw-m2-competition
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('car')
    if (!slug) return
    if (slug === 'other') setCars(['Something else — please source it'])
    else {
      const match = VEHICLES.find((v) => v.slug === slug)
      if (match) {
        setCars([match.name])
        document.documentElement.style.setProperty('--accent', match.accent)
      }
    }
  }, [])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const toggleCar = (name: string) =>
    setCars((c) => (c.includes(name) ? c.filter((x) => x !== name) : [...c, name]))

  const summary = useMemo(
    () =>
      [
        `Quote request — ${SITE.name}`,
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Event: ${form.eventType}`,
        form.eventDate && `Date: ${form.eventDate}`,
        form.hours && `Hours: ${form.hours}`,
        form.area && `Pickup area: ${form.area}`,
        `Cars: ${cars.join(', ') || '—'}`,
        form.details && `Details: ${form.details}`,
      ]
        .filter(Boolean)
        .join('\n'),
    [form, cars],
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (cars.length === 0) {
      setStatus('error')
      setErrorKind('validation')
      setErrorMsg('Pick at least one car so we know what to quote on.')
      return
    }
    setStatus('sending')
    setErrorKind('send')
    setErrorMsg('')
    try {
      const res = await fetch('/send-quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cars }),
      })
      // A host without PHP hands back the HTML page instead of JSON, and that
      // must not read as a mystery 200.
      if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error('The form endpoint is not responding. Check that send-quote.php was uploaded.')
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || `The server responded with ${res.status}.`)
      setStatus('ok')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="mx-auto flex min-h-[80svh] max-w-xl flex-col justify-center px-4 py-40 text-center">
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-full"
          style={{ background: 'var(--accent)' }}
        >
          <Check size={30} strokeWidth={3} className="text-void" />
        </div>
        <h1 className="mt-8" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          Request sent
        </h1>
        <p className="mt-5 text-base leading-relaxed text-steel">
          It has landed in <span className="text-bone">{SITE.email}</span>. We come back with a quote — usually the same
          day, and always within 24 hours.
        </p>
        <p className="mt-3 text-sm text-dim">
          In a hurry? WhatsApp{' '}
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="underline underline-offset-4"
            style={{ color: 'var(--accent)' }}
          >
            {SITE.phone}
          </a>
        </p>
        <a
          href="/fleet/"
          className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-sm font-extrabold tracking-wide uppercase transition-colors hover:bg-white/5"
        >
          Back to the fleet <ArrowUpRight size={17} strokeWidth={2.5} />
        </a>
      </div>
    )
  }

  return (
    <>
      <header className="grain relative overflow-hidden pt-40 pb-14 sm:pt-48">
        <div aria-hidden className="grain-layer" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 62%), linear-gradient(180deg,#101216,#0a0b0d)',
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
          <p className="label mb-5" style={{ color: 'var(--accent)' }}>
            Step 02 · tell us the details
          </p>
          <h1 style={{ fontSize: 'clamp(2.6rem, 9vw, 7rem)' }}>Get a quote</h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
            No prices are hidden behind a login — they just depend on the car, the date, the hours and where you need
            it. Fill this in and a real quote comes back to you, usually the same day.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
          {/* honeypot */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={set('company')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute h-0 w-0 opacity-0"
          />

          <fieldset className="border-t border-white/10 pt-8">
            <legend className="label" style={{ color: 'var(--accent)' }}>
              Who you are
            </legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="label mb-2 block">Full name *</span>
                <input required className={FIELD} value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="block">
                <span className="label mb-2 block">Phone / WhatsApp *</span>
                <input
                  required
                  type="tel"
                  className={FIELD}
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+27 66 222 3344"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
                <span className="label mb-2 block">Email *</span>
                <input
                  required
                  type="email"
                  className={FIELD}
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-12 border-t border-white/10 pt-8">
            <legend className="label" style={{ color: 'var(--accent)' }}>
              The booking
            </legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label mb-2 block">Occasion *</span>
                <select required className={FIELD} value={form.eventType} onChange={set('eventType')}>
                  <option value="">Choose one…</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="label mb-2 block">Date of the event</span>
                <input type="date" className={FIELD} value={form.eventDate} onChange={set('eventDate')} />
              </label>
              <label className="block">
                <span className="label mb-2 block">Length of hire *</span>
                <select required className={FIELD} value={form.hours} onChange={set('hours')}>
                  <option value="">Choose hours…</option>
                  {HOURS.map((h) => (
                    <option key={h} value={`${h} hours`}>
                      {h} hours
                    </option>
                  ))}
                </select>
                <span className="mt-2 block text-xs text-dim">
                  Minimum {SITE.minHours} hours, maximum {SITE.maxHours}.
                </span>
              </label>
              <label className="block">
                <span className="label mb-2 block">Pickup area</span>
                <input
                  className={FIELD}
                  value={form.area}
                  onChange={set('area')}
                  placeholder="Sandton, Centurion, Midrand…"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-12 border-t border-white/10 pt-8">
            <legend className="label" style={{ color: 'var(--accent)' }}>
              The car — tick as many as you like
            </legend>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {VEHICLES.map((v) => {
                const on = cars.includes(v.name)
                return (
                  <button
                    type="button"
                    key={v.slug}
                    onClick={() => toggleCar(v.name)}
                    aria-pressed={on}
                    className="flex items-center gap-3 rounded-sm border p-3 text-left transition-colors"
                    style={{
                      borderColor: on ? v.accent : 'rgba(255,255,255,0.12)',
                      background: on ? `color-mix(in oklab, ${v.accent} 12%, transparent)` : 'transparent',
                    }}
                  >
                    <img src={v.cutout} alt="" width={80} height={45} className="h-11 w-20 shrink-0 object-contain" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{v.name}</span>
                      <span className="block truncate text-xs text-dim">{v.tagline}</span>
                    </span>
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full border"
                      style={{ borderColor: on ? v.accent : 'rgba(255,255,255,0.25)', background: on ? v.accent : 'transparent' }}
                    >
                      {on && <Check size={12} strokeWidth={3.5} className="text-void" />}
                    </span>
                  </button>
                )
              })}
              {(() => {
                const label = 'Something else — please source it'
                const on = cars.includes(label)
                return (
                  <button
                    type="button"
                    onClick={() => toggleCar(label)}
                    aria-pressed={on}
                    className="flex items-center gap-3 rounded-sm border border-dashed p-3 text-left transition-colors sm:col-span-2"
                    style={{
                      borderColor: on ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
                      background: on ? 'color-mix(in oklab, var(--accent) 12%, transparent)' : 'transparent',
                    }}
                  >
                    <span className="flex-1 text-sm font-semibold">{label}</span>
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full border"
                      style={{
                        borderColor: on ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                        background: on ? 'var(--accent)' : 'transparent',
                      }}
                    >
                      {on && <Check size={12} strokeWidth={3.5} className="text-void" />}
                    </span>
                  </button>
                )
              })()}
            </div>

            <label className="mt-6 block">
              <span className="label mb-2 block">Anything else we should know</span>
              <textarea
                rows={4}
                className={FIELD}
                value={form.details}
                onChange={set('details')}
                placeholder="Venue, number of passengers, shot list, whether you need more than one car…"
              />
            </label>
          </fieldset>

          {status === 'error' && (
            <div
              role="alert"
              className="mt-8 flex gap-3 rounded-sm border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">
                  {errorKind === 'validation' ? 'One thing is missing.' : 'Could not send the form.'}
                </p>
                <p className="mt-1 text-red-200/80">{errorMsg}</p>
                <p className={`mt-3 ${errorKind === 'validation' ? 'hidden' : ''}`}>
                  Send it straight to us instead —{' '}
                  <a
                    className="underline underline-offset-4"
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary)}`}
                    target="_blank"
                    rel="noopener"
                  >
                    WhatsApp
                  </a>{' '}
                  or{' '}
                  <a
                    className="underline underline-offset-4"
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(summary)}`}
                  >
                    email
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4.5 font-display text-sm font-extrabold tracking-wide text-void uppercase transition-transform duration-150 hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
            style={{ background: 'var(--accent)' }}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Request my quote <ArrowUpRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-dim">
            Your details go to {SITE.email} and are used only to quote and manage your booking, in line with POPIA. By
            sending this you agree to our{' '}
            <a href="/terms/" className="underline underline-offset-4">
              terms
            </a>
            .
          </p>
        </form>

        {/* Side rail */}
        <aside className="order-1 lg:order-2 lg:pt-8">
          <div className="rounded-sm border border-white/10 bg-surface p-6 sm:p-7">
            <p className="label mb-4">Rather just talk?</p>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 rounded-sm px-4 py-3.5 text-sm font-bold text-void transition-transform duration-150 hover:scale-[1.02]"
              style={{ background: 'var(--accent)' }}
            >
              <Phone size={16} strokeWidth={2.5} /> WhatsApp {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 flex items-center gap-3 rounded-sm border border-white/15 px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5"
            >
              {SITE.email}
            </a>
            <dl className="mt-7 space-y-4 border-t border-white/10 pt-6">
              {[
                ['Response time', 'Same day in most cases, always within 24 hours.'],
                ['To secure a booking', '50% upfront. Damage deposit is separate and refundable.'],
                ['Driving', 'Chauffeur-driven only. You never drive the car.'],
                ['Coverage', SITE.areas.join(', ') + ' and wider Gauteng.'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-[0.5625rem]">{k}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-steel">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </>
  )
}
