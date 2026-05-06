import { useRef, useState, useCallback } from 'react'
import { Camera, Upload, File, X } from 'lucide-react'
import { useLang } from '../contexts/LangContext'

const ACCEPTED = 'image/jpeg,image/png,image/tiff,application/pdf'
const MAX_MB = 20

export default function FileDropzone({ onFile, disabled }) {
  const { t } = useLang()
  const fileRef = useRef(null)
  const cameraRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  const validate = (file) => {
    if (!file) return 'No file selected'
    const okType = ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf'].includes(file.type)
    if (!okType) return `File type not supported. Use JPEG, PNG, TIFF, or PDF.`
    if (file.size > MAX_MB * 1024 * 1024) return `File too large. Max ${MAX_MB}MB.`
    return null
  }

  const handleFile = useCallback((file) => {
    const err = validate(file)
    if (err) { setError(err); return }
    setError(null)
    setSelected(file)
    onFile(file)
  }, [onFile])

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const clear = (e) => {
    e.stopPropagation()
    setSelected(null)
    setError(null)
    onFile(null)
    if (fileRef.current) fileRef.current.value = ''
    if (cameraRef.current) cameraRef.current.value = ''
  }

  return (
    <div className="space-y-3">
      {/* Main drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !disabled && !selected && fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        className={`
          relative rounded-3xl border-2 border-dashed transition-all duration-300
          flex flex-col items-center justify-center gap-4
          min-h-[200px] p-6 cursor-pointer select-none
          ${dragOver
            ? 'border-gold-500 bg-gold-500/10 shadow-glow-gold'
            : selected
              ? 'border-leaf-500/50 bg-leaf-500/5 cursor-default'
              : 'border-ink-600 bg-ink-800/50 hover:border-gold-500/50 hover:bg-ink-800'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={t('dash.upload.drag')}
      >
        {selected ? (
          /* File selected state */
          <div className="flex flex-col items-center gap-3 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-leaf-500/20 border border-leaf-500/30 flex items-center justify-center">
              <File size={26} className="text-leaf-400" />
            </div>
            <div>
              <p className="text-cream-100 font-medium text-sm leading-snug max-w-[200px] truncate">
                {selected.name}
              </p>
              <p className="text-cream-300/50 text-xs mt-0.5">
                {(selected.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1.5 text-xs text-ember-400 hover:text-ember-300 transition-colors min-h-[36px] px-3"
            >
              <X size={13} />
              {t('generic.cancel')}
            </button>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-ink-700 border border-ink-600 flex items-center justify-center">
              <Upload size={24} className="text-gold-400" />
            </div>
            <div>
              <p className="text-cream-200 font-medium text-sm">{t('dash.upload.drag')}</p>
              <p className="text-cream-300/50 text-xs mt-1">{t('dash.upload.hint')}</p>
            </div>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED}
          className="sr-only"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={disabled}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={disabled}
        />
      </div>

      {/* Camera button — prominent on mobile */}
      {!selected && (
        <button
          type="button"
          onClick={() => !disabled && cameraRef.current?.click()}
          disabled={disabled}
          className="
            w-full flex items-center justify-center gap-3
            border border-ink-600 rounded-2xl py-3.5
            text-cream-300 hover:text-cream-100 hover:border-gold-500/50
            transition-all duration-200 text-sm font-medium
            min-h-[52px]
          "
        >
          <Camera size={18} className="text-gold-400" />
          {t('dash.upload.btn')}
        </button>
      )}

      {/* Error message */}
      {error && (
        <p className="text-ember-400 text-xs px-1 animate-fade-in">{error}</p>
      )}
    </div>
  )
}
