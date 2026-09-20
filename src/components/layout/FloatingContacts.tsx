import { useEffect, useRef, useState } from 'react'
import { Mail, MessageCircle, X } from 'lucide-react'
import LinkedInIcon from '../ui/LinkedInIcon'
import { useTranslation } from 'react-i18next'
import { company } from '../../data/company'
import FacebookIcon from '../ui/FacebookIcon'

export default function FloatingContacts() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  const links = [
    {
      key: 'email',
      href: company.emailHref,
      icon: <Mail size={18} />,
      external: false,
    },
    {
      key: 'whatsapp',
      href: company.whatsapp,
      icon: <MessageCircle size={18} />,
      external: true,
    },
    {
      key: 'linkedin',
      href: company.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
    {
      key: 'facebook',
      href: company.facebook,
      icon: <FacebookIcon />,
      external: true,
    },
  ]
  return (
    <div className="floating-contacts" ref={root}>
      <nav
        id="floating-contact-links"
        className="floating-contact-links"
        aria-label={t('common.contacts')}
        hidden={!open}
      >
        {links
          .filter((link) => link.href)
          .map((link) => (
            <a
              key={link.key}
              href={link.href!}
              title={t('common.' + link.key)}
              aria-label={t('common.' + link.key)}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              <span aria-hidden="true">{link.icon}</span>
              <span>{t('common.' + link.key)}</span>
              {link.external && (
                <span className="sr-only">{t('common.external')}</span>
              )}
            </a>
          ))}
      </nav>
      <button
        ref={toggle}
        type="button"
        className="floating-contact-toggle"
        aria-expanded={open}
        aria-controls="floating-contact-links"
        aria-label={t(open ? 'common.closeContacts' : 'common.contacts')}
        title={t('common.contacts')}
        onClick={() => setOpen(!open)}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </button>
    </div>
  )
}
