import { Loader2 } from 'lucide-react'

export default function Spinner({ fullScreen, size = 24 }) {
  const icon = <Loader2 size={size} className="text-gold-400 animate-spin" />
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-ink-900">
        {icon}
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-12">
      {icon}
    </div>
  )
}
