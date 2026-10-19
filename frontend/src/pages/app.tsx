import Footer from "../components/footer/footers"
import Hero from "../components/hero/hero"
import ScrollModels from "../components/models/scrollModels"

function App() {
  return (
    <main className="page">
      <div className="layout">
        <section>
          <Hero />
        </section>
        <ScrollModels />
      </div>
        <Footer />
    </main>
  )
}

export default App