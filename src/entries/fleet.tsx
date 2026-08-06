import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/Layout'
import Fleet from '@/pages/Fleet'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/fleet/">
      <Fleet />
    </Layout>
  </StrictMode>,
)
