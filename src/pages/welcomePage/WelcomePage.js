import { useEffect } from 'react'
import { Welcome } from '../../components'
import { setHeaderCreateButton } from '../../utils'

export function WelcomePage() {
  useEffect(() => {
    setHeaderCreateButton('story')
  }, [])

  return (
    <Welcome />
  )
}
