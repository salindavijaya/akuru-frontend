import { createContext, useContext, useState, useCallback } from 'react'
import { t as translate } from '../utils/i18n'

const LangContext = createContext(null)

export const LangProvider = ({ children }) => {
  const [locale, setLocale] = useState(
    () => localStorage.getItem('akuru_lang') || 'en'
  )

  const toggle = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'si' : 'en'
      localStorage.setItem('akuru_lang', next)
      return next
    })
  }, [])

  const setLang = useCallback((lang) => {
    localStorage.setItem('akuru_lang', lang)
    setLocale(lang)
  }, [])

  const t = useCallback((key) => translate(key, locale), [locale])

  return (
    <LangContext.Provider value={{ locale, t, toggle, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be inside LangProvider')
  return ctx
}
