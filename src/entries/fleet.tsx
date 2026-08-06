import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/layout'
import Fleet from '@/pages/fleet'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/fleet/">
      <Fleet />
    </Layout>
  </StrictMode>,
)
