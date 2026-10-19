import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/app'

const NotFound = lazy(() => import('./pages/notFound'))
const ProjectPage = lazy(() => import('./pages/project'))

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get/all/projects" element={<ProjectPage />} />
      {/* <Route path="/all/pabla/proects/:name" element={< />} />  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes