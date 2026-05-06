import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

import { AuthProvider }  from './contexts/AuthContext'
import { LangProvider }  from './contexts/LangContext'
import { ToastProvider } from './contexts/ToastContext'
import ProtectedRoute    from './components/ProtectedRoute'
import Navbar            from './components/Navbar'

import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/LoginPage'
import RegisterPage   from './pages/RegisterPage'
import DashboardPage  from './pages/DashboardPage'
import JobResultPage  from './pages/JobResultPage'
import SettingsPage   from './pages/SettingsPage'

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <LangProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-dvh flex flex-col bg-palm-texture">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/"          element={<LandingPage />} />
                    <Route path="/login"     element={<LoginPage />} />
                    <Route path="/register"  element={<RegisterPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/jobs/:id"  element={<ProtectedRoute><JobResultPage /></ProtectedRoute>} />
                    <Route path="/settings"  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="*"          element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </ToastProvider>
          </AuthProvider>
        </LangProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
