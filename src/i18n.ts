import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  interpolation: { escapeValue: false },
  initAsync: false,
})
document.documentElement.lang = 'en'
document.documentElement.dir = 'ltr'
document.title = i18n.t('meta.title')
document
  .querySelector('meta[name="description"]')
  ?.setAttribute('content', i18n.t('meta.description'))
try {
  localStorage.removeItem('herbanol-language')
} catch {
  // English remains available when browser storage is disabled.
}
export default i18n
