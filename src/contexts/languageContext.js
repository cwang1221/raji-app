import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks'
import i18n from '../i18n'

const LOCAL_STORAGE_LANGUAGE_KEY = '__lang__'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage(LOCAL_STORAGE_LANGUAGE_KEY, 'en')

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => useContext(LanguageContext)
