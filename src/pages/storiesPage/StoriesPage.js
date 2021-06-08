import { useEffect } from 'react'
import { setHeaderCreateButton } from '../../utils'

export function StoriesPage() {
  useEffect(() => {
    setHeaderCreateButton('story')
  }, [])

  return (
    <h1>Stories Page</h1>
  )
}
