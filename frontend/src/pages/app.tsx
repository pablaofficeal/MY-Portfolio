import Hero from "../components/hero/hero"
import TextConfig from "../libs/configs/site/text.configs"

function App() {
  return (
    <main className="page">
      <div className="layout">
        <Hero />
        <h1 className="hero-text-title">{TextConfig.HI}</h1>
      </div>
    </main>
  )
}

export default App