import Header from './components/Header'
import Hero from './components/Hero'
import Desafios from './components/Desafios'
import About from './components/About'
import TI360 from './components/TI360'
import Frentes from './components/Frentes'
import Parceria from './components/Parceria'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Desafios />
        <About />
        <TI360 />
        <Frentes />
        <Parceria />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
