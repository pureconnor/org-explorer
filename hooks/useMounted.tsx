import { useRef, useEffect } from 'react'

/**
 * Use this hook to ensure a component when a setState() call is desired.
 * This prevents us from attempting to update state from unmounted component
 * due to rerender triggered from up the component tree.
 * @returns mounted.current: boolean
 */
export const useIsMounted = () => {
  const mounted = useRef(true)

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}
