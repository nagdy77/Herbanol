import { useTranslation } from 'react-i18next'
import { Leaf, Dna, Sprout } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import DnaGraphic from '../ui/DnaGraphic'
import DepthBackdrop from '../ui/DepthBackdrop'

const steps = [
  { key: 'fibers', Icon: Leaf },
  { key: 'biology', Icon: Dna },
  { key: 'medium', Icon: Sprout },
] as const
export default function Process() {
  const { t } = useTranslation()
  return (
    <section
      id="technology"
      tabIndex={-1}
      className="section section-anchor process-section"
    >
      <DepthBackdrop variant="process" />
      <Container>
        <div className="process-heading">
          <SectionHeading
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            accent={t('process.accent')}
          >
            {t('process.description')}
          </SectionHeading>
          <DnaGraphic className="process-dna" />
        </div>
        <div className="process-flow">
          <svg
            className="process-connector"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 50 C160 50 170 50 330 50 S500 50 670 50 S840 50 1000 50"
              pathLength="1"
            />
          </svg>
          {steps.map(({ key, Icon }, index) => (
            <article className="process-step" data-reveal key={key}>
              <div className="process-node">
                <Icon size={30} strokeWidth={1.25} aria-hidden="true" />
              </div>
              <span className="step-index" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{t('process.steps.' + key + '.title')}</h3>
              <p>{t('process.steps.' + key + '.text')}</p>
            </article>
          ))}
        </div>
        <div className="process-summary" data-reveal>
          <p>{t('process.footnote')}</p>
          <div>
            {['material', 'method', 'outcome'].map((key) => (
              <span key={key}>{t('process.' + key)}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
