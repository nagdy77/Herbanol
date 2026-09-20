import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FacebookIcon from './FacebookIcon'

export default function MediaCover({
  src,
  title,
}: {
  src: string | null
  title: string
}) {
  const [failed, setFailed] = useState(false)
  const { t } = useTranslation()
  if (!src || failed)
    return (
      <div className="media-cover-placeholder">
        <FacebookIcon width={36} height={36} />
        <span>{t('brand.name')}</span>
        <strong>{title}</strong>
        <small>{t('media.placeholder')}</small>
      </div>
    )
  return (
    <img
      src={src}
      alt={t('media.coverAlt', { title })}
      width="1920"
      height="1080"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
