import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="section not-found">
      <Container>
        <p className="eyebrow" aria-hidden="true">
          404
        </p>
        <h1>{t('common.notFound')}</h1>
        <p>{t('common.notFoundText')}</p>
        <Link to="/" className="button button--primary">
          {t('common.back')}
        </Link>
      </Container>
    </section>
  )
}
