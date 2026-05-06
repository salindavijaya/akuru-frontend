import { Link } from 'react-router-dom'
import { Camera, Wand2, Download, ArrowRight, FileText, BookOpen, Receipt, FileSpreadsheet } from 'lucide-react'
import { useLang } from '../contexts/LangContext'
import { useAuth } from '../contexts/AuthContext'

const STEPS = [
  { Icon: Camera,   bgColor: 'bg-gold-500/15',  iconColor: 'text-gold-400',  borderColor: 'border-gold-500/30',  titleKey: 'landing.step1.title', descKey: 'landing.step1.desc' },
  { Icon: Wand2,    bgColor: 'bg-leaf-500/15',   iconColor: 'text-leaf-400',  borderColor: 'border-leaf-500/30',  titleKey: 'landing.step2.title', descKey: 'landing.step2.desc' },
  { Icon: Download, bgColor: 'bg-ember-400/15',  iconColor: 'text-ember-400', borderColor: 'border-ember-400/30', titleKey: 'landing.step3.title', descKey: 'landing.step3.desc' },
]

const USECASES = [
  { Icon: Receipt,        key: 'landing.usecase.bills' },
  { Icon: FileText,       key: 'landing.usecase.letters' },
  { Icon: BookOpen,       key: 'landing.usecase.ledgers' },
  { Icon: FileSpreadsheet,key: 'landing.usecase.invoices' },
]

export default function LandingPage() {
  const { t, locale } = useLang()
  const { user } = useAuth()

  return (
    <main className="min-h-[calc(100dvh-56px)] overflow-x-hidden">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-20 max-w-screen-md mx-auto text-center">
        {/* Decorative glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)' }}
          aria-hidden
        />

        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-gold" />
          <span className="text-xs font-medium text-gold-400 tracking-wide uppercase">
            {t('landing.hero.tag')}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1] mb-6 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          {t('landing.hero.headline').split('\n').map((line, i) => (
            <span key={i} className={`block ${i === 0 ? 'text-cream-100' : 'text-gold-gradient'}`}>
              {line}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p
          className={`text-cream-300/70 text-base leading-relaxed max-w-sm mx-auto mb-10 animate-fade-up ${locale === 'si' ? 'font-sinhala' : ''}`}
          style={{ animationDelay: '160ms' }}
        >
          {t('landing.hero.sub')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          <Link to={user ? '/dashboard' : '/register'} className="btn-primary shadow-glow-gold text-base px-8">
            {t('landing.hero.cta')}
            <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn-secondary text-base px-8">
            {t('nav.login')}
          </Link>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section className="px-4 py-16 max-w-screen-md mx-auto">
        <h2 className={`font-display text-2xl font-semibold text-cream-100 text-center mb-10 ${locale === 'si' ? 'font-sinhala' : ''}`}>
          {t('landing.steps.title')}
        </h2>

        <div className="flex flex-col gap-4">
          {STEPS.map(({ Icon, bgColor, iconColor, borderColor, titleKey, descKey }, i) => (
            <div key={i} className="card flex items-start gap-4 p-5">
              {/* Step number + icon */}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-2xl ${bgColor} border ${borderColor} flex items-center justify-center`}>
                  <Icon size={22} className={iconColor} />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink-900 border border-ink-600 text-xs font-mono font-bold text-gold-400 flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className={`font-display font-semibold text-cream-100 text-lg mb-1 ${locale === 'si' ? 'font-sinhala' : ''}`}>
                  {t(titleKey)}
                </h3>
                <p className={`text-cream-300/60 text-sm leading-relaxed ${locale === 'si' ? 'font-sinhala' : ''}`}>
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use cases ───────────────────────────────────────────── */}
      <section className="px-4 pb-20 max-w-screen-md mx-auto">
        <h2 className={`font-display text-2xl font-semibold text-cream-100 text-center mb-8 ${locale === 'si' ? 'font-sinhala' : ''}`}>
          {t('landing.usecases.title')}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {USECASES.map(({ Icon, key }) => (
            <div key={key} className="card flex items-center gap-3 p-4">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Icon size={17} className="text-gold-400" />
              </div>
              <span className={`text-sm text-cream-200 font-medium leading-snug ${locale === 'si' ? 'font-sinhala' : ''}`}>
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA bar ──────────────────────────────────────── */}
      <section className="border-t border-ink-700 px-4 py-10 text-center">
        <Link to={user ? '/dashboard' : '/register'} className="btn-primary inline-flex shadow-glow-gold px-10">
          {t('landing.hero.cta')}
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  )
}
