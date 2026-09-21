import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Container from '../ui/Container'
import './Partners.css'

// No naming rules: Vite discovers image files again on every build.
const logos = Object.entries(
  import.meta.glob<string>(
    '../../assets/logos/**/*.{png,jpg,jpeg,svg,webp,avif,gif,PNG,JPG,JPEG,SVG,WEBP,AVIF,GIF}',
    { eager: true, query: '?url', import: 'default' },
  ),
)
  .filter(
    ([path]) =>
      path !== '../../assets/logos/ChatGPT Image Sep 20, 2026, 07_01_48 PM.png',
  )
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({ path, src }))

export default function Partners() {
  const { t } = useTranslation()
  const scope = useRef<HTMLElement>(null)
  const nearby = useInView(scope, { once: true, margin: '400px' })
  if (!logos.length) return null
  return (
    <section
      ref={scope}
      className="partners-strip"
      aria-labelledby="partners-title"
    >
      <Container>
        <h2 id="partners-title">{t('partners.title')}</h2>
      </Container>
      <div
        className="partners-window"
        tabIndex={0}
        role="region"
        aria-label={t('partners.title')}
      >
        <div
          className={
            'partners-track' +
            (logos.length < 2 ? ' partners-track--static' : '')
          }
        >
          {[false, true].map((duplicate) => (
            <ul
              className="partners-group"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {logos.map(({ path, src }, index) => (
                <li className="partner-logo" key={path}>
                  <img
                    src={nearby ? src : undefined}
                    alt={
                      duplicate
                        ? ''
                        : t('partners.image', { number: index + 1 })
                    }
                    width="144"
                    height="64"
                    loading="eager"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
