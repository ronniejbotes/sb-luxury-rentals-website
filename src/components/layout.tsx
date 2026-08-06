import type { ReactNode } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Layout({ current, children }: { current: string; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-void"
      >
        Skip to content
      </a>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
