import { useRef, useState, useCallback, useMemo } from 'react'

export default function useDebounce<T>(
  fn: (params: T) => void,
  delay: number
): [boolean, (params: T) => void] {
  const timeout = useRef<number>(Number.NaN)
  const [debouncing, setDebouncing] = useState(false)

  const debounce = useCallback(
    function debounce(params: T) {
      clearTimeout(timeout.current)
      setDebouncing(true)

      timeout.current = setTimeout(() => {
        setDebouncing(false)
        fn(params)
      }, delay)
    },
    [fn, delay]
  )

  return useMemo(() => [debouncing, debounce], [debouncing, debounce])
}
