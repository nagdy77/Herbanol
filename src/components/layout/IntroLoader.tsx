import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'
import logo from '../../assets/logos/ChatGPT Image Sep 20, 2026, 07_01_48 PM.png'
import './IntroLoader.css'

/** A bounded entrance, on each document load, independent of network readiness and route changes. */
export default function IntroLoader() {
  const { t } = useTranslation()
  const reduced = useReducedMotionPreference()
  const [active, setActive] = useState(
    () => document.documentElement.dataset.intro === 'pending',
  )
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    if (!active) return
    document.documentElement.dataset.intro = 'pending'
    const root = document.getElementById('root')!
    root.inert = true
    return () => {
      root.inert = false
      document.documentElement.dataset.intro = 'done'
    }
  }, [active])

  useEffect(() => {
    if (!active) return
    const elapsed =
      performance.now() -
      Number(document.documentElement.dataset.introStarted || 0)
    const exit = setTimeout(
      () => setLeaving(true),
      Math.max(0, (reduced ? 100 : 1250) - elapsed),
    )
    const done = setTimeout(
      () => setActive(false),
      Math.max(0, (reduced ? 300 : 2000) - elapsed),
    )
    const skip = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false)
    }
    document.addEventListener('keydown', skip)
    return () => {
      clearTimeout(exit)
      clearTimeout(done)
      document.removeEventListener('keydown', skip)
    }
  }, [active, reduced])

  const host = document.getElementById('intro-root')
  if (!active || !host) return null
  return createPortal(
    <motion.div
      className="intro-loader"
      initial={false}
      animate={
        leaving
          ? { y: reduced ? 0 : '-100%', opacity: reduced ? 0 : 1 }
          : { y: 0, opacity: 1 }
      }
      transition={{ duration: reduced ? 0.15 : 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="intro-brand"
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 8 }}
        animate={
          leaving
            ? { opacity: 0, scale: 1, y: reduced ? 0 : -18 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{
          duration: reduced ? 0.12 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <svg
          className="intro-orbit"
          viewBox="0 0 320 320"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M76 30C274 72 46 248 244 290M244 30C46 72 274 248 76 290"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduced ? 0 : 1.3, ease: 'easeInOut' }}
          />
          <path
            d="M97 44h126M131 82h58M146 120h28M146 200h28M131 238h58M97 276h126"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
        <img
          className="intro-logo"
          src={logo}
          alt=""
          width="1254"
          height="1254"
          fetchPriority="high"
        />
        <p>{t('brand.tagline')}</p>
        <span className="intro-progress">
          <motion.span
            initial={{ scaleX: reduced ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduced ? 0 : 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </span>
      </motion.div>
    </motion.div>,
    host,
  )
}
