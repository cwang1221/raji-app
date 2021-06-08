import { useEffect } from 'react'
import { setHeaderCreateButton } from '../../utils'

export function EpicsPage() {
  useEffect(() => {
    setHeaderCreateButton('epic')
  }, [])

  return (
    <h1>Epics Page</h1>
  )
}
