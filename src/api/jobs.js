import client from './client'

/**
 * Upload a document for transcription.
 * @param {File} file
 * @param {{ outputFormat, languageHint }} opts
 * @param {(pct: number) => void} onProgress
 */
export const transcribe = (file, opts = {}, onProgress) => {
  const form = new FormData()
  form.append('document', file)
  form.append('output_format', opts.outputFormat || 'all')
  form.append('language_hint', opts.languageHint || 'si')

  return client.post('/transcribe', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100))
    },
  }).then((r) => r.data.data)
}

/**
 * Get job status (and download URLs when completed).
 */
export const getJob = (jobId) =>
  client.get(`/jobs/${jobId}`).then((r) => r.data.data.job)

/**
 * List all jobs for the current user.
 */
export const listJobs = (params = {}) =>
  client.get('/jobs', { params }).then((r) => r.data.data)
