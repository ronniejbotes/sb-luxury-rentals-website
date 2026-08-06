import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/layout'
import Quote from '@/pages/quote'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/quote/">
      <Quote />
    </Layout>
  </StrictMode>,
)
