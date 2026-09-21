import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from '../../utils/motion/gsap'

export default function NavigationEffects() {
  const { pathname, hash, key } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    // A full-load entrance temporarily makes the app inert. Restore anchor
    // focus once it releases, rather than trying to focus an inert element.
    const restoreFocus = () => {
      if (hash && document.documentElement.dataset.intro !== 'pending') {
        document.getElementById(hash.slice(1))?.focus({ preventScroll: true })
      }
    }
    const observer = new MutationObserver(restoreFocus)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-intro'],
    })
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
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [pathname, hash, key])

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [i18n.language])

  return null
}
