import { Link } from 'react-router-dom'
import { ChevronRight, FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { useLang } from '../contexts/LangContext'

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-LK', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function JobCard({ job }) {
  const { t } = useLang()
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="
        flex items-center gap-3 px-4 py-4
        hover:bg-ink-700/50 active:bg-ink-700 transition-colors
        border-b border-ink-700 last:border-b-0
      "
    >
      {/* File icon */}
      <div className="w-10 h-10 rounded-xl bg-ink-700 flex items-center justify-center shrink-0">
        <FileText size={18} className="text-gold-400/70" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-cream-100 truncate font-medium leading-snug">
          {job.original_filename}
        </p>
        <p className="text-xs text-cream-300/50 mt-0.5">{formatDate(job.created_at)}</p>
      </div>

      {/* Status + chevron */}
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={job.status} />
        <ChevronRight size={16} className="text-ink-600" />
      </div>
    </Link>
  )
}
