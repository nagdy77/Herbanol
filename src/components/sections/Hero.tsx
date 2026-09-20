import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Dna, Leaf } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import MagneticLink from '../ui/MagneticLink'
import DnaGraphic from '../ui/DnaGraphic'
import DepthBackdrop from '../ui/DepthBackdrop'
import RotatingPhrase from '../ui/RotatingPhrase'
import { assets } from '../../data/assets'
import { ScrollTrigger } from '../../utils/motion/gsap'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 75, damping: 25 })
  const springY = useSpring(y, { stiffness: 75, damping: 25 })
  return (
    <section className="hero section-anchor" id="home" tabIndex={-1}>
      <DepthBackdrop variant="hero" />
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span />
              {t('hero.eyebrow')}
            </p>
            <h1 className="sr-only">{t('brand.tagline')}</h1>
            <div key={i18n.language} className="hero-title">
              {[t('hero.line1')].map((line, index) => (
                <span
                  className={
                    'title-line ' + (index === 1 ? 'title-line--accent' : '')
                  }
                  key={line}
                  aria-hidden="true"
                >
                  {line.split(' ').map((word, wordIndex) => (
                    <motion.span
                      className="reveal-word"
                      key={wordIndex}
                      initial={reduced ? false : { y: '105%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.12 + index * 0.14 + wordIndex * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </span>
              ))}
              <RotatingPhrase />
            </div>
            <p className="hero-description">{t('hero.description')}</p>
            <div className="hero-actions">
              <MagneticLink href="#product">{t('common.explore')}</MagneticLink>
              <a className="text-link" href="#about">
                {t('common.learn')}
              </a>
            </div>
            <div className="hero-resource">
              <Leaf size={19} aria-hidden="true" />
              <div>
                <strong>{t('hero.resourceTitle')}</strong>
                <span>{t('hero.resourceText')}</span>
              </div>
            </div>
          </div>
          <div
            className="hero-visual"
            onPointerMove={(event) => {
              if (
                reduced ||
                event.pointerType !== 'mouse' ||
                !matchMedia('(pointer: fine)').matches
              )
                return
              const bounds = event.currentTarget.getBoundingClientRect()
              x.set((event.clientX - bounds.left - bounds.width / 2) * 0.018)
              y.set((event.clientY - bounds.top - bounds.height / 2) * 0.018)
            }}
            onPointerLeave={() => {
              x.set(0)
              y.set(0)
            }}
          >
            <div className="hero-orbit" aria-hidden="true" />
            <DnaGraphic className="hero-dna" />
            <div className="hero-image-scroll">
              <motion.div
                className="hero-image-depth"
                style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
              >
                <figure className="hero-image-frame" data-image-reveal>
                  <img
                    src={i18n.language === 'ar' ? assets.heroAr : assets.heroEn}
                    alt={t('hero.imageAlt')}
                    width="1536"
                    height="1024"
                    fetchPriority="high"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                  <figcaption>
                    <span>{t('hero.caption')}</span>
                    <span>{t('hero.imageLabel')}</span>
                  </figcaption>
                </figure>
              </motion.div>
            </div>
            <div
              className="floating-label floating-label--top"
              aria-hidden="true"
            >
              <Dna size={19} />
              {t('hero.science')}
              <span className="status-dot" />
            </div>
            <div
              className="floating-label floating-label--bottom"
              aria-hidden="true"
            >
              <Leaf size={18} />
              {t('hero.environment')}
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-cue">
            <span className="scroll-cue-icon">
              <ArrowDown size={16} />
            </span>
            {t('common.scroll')}
          </a>
          <span className="hero-disciplines">
            {t('hero.science')}
            <span />
            {t('hero.nature')}
            <span />
            {t('hero.environment')}
          </span>
        </div>
      </Container>
    </section>
  )
}
