import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import MagneticLink from '../ui/MagneticLink'
import DnaGraphic from '../ui/DnaGraphic'
import DepthBackdrop from '../ui/DepthBackdrop'
import { company } from '../../data/company'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="contact-section section-anchor"
    >
      <Container>
        <div className="contact-panel">
          <DepthBackdrop variant="contact" />
          <DnaGraphic className="contact-dna" />
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">
              <span />
              {t('contact.eyebrow')}
            </p>
            <h2>
              {t('contact.title')}
              <br />
              <em>{t('contact.accent')}</em>
            </h2>
            <p>{t('contact.description')}</p>
            <span className="contact-topics">{t('contact.detail')}</span>
            <MagneticLink href={company.emailHref}>
              {t('contact.cta')}
            </MagneticLink>
          </div>
          <a className="contact-email" href={company.emailHref} dir="ltr">
            {company.email}
          </a>
          <span className="contact-panel-note">{t('contact.panelNote')}</span>
        </div>
      </Container>
    </section>
  )
}
