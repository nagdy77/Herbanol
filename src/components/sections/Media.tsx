import { useTranslation } from 'react-i18next'
import { Play, ArrowUpRight, Film } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { company, videoCovers } from '../../data/company'
import MediaCover from '../ui/MediaCover'
import FacebookIcon from '../ui/FacebookIcon'

export default function Media() {
  const { t } = useTranslation()
  return (
    <section
      id="media"
      tabIndex={-1}
      className="section section-anchor media-section"
    >
      <Container>
        <div className="section-topline">
          <SectionHeading
            eyebrow={t('media.eyebrow')}
            title={t('media.title')}
            accent={t('media.accent')}
          />
          <p className="section-topline-description" data-reveal>
            {t('media.description')}
          </p>
        </div>
        <div className="media-collection-label">
          <Film size={16} aria-hidden="true" />
          <span>{t('media.collection')}</span>
          <span>{t('media.externalNote')}</span>
        </div>
        <div className="media-list" data-stagger>
          {company.videos.map((url, index) => (
            <a
              key={url}
              className={
                'media-item ' +
                (index === 0 ? 'media-item--featured' : 'media-item--compact')
              }
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              <div className={'media-art media-art--' + index}>
                <MediaCover
                  src={videoCovers[index] ?? null}
                  title={t('media.titles.' + index)}
                />
                <span className="media-art-shade" />
                <span className="media-art-index" aria-hidden="true">
                  0{index + 1}
                </span>
                {index === 0 && (
                  <span className="media-featured-label">
                    {t('media.featured')}
                  </span>
                )}
                <span className="media-play">
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                </span>
              </div>
              <div className="media-card-body">
                <span className="media-card-eyebrow">
                  {t('media.publishers.' + index)}
                </span>
                <h3>{t('media.titles.' + index)}</h3>
                <p>{t('media.cardDescription')}</p>
                <span className="media-card-cta">
                  {t('media.watch')}
                  <ArrowUpRight
                    size={18}
                    className="directional-icon"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <span className="sr-only">{t('common.external')}</span>
            </a>
          ))}
        </div>
        <div className="media-social-links">
          <a
            href={company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link media-follow"
          >
            <FacebookIcon />
            {t('media.facebook')}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="directional-icon"
            />
            <span className="sr-only">{t('common.external')}</span>
          </a>
          <a
            href={company.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link media-follow"
          >
            {t('media.linkedin')}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="directional-icon"
            />
            <span className="sr-only">{t('common.external')}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
