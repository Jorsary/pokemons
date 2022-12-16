import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState()
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
      setIsPending(false)
    }, delay)

    return () => {
      clearTimeout(timeout)
      setIsPending(true)
    }
  }, [value, delay])

  return [debouncedValue, isPending]
}

export default useDebounce
