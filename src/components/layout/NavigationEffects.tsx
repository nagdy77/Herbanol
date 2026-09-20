import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from '../../utils/motion/gsap'

export default function NavigationEffects() {
  const { pathname, hash, key } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1))
        target?.scrollIntoView({ behavior: 'instant', block: 'start' })
        target?.focus({ preventScroll: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [i18n.language])

  return null
}
