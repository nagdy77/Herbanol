import { useRef } from 'react'
import { useHomeMotion } from '../hooks/useHomeMotion'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Partners from '../components/sections/Partners'
import Product from '../components/sections/Product'
import Applications from '../components/sections/Applications'
import Process from '../components/sections/Process'
import Sustainability from '../components/sections/Sustainability'
import Science from '../components/sections/Science'
import Media from '../components/sections/Media'
import Contact from '../components/sections/Contact'
import Location from '../components/sections/Location'
import NavigationEffects from '../components/layout/NavigationEffects'

export default function Home() {
  const scope = useRef<HTMLDivElement>(null)
  useHomeMotion(scope)
  return (
    <div ref={scope} className="home-page">
      <NavigationEffects />
      <Hero />
      <About />
      <Partners />
      <Product />
      <Applications />
      <Process />
      <Sustainability />
      <Science />
      <Media />
      <Location />
      <Contact />
    </div>
  )
}
