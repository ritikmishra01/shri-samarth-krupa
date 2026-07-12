import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * useScrollTop — scrolls to top on every route change.
 */
export function useScrollTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}

export default useScrollTop
