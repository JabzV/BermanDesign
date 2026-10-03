import { useEffect, useState } from 'react'

// Minimal hash router for the prototype: routes look like `#/learn/courses`.
function readPath() {
  const hash = window.location.hash
  return hash.startsWith('#/') ? hash.slice(1) : '/home'
}

export function useHashRoute() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => {
      setPath(readPath())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return path
}

export function navigate(path: string) {
  window.location.hash = path
}

export function isCampusHash() {
  return window.location.hash.startsWith('#/')
}
