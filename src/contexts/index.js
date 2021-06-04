import { AuthProvider } from './authContext'
import { LanguageProvider } from './languageContext'
import { SettingProvider } from './settingContext'

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <SettingProvider>
          {children}
        </SettingProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
