import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '../ui/ThemeToggle'
import BrandLogo from '../ui/BrandLogo'
import Container from '../ui/Container'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { navigation } from '../../data/navigation'

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (
        !panel.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])

  return (
    <header className="site-header">
      <Container>
        <div className="header-inner">
          <Link
            to="/"
            className="wordmark"
            aria-label={t('common.home')}
            onClick={() => setOpen(false)}
          >
            <BrandLogo />
          </Link>
          <nav className="desktop-nav" aria-label={t('common.navigation')}>
            {navigation.map(({ id, key }) => (
              <Link
                key={id}
                to={'/#' + id}
                aria-current={
                  location.hash === '#' + id ? 'location' : undefined
                }
              >
                {t('nav.' + key)}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link to="/#contact" className="header-contact">
              {t('common.contact')}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="directional-icon"
              />
            </Link>
            <button
              ref={toggle}
              type="button"
              className="menu-toggle"
              aria-label={t(open ? 'common.close' : 'common.menu')}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          ref={panel}
          id="mobile-navigation"
          className="mobile-navigation"
          hidden={!open}
        >
          <BrandLogo />
          <nav aria-label={t('common.navigation')}>
            {[
              ...navigation,
              { id: 'sustainability', key: 'sustainability' },
              { id: 'media', key: 'achievements' },
              { id: 'contact', key: 'contact' },
            ].map(({ id, key }) => (
              <Link key={id} to={'/#' + id} onClick={() => setOpen(false)}>
                {t('nav.' + key)}
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="directional-icon"
                />
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}
