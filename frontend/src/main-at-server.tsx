import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import PageRouter from "./Router"

export function render() {
  return renderToString(
    <StrictMode>
      <PageRouter />
    </StrictMode>
  );
}