import { Route, Routes } from 'react-router-dom'
import Home from './pages/app'
import NotFound from './pages/notFound'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes