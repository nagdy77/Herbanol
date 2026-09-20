import { useTranslation } from 'react-i18next'
import signature from '../../assets/images/Signature/ChatGPT Image Sep 20, 2026, 08_42_21 PM.png'
import styles from './DeveloperCredit.module.css'

export default function DeveloperCredit() {
  const { t } = useTranslation()
  return (
    <a
      className={'developer-credit ' + styles.credit}
      href="https://www.linkedin.com/in/abdelrahman-elnagdy-176a82244"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.developerLabel')}
    >
      <span aria-hidden="true">•</span>
      <span>{t('footer.developedBy')}</span>
      <img
        className={styles.signature}
        src={signature}
        alt=""
        width="54"
        height="18"
        loading="lazy"
      />
    </a>
  )
}
