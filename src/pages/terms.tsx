import { SITE } from '@/data/site'

type Clause = { n: number; title: string; body?: string[]; list?: string[]; after?: string[] }

/** Carried over verbatim in substance from the client's existing terms (last updated 16/03/2026). */
const CLAUSES: Clause[] = [
  {
    n: 1,
    title: 'Company information',
    body: [
      `${SITE.legalName}, Registration Number ${SITE.reg}, Republic of South Africa.`,
      'For the purposes of these Terms, the company may be referred to as "SB Luxury Rentals", "the Company", "we", or "us".',
    ],
  },
  {
    n: 2,
    title: 'Nature of services',
    body: [
      'SB Luxury Rentals provides a luxury vehicle booking platform that connects clients with vehicle owners who offer chauffeur-driven luxury transport services. SB Luxury Rentals acts primarily as a booking and coordination platform and does not operate as a traditional self-drive car rental company.',
      'All vehicles provided through the platform are chauffeur-driven, and under no circumstances may clients operate or drive the vehicle themselves.',
    ],
  },
  {
    n: 3,
    title: 'Bookings',
    body: ['Clients may request bookings through:'],
    list: ['the official website', 'email', 'social media platforms', 'direct communication with the Company'],
    after: [
      'Once a request is made, SB Luxury Rentals will provide a quotation or booking confirmation outlining the details of the service. A booking is only considered confirmed once the client accepts the quotation and the required payment and security deposit (if applicable) have been received.',
    ],
  },
  {
    n: 4,
    title: 'Acceptance of terms',
    body: [
      'By accepting a quotation, confirming a booking, or making payment to SB Luxury Rentals, the client confirms that they have read, understood and agreed to these Terms of Service. The quotation or booking confirmation forms part of the agreement between the client and SB Luxury Rentals.',
    ],
  },
  {
    n: 5,
    title: 'Service fees',
    body: [
      'The service fee payable by the client will be the amount stated in the official quotation or booking confirmation issued by SB Luxury Rentals. Prices may vary depending on factors such as:',
    ],
    list: ['vehicle type', 'duration of service', 'location', 'event type', 'availability'],
    after: ['All fees must be paid prior to the commencement of the booking unless otherwise agreed in writing.'],
  },
  {
    n: 6,
    title: 'Security / damage deposit',
    body: [
      'SB Luxury Rentals may require a refundable security deposit prior to the commencement of a booking. The deposit amount will be specified in the quotation or booking confirmation. The security deposit serves solely as security against potential damages, additional charges or breaches of these Terms and shall not be considered payment toward the service fee. The deposit may be used to cover:',
    ],
    list: [
      'vehicle damage',
      'excessive interior cleaning',
      'smoking inside the vehicle',
      'overtime charges',
      'breach of these Terms',
      'loss or damage caused by the client or passengers',
    ],
    after: [
      'Any unused portion of the deposit will be refunded within 3–7 business days after completion of the booking. If damages exceed the deposit amount, the client agrees to pay the outstanding balance upon demand.',
    ],
  },
  {
    n: 7,
    title: 'Client responsibilities',
    body: ['The client agrees to:'],
    list: [
      'behave respectfully toward the driver',
      'treat the vehicle with care',
      'ensure passengers behave responsibly',
      'comply with all instructions given by the driver',
    ],
    after: ['The client is responsible for the behaviour and conduct of all passengers accompanying them.'],
  },
  {
    n: 8,
    title: 'Prohibited activities',
    body: ['The following activities are strictly prohibited:'],
    list: [
      'illegal drug use inside the vehicle',
      'reckless behaviour or harassment of the driver',
      'requests for dangerous or unlawful driving',
      'damaging or defacing the vehicle',
      'smoking inside the vehicle unless permitted',
    ],
    after: ['Violation of these rules may result in immediate termination of the booking without refund.'],
  },
  {
    n: 9,
    title: 'Overtime',
    body: [
      'Bookings are limited to the time period stated in the booking confirmation. If additional time is required, overtime may be provided subject to driver and vehicle availability. Overtime will be charged at the rate specified in the quotation or booking confirmation.',
      'Overtime may be charged per hour or part thereof, and partial hours may be rounded up to the nearest full hour. Overtime charges may be deducted from the client’s security deposit if not paid immediately.',
    ],
  },
  {
    n: 10,
    title: 'Vehicle condition',
    body: [
      'All vehicles are supplied by independent vehicle owners who are responsible for maintaining their vehicles in a safe and presentable condition. SB Luxury Rentals will make reasonable efforts to ensure vehicles meet the expected standard; however, vehicle owners remain responsible for:',
    ],
    list: ['vehicle cleanliness', 'roadworthiness', 'maintenance', 'insurance'],
  },
  {
    n: 11,
    title: 'Cancellation policy',
    body: [
      'A 50% upfront payment is required to secure the booking. This deposit is non-refundable and excludes the damage deposit. The damage deposit is a separate amount and will be clearly indicated on the invoice.',
      'Client cancellations:',
    ],
    list: [
      'More than 72 hours before the booking — remaining balance refunded, excluding the non-refundable booking deposit',
      '24–72 hours before the booking — 50% of the total booking fee refunded',
      'Less than 24 hours before the booking — no refund',
    ],
    after: ['Refunds will be processed using the original payment method where possible.'],
  },
  {
    n: 12,
    title: 'Force majeure',
    body: [
      'SB Luxury Rentals shall not be liable for delays, cancellations or failure to provide services due to events beyond its reasonable control, including but not limited to:',
    ],
    list: [
      'vehicle breakdowns',
      'road accidents',
      'extreme weather conditions',
      'natural disasters',
      'civil unrest',
      'government restrictions',
      'traffic incidents',
    ],
    after: [
      'Where possible, SB Luxury Rentals will attempt to arrange an alternative vehicle or reschedule the booking, but this cannot be guaranteed.',
    ],
  },
  {
    n: 13,
    title: 'Limitation of liability',
    body: [
      'SB Luxury Rentals acts primarily as a booking platform connecting clients with vehicle owners and drivers. The Company shall not be liable for:',
    ],
    list: [
      'road accidents',
      'mechanical failures',
      'injuries sustained during transport',
      'delays due to traffic conditions',
      'loss or theft of personal property',
    ],
    after: ['The vehicle owner and driver remain responsible for the operation of the vehicle.'],
  },
  {
    n: 14,
    title: 'Indemnity',
    body: [
      'The client agrees to indemnify and hold harmless SB Luxury Rentals against any claims, damages or liabilities arising from:',
    ],
    list: [
      'the client’s conduct during the booking',
      'damage caused by the client or passengers',
      'unlawful behaviour during the service',
    ],
  },
  {
    n: 15,
    title: 'Website use',
    body: ['Users of the SB Luxury Rentals website agree not to:'],
    list: ['misuse the website', 'submit fraudulent booking requests', 'attempt to interfere with website functionality'],
    after: [
      'SB Luxury Rentals reserves the right to restrict or terminate access to the website where misuse is suspected.',
    ],
  },
  {
    n: 16,
    title: 'Privacy',
    body: [
      'SB Luxury Rentals will collect and process personal information in accordance with applicable data protection laws in South Africa, including the Protection of Personal Information Act (POPIA). Personal information will be used only for the purpose of managing bookings and providing services.',
    ],
  },
  {
    n: 17,
    title: 'Governing law',
    body: [
      'These Terms of Service shall be governed by and interpreted in accordance with the laws of the Republic of South Africa.',
    ],
  },
  {
    n: 18,
    title: 'Changes to terms',
    body: [
      'SB Luxury Rentals reserves the right to update or modify these Terms at any time. Updated Terms will be published on the website and will take effect immediately upon publication.',
    ],
  },
  {
    n: 19,
    title: 'Contact information',
    body: [
      `For any questions regarding these Terms, please contact ${SITE.legalName} on ${SITE.phone} or at ${SITE.email}.`,
    ],
  },
]

export default function Terms() {
  return (
    <>
      <header className="relative pt-40 pb-14 sm:pt-48">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
          <p className="label mb-5" style={{ color: 'var(--accent)' }}>
            Last updated 16 March 2026
          </p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 6rem)' }}>Terms of service</h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-steel">
            Welcome to SB Luxury Rentals. These Terms govern the use of the {SITE.name} website and the services
            provided by {SITE.legalName}, Registration Number {SITE.reg}, Republic of South Africa. By accessing the
            website, requesting a quotation, confirming a booking or making payment, you agree to be bound by them.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 pb-28 sm:px-8">
        <div className="tube mb-14" />
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="Clauses" className="hidden lg:block">
            <div className="sticky top-32">
              <p className="label mb-4">Contents</p>
              <ol className="space-y-1.5">
                {CLAUSES.map((c) => (
                  <li key={c.n}>
                    <a
                      href={`#clause-${c.n}`}
                      className="block text-xs leading-snug text-dim transition-colors hover:text-bone"
                    >
                      {String(c.n).padStart(2, '0')} · {c.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl">
            {CLAUSES.map((c) => (
              <section key={c.n} id={`clause-${c.n}`} className="scroll-mt-32 border-b border-white/10 py-8 first:pt-0">
                <div className="flex gap-5">
                  <span className="label pt-1.5 text-[0.625rem]" style={{ color: 'var(--accent)' }}>
                    {String(c.n).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl">{c.title}</h2>
                    {c.body?.map((p, i) => (
                      <p key={i} className="mt-4 text-sm leading-relaxed text-steel">
                        {p}
                      </p>
                    ))}
                    {c.list && (
                      <ul className="mt-4 space-y-2">
                        {c.list.map((li) => (
                          <li key={li} className="flex gap-3 text-sm leading-relaxed text-steel">
                            <span aria-hidden style={{ color: 'var(--accent)' }}>
                              —
                            </span>
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {c.after?.map((p, i) => (
                      <p key={i} className="mt-4 text-sm leading-relaxed text-steel">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
