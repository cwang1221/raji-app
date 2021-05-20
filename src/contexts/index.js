import { AuthProvider } from './authContext'
import { LanguageProvider } from './languageContext'

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  )
}
