import { useTranslation } from 'react-i18next'
import { MapPin, Mail, ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { company, locationEmbedUrl } from '../../data/company'

export default function Location() {
  const { t } = useTranslation()
  return (
    <section
      id="location"
      tabIndex={-1}
      className="section section-anchor location-section"
    >
      <Container>
        <div className="location-grid">
          <div>
            <SectionHeading
              eyebrow={t('location.eyebrow')}
              title={t('location.title')}
              accent={t('location.accent')}
            >
              {t('location.description')}
            </SectionHeading>
            <div className="location-contact" data-reveal>
              <Mail size={20} aria-hidden="true" />
              <div>
                <span>{t('common.email')}</span>
                <a href={company.emailHref} dir="ltr">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
          <div className="map-panel" data-reveal>
            {locationEmbedUrl ? (
              <iframe
                src={locationEmbedUrl}
                title={t('location.mapTitle')}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="map-pending">
                <div className="map-grid" aria-hidden="true" />
                <span className="map-pin">
                  <MapPin size={34} strokeWidth={1} aria-hidden="true" />
                </span>
                <h3>{t('location.pendingTitle')}</h3>
                <p>{t('location.pendingText')}</p>
                <a href={company.emailHref} className="button button--primary">
                  {t('location.cta')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
