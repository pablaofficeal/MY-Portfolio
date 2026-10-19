import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PageRouter from './Router.tsx'
import "./assets/css/main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)