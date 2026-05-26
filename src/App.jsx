import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Services from './components/Services'
import Solutions from './components/Solutions'
import Partners from './components/Partners'
import Journey from './components/Journey'
import Why from './components/Why'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Services />
        <Solutions />
        <Partners />
        <Journey />
        <Why />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
