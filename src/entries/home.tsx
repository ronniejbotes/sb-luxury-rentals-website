import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/layout'
import Home from '@/pages/home'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/">
      <Home />
    </Layout>
  </StrictMode>,
)
