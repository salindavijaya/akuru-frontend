import axios from 'axios'
import { getToken, clearAuth } from '../utils/token'

// In production (Vercel), Vercel rewrites /api/* to the Cloud Run backend.
// In development, Vite proxy handles /api/* → localhost:3000.
// So baseURL is always /api/v1 — no env var needed in the client itself.
const client = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
client.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handling
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth()
      window.location.href = '/login'
    }
    const message =
      err.response?.data?.error?.message ||
      err.response?.data?.message ||
      err.message ||
      'Network error'
    return Promise.reject(new Error(message))
  }
)

export default client
