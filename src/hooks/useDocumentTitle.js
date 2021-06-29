import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    const oldDocumentTitle = document.title
    document.title = `Raji - ${title}`
    return () => {
      document.title = oldDocumentTitle
    }
  }, [])
}
