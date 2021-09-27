import { useRef, useEffect } from 'react'

export const useIsMounted = () => {
  const mounted = useRef(true)

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}
