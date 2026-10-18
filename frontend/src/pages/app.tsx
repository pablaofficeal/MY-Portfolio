import TextConfig from "../libs/configs/site/text.configs"
import Button from "../components/project/button/info"
import Footer from "../components/footer/footers"
import Hero from "../components/hero/hero"

function App() {
  return (
    <main className="page">
      <div className="layout">
        <Hero />
        <h1 className="hero-text-title">{TextConfig.HI}</h1>
        <Button />
        <Footer />
      </div>
    </main>
  )
}

export default App