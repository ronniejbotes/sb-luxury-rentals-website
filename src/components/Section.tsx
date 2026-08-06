import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  className = '',
  bleed = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  bleed?: boolean
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className={bleed ? '' : 'mx-auto max-w-[1400px] px-4 sm:px-8'}>{children}</div>
    </section>
  )
}

export function SectionHead({
  kicker,
  title,
  intro,
  align = 'left',
}: {
  kicker: string
  title: ReactNode
  intro?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <p className="label mb-4" style={{ color: 'var(--accent)' }} data-accent-tween>
        {kicker}
      </p>
      <h2 style={{ fontSize: 'clamp(2rem, 5.2vw, 4rem)' }}>{title}</h2>
      {intro && <p className="mt-6 text-base leading-relaxed text-steel sm:text-lg">{intro}</p>}
    </div>
  )
}
