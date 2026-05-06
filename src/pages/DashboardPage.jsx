import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Wand2, ChevronDown } from 'lucide-react'
import { transcribe, listJobs } from '../api/jobs'
import FileDropzone from '../components/FileDropzone'
import JobCard from '../components/JobCard'
import Spinner from '../components/Spinner'
import { useLang } from '../contexts/LangContext'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const FORMAT_OPTIONS = [
  { value: 'all',  labelEn: 'DOCX + PDF + Text',   labelSi: 'DOCX + PDF + පාඨය' },
  { value: 'docx', labelEn: 'DOCX only',            labelSi: 'DOCX පමණි' },
  { value: 'pdf',  labelEn: 'PDF only',             labelSi: 'PDF පමණි' },
  { value: 'json', labelEn: 'Text (JSON) only',     labelSi: 'පාඨය (JSON) පමණි' },
]

export default function DashboardPage() {
  const { t, locale } = useLang()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [file, setFile]           = useState(null)
  const [format, setFormat]       = useState('all')
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)

  // Job history
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => listJobs({ limit: 20 }),
    staleTime: 10000,
  })

  const jobs = jobsData?.jobs || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) { toast.error('Please select a file first.'); return }
    setUploading(true)
    setUploadPct(0)
    try {
      const result = await transcribe(
        file,
        { outputFormat: format, languageHint: 'si' },
        setUploadPct
      )
      toast.success('Document uploaded! Processing started.')
      qc.invalidateQueries({ queryKey: ['jobs'] })
      navigate(`/jobs/${result.job_id}`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setUploading(false)
      setUploadPct(0)
    }
  }

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6 pb-20 space-y-8">

      {/* Greeting */}
      <div className="pt-2">
        <h1 className="font-display text-2xl font-semibold text-cream-100">
          {locale === 'si'
            ? <span className="font-sinhala">ආයුබෝවන්, {user?.name}</span>
            : `Welcome, ${user?.name?.split(' ')[0]}`
          }
        </h1>
        <p className={`text-cream-300/50 text-sm mt-0.5 ${locale === 'si' ? 'font-sinhala' : ''}`}>
          {t('dash.upload.title')}
        </p>
      </div>

      {/* Upload card */}
      <section className="card p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FileDropzone onFile={setFile} disabled={uploading} />

          {/* Format selector */}
          <div>
            <label className={`block text-sm font-medium text-cream-300 mb-2 ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('dash.upload.format')}
            </label>
            <div className="relative">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                disabled={uploading}
                className="input-base appearance-none pr-10 cursor-pointer"
              >
                {FORMAT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {locale === 'si' ? o.labelSi : o.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 pointer-events-none" />
            </div>
          </div>

          {/* Upload progress bar */}
          {uploading && uploadPct > 0 && uploadPct < 100 && (
            <div className="w-full h-1.5 bg-ink-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadPct}%` }}
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={uploading || !file}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-ink-900/40 border-t-ink-900 rounded-full animate-spin" />
                {uploadPct > 0 && uploadPct < 100 ? `${uploadPct}%` : t('dash.upload.uploading')}
              </span>
            ) : (
              <>
                <Wand2 size={18} />
                <span className={locale === 'si' ? 'font-sinhala' : ''}>{t('dash.upload.submit')}</span>
              </>
            )}
          </button>
        </form>
      </section>

      {/* Job history */}
      <section>
        <h2 className={`font-display text-lg font-semibold text-cream-100 mb-3 ${locale === 'si' ? 'font-sinhala' : ''}`}>
          {t('dash.jobs.title')}
        </h2>

        {jobsLoading ? (
          <Spinner />
        ) : jobs.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-12 text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-ink-700 border border-ink-600 flex items-center justify-center">
              <Wand2 size={24} className="text-ink-600" />
            </div>
            <p className={`text-cream-300/50 text-sm max-w-[220px] ${locale === 'si' ? 'font-sinhala' : ''}`}>
              {t('dash.jobs.empty')}
            </p>
          </div>
        ) : (
          <div className="card overflow-hidden divide-y divide-ink-700">
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </section>
    </main>
  )
}
