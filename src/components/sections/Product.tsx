import { useTranslation } from 'react-i18next'
import { Check, ArrowDown, Wind, Droplets, Dna } from 'lucide-react'
import Container from '../ui/Container'
import AnimatedNumber from '../ui/AnimatedNumber'
import { assets } from '../../data/assets'
import { productFeatures } from '../../data/product'
import { ScrollTrigger } from '../../utils/motion/gsap'

export default function Product() {
  const { t } = useTranslation()
  return (
    <section
      id="product"
      tabIndex={-1}
      className="product-section section-anchor"
    >
      <Container>
        <div className="product-section-label">
          <span>{t('product.showcaseLabel')}</span>
          <span>{t('product.support')}</span>
        </div>
        <div className="product-grid">
          <div className="product-copy" data-reveal>
            <p className="eyebrow">
              <span />
              {t('product.eyebrow')}
            </p>
            <h2>
              {t('product.title')}
              <br />
              <em>{t('product.accent')}</em>
            </h2>
            <p className="product-description">{t('product.description')}</p>
            <ul className="product-features">
              {productFeatures.map((key) => (
                <li key={key}>
                  <Check size={14} aria-hidden="true" />
                  {t('product.features.' + key)}
                </li>
              ))}
            </ul>
            <a href="#science" className="product-data-link">
              {t('product.dataLink')}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="product-stage">
            <div className="product-stage-grid" aria-hidden="true" />
            <div className="product-stage-halo" aria-hidden="true" />
            <div
              className="product-orbit product-orbit--one"
              aria-hidden="true"
            />
            <div
              className="product-orbit product-orbit--two"
              aria-hidden="true"
            />
            <div className="product-orbit-cross" aria-hidden="true">
              +
            </div>
            <span className="product-stage-label">{t('product.detail')}</span>
            <div className="product-image-scroll">
              <img
                src={assets.product}
                alt={t('product.alt')}
                loading="lazy"
                width="1120"
                height="1400"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
            <div className="volume-badge">
              <strong>
                <AnimatedNumber value={65} />
                <span>{t('product.unit')}</span>
              </strong>
              <span>{t('product.volume')}</span>
            </div>
            <div className="product-callout product-callout--roots">
              <Wind size={17} aria-hidden="true" />
              <span>{t('product.calloutRoot')}</span>
            </div>
            <div className="product-callout product-callout--water">
              <Droplets size={17} aria-hidden="true" />
              <div>
                <strong dir="ltr">642%</strong>
                <span>{t('product.calloutWater')}</span>
              </div>
            </div>
            <div className="product-callout product-callout--stable">
              <Dna size={17} aria-hidden="true" />
              <span>{t('product.calloutStable')}</span>
            </div>
          </div>
        </div>
        <div className="product-spec-strip" data-stagger>
          {['material', 'method', 'format'].map((key) => (
            <div key={key} data-reveal>
              <span>{t('product.' + key + 'Label')}</span>
              <p>{t('product.' + key + 'Text')}</p>
            </div>
          ))}
        </div>
        <div className="product-metrics">
          <div>
            <span className="metric-value" dir="ltr">
              <AnimatedNumber value={90} suffix="%" />
            </span>
            <span>{t('product.organic')}</span>
          </div>
          <div>
            <span className="metric-value" dir="ltr">
              <AnimatedNumber value={49} suffix="%" />
            </span>
            <span>{t('product.moisture')}</span>
          </div>
          <p>
            {t('product.analysisNote')}
            <a href="#science" aria-label={t('product.dataLink')}>
              <ArrowDown size={20} aria-hidden="true" />
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
