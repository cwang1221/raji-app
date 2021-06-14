import { useEffect } from 'react'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'

export function EpicsPage() {
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(() => {
    setHeaderCreateButtonType('epic')
  }, [])

  return (
    <h1>Epics Page</h1>
  )
}
