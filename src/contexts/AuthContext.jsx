import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { saveAuth, clearAuth, getToken, getUser } from '../utils/token'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(() => getUser())
  const [ready, setReady] = useState(false)

  // On mount — verify token still valid by calling /auth/me
  useEffect(() => {
    const token = getToken()
    if (!token) { setReady(true); return }
    authApi.getMe()
      .then((data) => setUser(data.user))
      .catch(() => { clearAuth(); setUser(null) })
      .finally(() => setReady(true))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password })
    saveAuth(data.token, data.user)
    setUser(data.user)
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const data = await authApi.register({ name, email, password })
    saveAuth(data.token, data.user)
    setUser(data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
