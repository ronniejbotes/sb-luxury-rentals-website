import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/layout'
import Terms from '@/pages/terms'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current="/terms/">
      <Terms />
    </Layout>
  </StrictMode>,
)
