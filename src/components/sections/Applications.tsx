import { useTranslation } from 'react-i18next'
import {
  Sprout,
  Warehouse,
  Droplets,
  Package,
  Sprout as MushroomFarm,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const applications = [
  { key: 'nurseries', Icon: Sprout },
  { key: 'greenhouses', Icon: Warehouse },
  { key: 'hydroponics', Icon: Droplets },
  { key: 'potatoes', Icon: Package },
  { key: 'mushrooms', Icon: MushroomFarm },
] as const
export default function Applications() {
  const { t } = useTranslation()
  return (
    <section
      id="applications"
      tabIndex={-1}
      className="section section-anchor applications-section"
    >
      <Container>
        <div className="section-topline">
          <SectionHeading
            eyebrow={t('applications.eyebrow')}
            title={t('applications.title')}
            accent={t('applications.accent')}
          />
          <p className="section-topline-description" data-reveal>
            {t('applications.description')}
          </p>
        </div>
        <div className="applications-grid">
          {applications.map(({ key, Icon }, index) => (
            <article className="application-item" key={key} data-reveal>
              <span className="application-number" aria-hidden="true">
                0{index + 1}
              </span>
              <Icon
                className="application-icon"
                size={40}
                strokeWidth={1}
                aria-hidden="true"
              />
              <h3>{t('applications.items.' + key)}</h3>
              <span className="application-rule" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
