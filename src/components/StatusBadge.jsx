import { Clock, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useLang } from '../contexts/LangContext'

const CONFIGS = {
  pending:    { cls: 'badge-pending',    Icon: Clock,        key: 'job.status.pending' },
  processing: { cls: 'badge-processing', Icon: Loader2,      key: 'job.status.processing', spin: true },
  completed:  { cls: 'badge-completed',  Icon: CheckCircle2, key: 'job.status.completed' },
  failed:     { cls: 'badge-failed',     Icon: XCircle,      key: 'job.status.failed' },
  purged:     { cls: 'badge-pending',    Icon: Clock,        key: 'job.status.failed' },
}

export default function StatusBadge({ status }) {
  const { t } = useLang()
  const cfg = CONFIGS[status] || CONFIGS.pending
  const { cls, Icon, key, spin } = cfg
  return (
    <span className={cls}>
      <Icon size={11} className={spin ? 'animate-spin' : ''} />
      {t(key)}
    </span>
  )
}
