import { useEffect } from 'react'
import { Welcome } from '../../components'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'

export function WelcomePage() {
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(() => {
    setHeaderCreateButtonType('story')
  }, [])

  return (
    <Welcome />
  )
}
