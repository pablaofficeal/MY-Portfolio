import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import AppRoutes from "./Router"

export function render() {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    </StrictMode>
  )
}