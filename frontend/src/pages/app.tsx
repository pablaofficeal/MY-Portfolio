import Hero from "../components/hero/hero"
import Footer from "../components/footer/footers"
import TextConfig from "../libs/configs/site/text.configs"

function App() {
  return (
    <main className="page">
      <div className="layout">
        <Hero />
        <h1 className="hero-text-title">{TextConfig.HI}</h1>
        <Footer />
      </div>
    </main>
  )
}

export default App