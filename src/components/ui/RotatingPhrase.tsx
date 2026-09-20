import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'

export default function RotatingPhrase() {
  const { t } = useTranslation()
  const reduced = useReducedMotionPreference()
  const scope = useRef<HTMLDivElement>(null)
  const inView = useInView(scope, { amount: 0.5 })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const phrases = t('hero.phrases', { returnObjects: true }) as string[]
  const current = reduced ? 0 : index

  useEffect(() => {
    if (reduced || paused || !inView) return
    const cycle = setInterval(() => {
      if (document.hidden) return
      setIndex((previous) => (previous + 1) % phrases.length)
    }, 4400)
    return () => {
      clearInterval(cycle)
    }
  }, [inView, reduced, paused, phrases.length])

  return (
    <div className="hero-rotation" ref={scope}>
      <div
        className="phrase-stage"
        aria-hidden="true"
        data-phrase-index={current}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          key={reduced ? 'static' : 'animated'}
        >
          <motion.span
            key={current}
            className={
              'rotating-phrase ' +
              (phrases[current].length > 14 ? 'rotating-phrase--long' : '')
            }
            initial={reduced ? false : { y: '55%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: '-45%', opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {phrases[current]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="phrase-controls">
        <span>{t('hero.ambition')}</span>
        {!reduced && (
          <button
            type="button"
            aria-label={t(paused ? 'common.resume' : 'common.pause')}
            aria-pressed={paused}
            onClick={() => {
              setPaused(!paused)
            }}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        )}
        <span className="phrase-dots" aria-hidden="true">
          {phrases.map((_, dot) => (
            <i key={dot} className={dot === current ? 'is-active' : ''} />
          ))}
        </span>
      </div>
    </div>
  )
}
