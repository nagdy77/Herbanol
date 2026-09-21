import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Dna, Leaf } from 'lucide-react'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'
import Container from '../ui/Container'
import './Partners.css'

// No naming rules: Vite discovers image files again on every build.
const logos = Object.entries(
  import.meta.glob<string>(
    '../../assets/logos/**/*.{png,jpg,jpeg,svg,webp,avif,gif,PNG,JPG,JPEG,SVG,WEBP,AVIF,GIF}',
    { eager: true, query: '?url', import: 'default' },
  ),
)
  .filter(
    ([path]) =>
      path !== '../../assets/logos/ChatGPT Image Sep 20, 2026, 07_01_48 PM.png',
  )
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ path, src }))

export default function Partners() {
  const { t } = useTranslation()
  const scope = useRef<HTMLElement>(null)
  const nearby = useInView(scope, { once: true, margin: '400px' })
  const visible = useInView(scope, { amount: 0.2 })
  const entered = useInView(scope, { once: true, amount: 0.2 })
  const reduced = useReducedMotionPreference()
  const [word, setWord] = useState(0)
  const words = t('partners.words', { returnObjects: true }) as string[]
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowX = useSpring(pointerX, { stiffness: 35, damping: 22 })
  const glowY = useSpring(pointerY, { stiffness: 35, damping: 22 })
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ['start end', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [8, -8])
  const carouselY = useTransform(scrollYProgress, [0, 1], [3, -3])
  useEffect(() => {
    if (reduced || !visible) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setWord((current) => (current + 1) % words.length)
    }, 4600)
    return () => window.clearInterval(timer)
  }, [reduced, visible, words.length])
  if (!logos.length) return null
  return (
    <section
      ref={scope}
      className={
        'partners-strip' +
        (entered ? ' partners-entered' : '') +
        (visible ? ' partners-active' : '')
      }
      onPointerMove={(event) => {
        if (
          reduced ||
          event.pointerType !== 'mouse' ||
          !window.matchMedia('(hover: hover) and (pointer: fine)').matches
        )
          return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 20)
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12)
      }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      aria-labelledby="partners-title"
    >
      <motion.div
        className="partners-atmosphere"
        aria-hidden="true"
        style={{ y: reduced ? 0 : backgroundY }}
      >
        <motion.div
          className="partners-glow"
          style={{ x: reduced ? 0 : glowX, y: reduced ? 0 : glowY }}
        />
        <div className="partners-grid-light" />
        <Leaf className="partners-particle partners-particle--leaf" />
        <Dna className="partners-particle partners-particle--dna" />
      </motion.div>
      <Container>
        <div className="partners-editorial">
          <div>
            <p className="partners-eyebrow partners-reveal">
              {t('partners.eyebrow')}
            </p>
            <h2 id="partners-title">
              <span className="partners-line">
                <span className="partners-reveal">{t('partners.heading')}</span>
              </span>
              <span className="partners-line">
                <em className="partners-reveal">{t('partners.accent')}</em>
              </span>
            </h2>
          </div>
          <div className="partners-context">
            <div className="partners-word" aria-hidden="true">
              <span className="partners-word-marker" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={reduced ? 0 : word}
                  initial={{ opacity: 0, y: reduced ? 0 : 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -7 }}
                  transition={{
                    duration: reduced ? 0 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {words[reduced ? 0 : word]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="partners-support partners-reveal">
              {t('partners.description')}
            </p>
          </div>
        </div>
      </Container>
      <motion.div
        className="partners-carousel-depth"
        style={{ y: reduced ? 0 : carouselY }}
      >
        <div
          className="partners-window"
          tabIndex={0}
          role="region"
          aria-label={t('partners.title')}
        >
          <div
            className={
              'partners-track' +
              (logos.length < 2 ? ' partners-track--static' : '')
            }
          >
            {[false, true].map((duplicate) => (
              <ul
                className="partners-group"
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
              >
                {logos.map(({ path, src }, index) => (
                  <li className="partner-logo" key={path}>
                    <img
                      src={nearby ? src : undefined}
                      alt={
                        duplicate
                          ? ''
                          : t('partners.image', { number: index + 1 })
                      }
                      width="144"
                      height="64"
                      loading="eager"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
