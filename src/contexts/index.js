import { AuthProvider } from './authContext'
import { HeaderCreateButtonProvider } from './headerCreateButtonContext'
import { LanguageProvider } from './languageContext'
import { SettingProvider } from './settingContext'

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <SettingProvider>
          <HeaderCreateButtonProvider>
            {children}
          </HeaderCreateButtonProvider>
        </SettingProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
