import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import FloatingContacts from './components/layout/FloatingContacts'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { pageSections } from './data/navigation'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const Home = lazy(() => import('./pages/Home'))
const IntroLoader = lazy(() => import('./components/layout/IntroLoader'))

export default function App() {
  const { t } = useTranslation()
  useSmoothScroll()
  return (
    <>
      <Suspense fallback={null}>
        <IntroLoader />
      </Suspense>
      <a href="#main-content" className="skip-link">
        {t('common.skip')}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="route-loading" role="status">
              {t('common.loading')}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {pageSections.map(({ path, section }) => (
              <Route
                key={path}
                path={path}
                element={<Navigate to={'/#' + section} replace />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingContacts />
    </>
  )
}
