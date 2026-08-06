import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/Layout'
import Quote from '@/pages/Quote'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/quote/">
      <Quote />
    </Layout>
  </StrictMode>,
)
