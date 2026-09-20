import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

export default function Sustainability() {
  const { t } = useTranslation()
  return (
    <section
      id="sustainability"
      tabIndex={-1}
      className="section section-anchor sustainability-section"
    >
      <Container>
        <div className="sustainability-grid">
          <div className="nature-art" data-reveal>
            <div className="nature-art-ring" aria-hidden="true" />
            <div
              className="nature-art-ring nature-art-ring--inner"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 500 500"
              className="plant-graphic"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="plant-stem"
                d="M250 413C250 320 243 238 307 114"
                pathLength="1"
              />
              <path
                className="plant-leaf"
                d="M259 282C194 289 131 260 119 178C201 169 262 209 259 282Z"
              />
              <path
                className="plant-leaf plant-leaf--second"
                d="M267 222C266 139 307 85 389 82C398 157 351 215 267 222Z"
              />
              <path
                className="plant-vein"
                d="M259 282L155 210M267 222L353 117"
                pathLength="1"
              />
              <path
                className="plant-root"
                d="M250 365C220 396 177 397 153 423M250 381C281 402 327 394 353 424M250 405L250 439"
              />
              <circle cx="116" cy="345" r="4" />
              <circle cx="386" cy="293" r="4" />
              <circle cx="230" cy="99" r="4" />
            </svg>
            <span className="nature-art-label">
              {t('sustainability.graphicLabel')}
            </span>
          </div>
          <div>
            <SectionHeading
              eyebrow={t('sustainability.eyebrow')}
              title={t('sustainability.title')}
              accent={t('sustainability.accent')}
            >
              {t('sustainability.description')}
            </SectionHeading>
            <div className="sustainability-points">
              {['local', 'nature', 'future'].map((key) => (
                <article key={key} data-reveal>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="directional-icon"
                  />
                  <div>
                    <h3>{t('sustainability.' + key + 'Title')}</h3>
                    <p>{t('sustainability.' + key + 'Text')}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
