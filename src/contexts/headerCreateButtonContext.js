import { createContext, useContext, useState } from 'react'

const HeaderCreateButtonContext = createContext()

export function HeaderCreateButtonProvider({ children }) {
  const [headerCreateButtonType, setHeaderCreateButtonType] = useState('story')

  return (
    <HeaderCreateButtonContext.Provider value={{ headerCreateButtonType, setHeaderCreateButtonType }}>
      {children}
    </HeaderCreateButtonContext.Provider>
  )
}

export const useHeaderCreateButtonContext = () => useContext(HeaderCreateButtonContext)
