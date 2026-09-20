import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#07231f' : '#fafbf7')
    try {
      localStorage.setItem('herbanol-theme', theme)
    } catch {
      /* Storage is optional. */
    }
  }, [theme])
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === 'herbanol-theme')
        setTheme(event.newValue === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const label = t(theme === 'light' ? 'common.darkTheme' : 'common.lightTheme')
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  )
}
