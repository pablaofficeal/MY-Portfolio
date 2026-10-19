import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Router.tsx'
import "./assets/css/main.css"
import Menu from './components/menu/main.menu.tsx'

if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Menu />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)