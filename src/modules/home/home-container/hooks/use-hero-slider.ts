'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export function useHeroSlider(total: number) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Hàm chuyển slide
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return
      setCurrent(index)
    },
    [total],
  )

  useEffect(() => {
    if (total <= 1) return
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      next()
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [total, next, current])

  return { current, next, prev, goTo }
}
