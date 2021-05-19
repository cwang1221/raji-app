import { AuthProvider } from './authContext'

export function AppProvider({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
