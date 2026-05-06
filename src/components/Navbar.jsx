import { Link, useNavigate } from 'react-router-dom'
import { Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLang } from '../contexts/LangContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { t, locale, toggle } = useLang()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-ink-900/90 backdrop-blur-md border-b border-ink-700">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <span className="font-display text-xl font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
            Akuru
          </span>
          <span className="font-sinhala text-sm text-cream-300/60 group-hover:text-cream-300/80 transition-colors hidden xs:inline">
            අකුරු
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="
              flex items-center gap-1 px-3 py-1.5 rounded-lg
              text-xs font-medium border border-ink-600
              text-cream-300 hover:text-cream-100 hover:border-ink-500
              transition-all duration-200
              min-h-[36px]
            "
          >
            <span className={locale === 'en' ? 'text-gold-400 font-semibold' : 'text-cream-300/50'}>EN</span>
            <span className="text-ink-600">/</span>
            <span className={locale === 'si' ? 'text-gold-400 font-semibold font-sinhala' : 'text-cream-300/50 font-sinhala'}>සිං</span>
          </button>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="p-2 rounded-lg text-cream-300/70 hover:text-cream-100 hover:bg-ink-800 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label={t('nav.dashboard')}
              >
                <LayoutDashboard size={18} />
              </Link>
              <Link
                to="/settings"
                className="p-2 rounded-lg text-cream-300/70 hover:text-cream-100 hover:bg-ink-800 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label={t('nav.settings')}
              >
                <Settings size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-cream-300/70 hover:text-ember-400 hover:bg-ink-800 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label={t('nav.logout')}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-4 text-sm min-h-[40px]">
              {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
