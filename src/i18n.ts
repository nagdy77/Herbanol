import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import ar from './locales/ar/translation.json'

export const languageStorageKey = 'herbanol-language'

function savedLanguage() {
  try {
    return localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

function applyLanguage(language: string) {
  const locale = language === 'ar' ? 'ar' : 'en'
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.title = i18n.t('meta.title', { lng: locale })
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description', { lng: locale }))
  try {
    localStorage.setItem(languageStorageKey, locale)
  } catch {
    // Browsing with storage disabled still supports switching language.
  }
}

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: savedLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],
  interpolation: { escapeValue: false },
  initAsync: false,
})
applyLanguage(i18n.language)
i18n.on('languageChanged', applyLanguage)

export default i18n
