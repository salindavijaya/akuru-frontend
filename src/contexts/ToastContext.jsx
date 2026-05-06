import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

const ICONS = {
  success: <CheckCircle size={18} className="text-leaf-400 shrink-0" />,
  error:   <AlertCircle size={18} className="text-ember-400 shrink-0" />,
  info:    <Info       size={18} className="text-gold-400  shrink-0" />,
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id])
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idCounter
    setToasts((prev) => [...prev.slice(-4), { id, message, type }]) // max 5
    timers.current[id] = setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error', dur),
    info:    (msg, dur) => addToast(msg, 'info', dur),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast stack — bottom of screen, thumb-friendly */}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
        style={{ maxWidth: 420, margin: '0 auto' }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="
              pointer-events-auto flex items-start gap-3
              bg-ink-800 border border-ink-600 rounded-2xl
              px-4 py-3.5 shadow-card
              animate-fade-up
            "
          >
            {ICONS[t.type]}
            <span className="flex-1 text-sm text-cream-100 font-body leading-snug">
              {t.message}
            </span>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-ink-600 hover:text-cream-300 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
