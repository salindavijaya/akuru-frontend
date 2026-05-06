import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Key, Plus, Trash2, Copy, Check, Globe } from 'lucide-react'
import { listApiKeys, createApiKey, revokeApiKey } from '../api/auth'
import { useLang } from '../contexts/LangContext'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import Spinner from '../components/Spinner'

export default function SettingsPage() {
  const { t, locale, setLang } = useLang()
  const { user } = useAuth()
  const toast = useToast()
  const qc = useQueryClient()

  const [newKeyName, setNewKeyName]       = useState('')
  const [showNewKey, setShowNewKey]       = useState(null) // { id, key, name }
  const [copiedKey, setCopiedKey]         = useState(false)
  const [revokeConfirm, setRevokeConfirm] = useState(null) // keyId

  // Fetch keys
  const { data: keys = [], isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: listApiKeys,
  })

  // Create key mutation
  const createMutation = useMutation({
    mutationFn: () => createApiKey(newKeyName.trim()),
    onSuccess: (data) => {
      setShowNewKey(data)
      setNewKeyName('')
      qc.invalidateQueries({ queryKey: ['api-keys'] })
      toast.info(t('settings.keys.warning'))
    },
    onError: (err) => toast.error(err.message),
  })

  // Revoke key mutation
  const revokeMutation = useMutation({
    mutationFn: (keyId) => revokeApiKey(keyId),
    onSuccess: () => {
      setRevokeConfirm(null)
      qc.invalidateQueries({ queryKey: ['api-keys'] })
      toast.success('API key revoked.')
    },
    onError: (err) => toast.error(err.message),
  })

  const copyNewKey = async () => {
    if (!showNewKey?.key) return
    await navigator.clipboard.writeText(showNewKey.key)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2500)
  }

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 pb-20 space-y-8">

      {/* Title */}
      <h1 className={`font-display text-2xl font-semibold text-cream-100 ${locale === 'si' ? 'font-sinhala' : ''}`}>
        {t('settings.title')}
      </h1>

      {/* ─── Profile ───────────────────────────────────────────── */}
      <section className="card p-5 space-y-3">
        <h2 className={`text-sm font-semibold text-cream-300 uppercase tracking-widest ${locale === 'si' ? 'font-sinhala' : ''}`}>
          {t('settings.profile.title')}
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
            <span className="font-display text-gold-400 text-lg font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-cream-100 font-medium">{user?.name}</p>
            <p className="text-cream-300/50 text-sm">{user?.email}</p>
          </div>
        </div>
      </section>

      {/* ─── Language ──────────────────────────────────────────── */}
      <section className="card p-5 space-y-4">
        <h2 className={`text-sm font-semibold text-cream-300 uppercase tracking-widest flex items-center gap-2 ${locale === 'si' ? 'font-sinhala' : ''}`}>
          <Globe size={14} />
          {t('settings.lang.title')}
        </h2>
        <div className="flex gap-3">
          {[
            { code: 'en', labelKey: 'settings.lang.en' },
            { code: 'si', labelKey: 'settings.lang.si' },
          ].map(({ code, labelKey }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`
                flex-1 py-3 rounded-xl border text-sm font-medium transition-all
                ${locale === code
                  ? 'bg-gold-500/15 border-gold-500/40 text-gold-300'
                  : 'bg-ink-800 border-ink-600 text-cream-300/60 hover:border-ink-500'}
                ${code === 'si' ? 'font-sinhala' : ''}
              `}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </section>

      {/* ─── API Keys ──────────────────────────────────────────── */}
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-700">
          <h2 className={`text-sm font-semibold text-cream-300 uppercase tracking-widest flex items-center gap-2 ${locale === 'si' ? 'font-sinhala' : ''}`}>
            <Key size={14} />
            {t('settings.keys.title')}
          </h2>
        </div>

        {/* New key revealed */}
        {showNewKey && (
          <div className="m-4 p-4 rounded-2xl border border-gold-500/30 bg-gold-500/8 space-y-3 animate-fade-in">
            <p className={`text-xs font-medium text-gold-300 ${locale === 'si' ? 'font-sinhala' : ''}`}>
              ⚠ {t('settings.keys.warning')}
            </p>
            <div className="flex items-center gap-2 bg-ink-900 rounded-xl px-3 py-2.5 border border-ink-600">
              <code className="font-mono text-xs text-cream-200 flex-1 break-all select-all">
                {showNewKey.key}
              </code>
              <button
                onClick={copyNewKey}
                className="shrink-0 text-ink-600 hover:text-gold-400 transition-colors min-h-[32px] px-1"
                aria-label="Copy"
              >
                {copiedKey ? <Check size={16} className="text-leaf-400" /> : <Copy size={16} />}
              </button>
            </div>
            <button
              onClick={() => setShowNewKey(null)}
              className="text-xs text-cream-300/50 hover:text-cream-300 transition-colors"
            >
              {t('generic.close')}
            </button>
          </div>
        )}

        {/* Keys list */}
        <div className="divide-y divide-ink-700">
          {isLoading ? (
            <Spinner />
          ) : keys.length === 0 ? (
            <p className={`px-5 py-8 text-sm text-cream-300/40 text-center ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('settings.keys.empty')}
            </p>
          ) : (
            keys.map((key) => (
              <div key={key.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream-100 font-medium truncate">{key.name}</p>
                  <p className="text-xs font-mono text-cream-300/40 mt-0.5">{key.key_prefix}</p>
                </div>
                {revokeConfirm === key.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => revokeMutation.mutate(key.id)}
                      disabled={revokeMutation.isPending}
                      className="text-xs text-ember-400 hover:text-ember-300 font-medium transition-colors min-h-[36px] px-2"
                    >
                      {t('generic.confirm')}
                    </button>
                    <button
                      onClick={() => setRevokeConfirm(null)}
                      className="text-xs text-cream-300/50 hover:text-cream-300 transition-colors min-h-[36px] px-2"
                    >
                      {t('generic.cancel')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setRevokeConfirm(key.id)}
                    className="p-2 text-ink-600 hover:text-ember-400 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-ember-500/10"
                    aria-label={t('settings.keys.revoke')}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Create key form */}
        <div className="px-5 py-4 border-t border-ink-700 flex gap-2">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder={t('settings.keys.name')}
            className="input-base flex-1 py-2.5 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && newKeyName.trim() && createMutation.mutate()}
          />
          <button
            onClick={() => newKeyName.trim() && createMutation.mutate()}
            disabled={!newKeyName.trim() || createMutation.isPending}
            className="btn-primary py-2.5 px-4 text-sm shrink-0"
          >
            {createMutation.isPending
              ? <span className="w-4 h-4 border-2 border-ink-900/40 border-t-ink-900 rounded-full animate-spin" />
              : <Plus size={18} />
            }
          </button>
        </div>
      </section>
    </main>
  )
}
