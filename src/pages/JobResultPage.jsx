import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  ArrowLeft, Copy, Check, Download, FileText,
  FileIcon, Loader2, AlertTriangle, Clock
} from 'lucide-react'
import { useJobPoller } from '../hooks/useJobPoller'
import StatusBadge from '../components/StatusBadge'
import Spinner from '../components/Spinner'
import { useLang } from '../contexts/LangContext'
import { useToast } from '../contexts/ToastContext'

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-LK', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

const CONFIDENCE_STYLES = {
  high:   'text-leaf-400 border-leaf-500/30 bg-leaf-500/10',
  medium: 'text-gold-300 border-gold-500/30 bg-gold-500/10',
  low:    'text-ember-400 border-ember-500/30 bg-ember-500/10',
}

export default function JobResultPage() {
  const { id } = useParams()
  const { t, locale } = useLang()
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  const { job, isLoading, isError, isPolling } = useJobPoller(id)

  const copyText = async () => {
    if (!job?.extracted_text) return
    try {
      await navigator.clipboard.writeText(job.extracted_text)
      setCopied(true)
      toast.success(t('job.text.copied'))
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error('Could not copy. Please select and copy manually.')
    }
  }

  if (isLoading) return <Spinner fullScreen />
  if (isError) return (
    <main className="max-w-screen-md mx-auto px-4 py-12 text-center">
      <AlertTriangle size={40} className="text-ember-400 mx-auto mb-4" />
      <p className="text-cream-300">{t('generic.error')}</p>
      <Link to="/dashboard" className="btn-secondary inline-flex mt-6">{t('job.back')}</Link>
    </main>
  )

  const confidence = job?.extracted_text
    ? (() => {
        const sinhala = [...(job.extracted_text)].filter(c => c.codePointAt(0) >= 0x0D80 && c.codePointAt(0) <= 0x0DFF).length
        const ratio = sinhala / Math.max(job.extracted_text.length, 1)
        return ratio > 0.6 ? 'high' : ratio > 0.2 ? 'medium' : 'low'
      })()
    : null

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 pb-20 space-y-6">
      {/* Back nav */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-cream-300/60 hover:text-cream-200 transition-colors"
      >
        <ArrowLeft size={16} />
        <span className={locale === 'si' ? 'font-sinhala' : ''}>{t('job.back')}</span>
      </Link>

      {/* Header card */}
      <div className="card p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-ink-700 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-gold-400" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg font-semibold text-cream-100 leading-snug truncate max-w-[200px]">
                {job?.original_filename}
              </h1>
              <p className="text-xs text-cream-300/50 mt-0.5">{formatDate(job?.created_at)}</p>
            </div>
          </div>
          <StatusBadge status={job?.status} />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2">
          {job?.page_count > 0 && (
            <span className="text-xs bg-ink-700 border border-ink-600 rounded-full px-2.5 py-1 text-cream-300/70">
              {job.page_count} {t('job.pages')}
            </span>
          )}
          {confidence && (
            <span className={`text-xs rounded-full px-2.5 py-1 border ${CONFIDENCE_STYLES[confidence]}`}>
              {t(`job.confidence.${confidence}`)}
            </span>
          )}
          {job?.expires_at && (
            <span className="flex items-center gap-1 text-xs bg-ink-700 border border-ink-600 rounded-full px-2.5 py-1 text-cream-300/50">
              <Clock size={10} />
              {t('job.expires')} {new Date(job.expires_at).toLocaleDateString('en-LK')}
            </span>
          )}
        </div>
      </div>

      {/* Polling animation */}
      {isPolling && (
        <div className="card flex items-center gap-4 p-5 border-gold-500/20 bg-gold-500/5">
          <Loader2 size={20} className="text-gold-400 animate-spin shrink-0" />
          <div>
            <p className={`text-sm text-gold-300 font-medium ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('job.status.processing')}
            </p>
            <p className={`text-xs text-cream-300/50 mt-0.5 ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('job.polling')}
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {job?.status === 'failed' && (
        <div className="card flex items-start gap-4 p-5 border-ember-500/20 bg-ember-500/5">
          <AlertTriangle size={20} className="text-ember-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-ember-300 font-medium">Transcription failed</p>
            <p className="text-xs text-cream-300/50 mt-1">{job.error_message || 'Unknown error. Please try again.'}</p>
          </div>
        </div>
      )}

      {/* Extracted text */}
      {job?.status === 'completed' && job?.extracted_text && (
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-700">
            <h2 className={`text-sm font-semibold text-cream-200 ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('job.text.title')}
            </h2>
            <button
              onClick={copyText}
              className="flex items-center gap-1.5 text-xs text-cream-300/60 hover:text-gold-400 transition-colors min-h-[36px] px-2"
            >
              {copied ? <Check size={14} className="text-leaf-400" /> : <Copy size={14} />}
              <span className={locale === 'si' ? 'font-sinhala' : ''}>
                {copied ? t('job.text.copied') : t('job.text.copy')}
              </span>
            </button>
          </div>
          <div className="p-5">
            <pre className="font-sinhala text-cream-200 text-sm leading-[2] whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto">
              {job.extracted_text}
            </pre>
          </div>
        </section>
      )}

      {/* Download buttons */}
      {job?.status === 'completed' && job?.downloads && (
        <section className="space-y-3">
          {job.downloads.docx && (
            <a
              href={job.downloads.docx}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <FileIcon size={18} />
              <span className={locale === 'si' ? 'font-sinhala' : ''}>{t('job.download.docx')}</span>
            </a>
          )}
          {job.downloads.pdf && (
            <a
              href={job.downloads.pdf}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full"
            >
              <Download size={18} />
              <span className={locale === 'si' ? 'font-sinhala' : ''}>{t('job.download.pdf')}</span>
            </a>
          )}
        </section>
      )}

      {/* Pending state placeholder */}
      {job?.status === 'pending' && (
        <div className="card p-8 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center animate-pulse-gold">
            <Clock size={28} className="text-gold-400/60" />
          </div>
          <p className={`text-cream-300/60 text-sm ${locale === 'si' ? 'font-sinhala' : ''}`}>
            {t('job.status.pending')}
          </p>
        </div>
      )}
    </main>
  )
}
