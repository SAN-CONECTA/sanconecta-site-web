import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import TI360 from './components/TI360'
import Frentes from './components/Frentes'
import Segmentos from './components/Segmentos'
import Modelos from './components/Modelos'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TI360 />
        <Frentes />
        <Segmentos />
        <Modelos />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
