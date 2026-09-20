import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t('common.language')}
      dir="ltr"
    >
      <button
        type="button"
        lang="en"
        aria-pressed={i18n.language === 'en'}
        onClick={() => void i18n.changeLanguage('en')}
      >
        {t('common.english')}
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        lang="ar"
        aria-pressed={i18n.language === 'ar'}
        onClick={() => void i18n.changeLanguage('ar')}
      >
        {t('common.arabic')}
      </button>
    </div>
  )
}
