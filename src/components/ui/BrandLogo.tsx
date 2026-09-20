import { useTranslation } from 'react-i18next'
import logo from '../../assets/logos/ChatGPT Image Sep 20, 2026, 07_01_48 PM.png'

export default function BrandLogo() {
  const { t } = useTranslation()
  return (
    <img
      className="brand-logo"
      src={logo}
      alt={t('common.logo')}
      width="1254"
      height="1254"
    />
  )
}
