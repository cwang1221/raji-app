import { AuthProvider } from './authContext'
import { EventProvider } from './eventContext'
import { HeaderCreateButtonProvider } from './headerCreateButtonContext'
import { LanguageProvider } from './languageContext'
import { SettingProvider } from './settingContext'

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <SettingProvider>
          <EventProvider>
            <HeaderCreateButtonProvider>
              {children}
            </HeaderCreateButtonProvider>
          </EventProvider>
        </SettingProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
