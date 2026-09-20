import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Lightbulb, Leaf, ScanLine } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const values = [
  { key: 'innovation', Icon: Lightbulb },
  { key: 'sustainability', Icon: Leaf },
  { key: 'quality', Icon: ScanLine },
] as const
export default function About() {
  const { t } = useTranslation()
  return (
    <section
      id="about"
      tabIndex={-1}
      className="section section-anchor about-section"
    >
      <Container>
        <div className="about-intro">
          <SectionHeading
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            accent={t('about.accent')}
          >
            {t('about.support')}
          </SectionHeading>
          <p className="about-description" data-reveal>
            {t('about.description')}
          </p>
        </div>
        <div className="values-row">
          {values.map(({ key, Icon }, index) => (
            <div className="value-item" key={key} data-reveal>
              <Icon size={24} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span>{t('about.values.' + key)}</span>
                <p className="value-note">{t('about.valueNotes.' + key)}</p>
              </div>
              <span className="item-index" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="purpose-grid">
          {['mission', 'vision'].map((key) => (
            <article className="purpose-item" key={key} data-reveal>
              <h3>
                {t('about.' + key + 'Label')}
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="directional-icon"
                />
              </h3>
              <p>{t('about.' + key)}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
