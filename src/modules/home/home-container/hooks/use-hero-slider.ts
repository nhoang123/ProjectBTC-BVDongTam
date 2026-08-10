import { useState, useEffect, useCallback, useRef } from 'react'

export function useHeroSlider(totalSlides: number, autoPlayInterval: number = 5000) {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startX = useRef(0)
  const currentX = useRef(0)
  const isSwiping = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const next = useCallback(() => {
    setIsTransitioning(true)
    setCurrent((prev) => prev + 1)
  }, [])

  const prev = useCallback(() => {
    setIsTransitioning(true)
    setCurrent((prev) => prev - 1)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    if (!isHovering && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        next()
      }, autoPlayInterval)
    }
  }, [isHovering, isDragging, autoPlayInterval, stopAutoPlay, next])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    stopAutoPlay()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    startX.current = clientX
    currentX.current = clientX
    isSwiping.current = true
    setIsDragging(true)
    setIsTransitioning(false)
  }, [stopAutoPlay])

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isSwiping.current) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diffX = clientX - startX.current
    currentX.current = clientX
    setDragOffset(diffX)
  }, [])

  const handleDragEnd = useCallback(() => {
    if (!isSwiping.current) return

    const diff = currentX.current - startX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      setIsTransitioning(true)
      if (diff > 0) {
        prev()
      } else {
        next()
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    isSwiping.current = false
    startAutoPlay()
  }, [next, prev, startAutoPlay])

  return {
    current,
    setCurrent,
    next,
    prev,
    isDragging,
    dragOffset,
    isTransitioning,
    containerRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    setIsHovering,
  }
}