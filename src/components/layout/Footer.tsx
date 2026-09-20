import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp, Dna } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import Container from '../ui/Container'
import { company } from '../../data/company'
import FacebookIcon from '../ui/FacebookIcon'
import DeveloperCredit from '../ui/DeveloperCredit'
import creditStyles from '../ui/DeveloperCredit.module.css'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-focus">
          <Dna size={28} strokeWidth={1} aria-hidden="true" />
          <div>
            <span>{t('footer.focusLabel')}</span>
            <p>{t('footer.focusText')}</p>
          </div>
          <Link to="/#home" aria-label={t('footer.top')}>
            <ArrowUp size={20} />
          </Link>
        </div>
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="wordmark">
              <BrandLogo />
            </Link>
            <p>{t('brand.identity')}</p>
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-links">
            <h2>{t('footer.explore')}</h2>
            {[
              { id: 'about', key: 'about' },
              { id: 'product', key: 'products' },
              { id: 'sustainability', key: 'sustainability' },
              { id: 'media', key: 'achievements' },
            ].map(({ id, key }) => (
              <Link to={'/#' + id} key={id}>
                {t('nav.' + key)}
              </Link>
            ))}
          </div>
          <div className="footer-links">
            <h2>{t('footer.connect')}</h2>
            <a href={company.emailHref} dir="ltr">
              {company.email}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <Link to="/#location">
              {t('footer.find')}
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="directional-icon"
              />
            </Link>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common.linkedin')}
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="directional-icon"
              />
              <span className="sr-only">{t('common.external')}</span>
            </a>
            <a
              href={company.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
              {t('common.facebook')}
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="directional-icon"
              />
              <span className="sr-only">{t('common.external')}</span>
            </a>
          </div>
        </div>
        <p className="footer-statement">{t('footer.statement')}</p>
        <div className={'footer-bottom ' + creditStyles.row}>
          <span dir="auto">
            {t('common.copyright', { year: new Date().getFullYear() })}
          </span>
          <DeveloperCredit />
        </div>
      </Container>
    </footer>
  )
}
