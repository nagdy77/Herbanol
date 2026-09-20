import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'
import { FileCheck2, ScanLine, ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { productAnalysis } from '../../data/product'

export default function Science() {
  const { t } = useTranslation()
  const reduced = useReducedMotionPreference()
  const [selected, setSelected] = useState<string>('ph')
  const reading = productAnalysis.find(({ key }) => key === selected)!
  return (
    <section
      id="science"
      tabIndex={-1}
      className="section section-anchor science-section"
    >
      <Container>
        <div className="science-grid">
          <div className="science-intro">
            <SectionHeading
              eyebrow={t('science.eyebrow')}
              title={t('science.title')}
              accent={t('science.accent')}
            >
              {t('science.description')}
            </SectionHeading>
            <div className="analysis-focus" data-reveal>
              <div className="readout-eyebrow">
                <ScanLine size={17} aria-hidden="true" />
                <span>{t('science.readout')}</span>
                <i />
              </div>
              <div aria-live="polite" aria-atomic="true">
                <motion.div
                  className="readout-content"
                  key={selected}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <strong dir="ltr">{reading.value}</strong>
                  <span>{t('science.labels.' + reading.key)}</span>
                </motion.div>
              </div>
              <span className="readout-rule" aria-hidden="true" />
              <p>{t('science.unitNote')}</p>
            </div>
            <div className="datasheet-note" data-reveal>
              <FileCheck2 size={21} aria-hidden="true" />
              <div>
                <h3>{t('science.datasheet')}</h3>
                <p>{t('science.freeFrom')}</p>
              </div>
            </div>
          </div>
          <div className="analysis-panel" data-reveal>
            <div className="analysis-panel-heading">
              <span>{t('science.focusLabel')}</span>
              <p>{t('science.focusHint')}</p>
            </div>
            <table>
              <caption className="sr-only">{t('science.caption')}</caption>
              <thead>
                <tr>
                  <th scope="col">{t('science.parameter')}</th>
                  <th scope="col">{t('science.value')}</th>
                </tr>
              </thead>
              <tbody>
                {productAnalysis.map(({ key, value }) => (
                  <tr
                    key={key}
                    className={selected === key ? 'is-selected' : ''}
                  >
                    <th scope="row">
                      <button
                        type="button"
                        aria-pressed={selected === key}
                        aria-label={t('science.rowLabel', {
                          parameter: t('science.labels.' + key),
                        })}
                        onClick={() => setSelected(key)}
                      >
                        {t('science.labels.' + key)}
                        <ArrowUpRight
                          size={12}
                          aria-hidden="true"
                          className="directional-icon"
                        />
                      </button>
                    </th>
                    <td>
                      <bdi dir="ltr">{value}</bdi>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="analysis-source">{t('science.source')}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
