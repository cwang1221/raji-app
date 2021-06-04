import { useState, createContext, useContext } from 'react'

const SettingContext = createContext()

export function SettingProvider({ children }) {
  const [setting, setSetting] = useState({})

  return (
    <SettingContext.Provider value={{ setting, setSetting }}>
      {children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = () => useContext(SettingContext)
