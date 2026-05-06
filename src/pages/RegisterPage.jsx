import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLang } from '../contexts/LangContext'
import { useToast } from '../contexts/ToastContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const { t, locale } = useLang()
  const toast = useToast()
  const navigate = useNavigate()

  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Name must be at least 2 characters'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.password || form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      errs.password = 'Must contain uppercase, lowercase, and a number'
    }
    setErrors(errs)
    return !Object.keys(errs).length
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created! Welcome to Akuru.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100dvh-56px)] flex flex-col justify-center px-4 py-12">
      <div className="w-full max-w-sm mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-cream-100 mb-2">
            {t('auth.register.title')}
          </h1>
          <p className={`text-cream-300/60 text-sm ${locale === 'si' ? 'font-sinhala' : ''}`}>
            {t('auth.register.sub')}
          </p>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-1.5">{t('auth.register.name')}</label>
            <input
              type="text"
              className={`input-base ${errors.name ? 'border-ember-400' : ''}`}
              placeholder="Kamal Perera"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
              autoFocus
              disabled={loading}
            />
            {errors.name && <p className="text-ember-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-1.5">{t('auth.register.email')}</label>
            <input
              type="email"
              className={`input-base ${errors.email ? 'border-ember-400' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              inputMode="email"
              disabled={loading}
            />
            {errors.email && <p className="text-ember-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-cream-300 mb-1.5">{t('auth.register.password')}</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className={`input-base pr-12 ${errors.password ? 'border-ember-400' : ''}`}
                placeholder="Min 8 chars, upper + lower + number"
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-cream-300 transition-colors p-1"
                aria-label={showPw ? 'Hide' : 'Show'}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-ember-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary w-full mt-6" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-ink-900/40 border-t-ink-900 rounded-full animate-spin" />
                {t('generic.loading')}
              </span>
            ) : (
              <>
                <UserPlus size={18} />
                {t('auth.register.submit')}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-cream-300/50 mt-6">
          {t('auth.register.hasAccount')}{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            {t('auth.register.login')}
          </Link>
        </p>
      </div>
    </main>
  )
}
