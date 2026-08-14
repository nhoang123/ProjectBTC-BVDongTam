'use client'

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Button } from '@/components/UI/button'

import { doctorsData } from '../data/mock-doctors'

import DoctorCard from './doctor-card'
import { DoctorPagination } from './doctor-pagination'
import { DoctorSliderControls } from './doctor-slider-controls'
import { SectionHeader } from './section-header'

const DoctorSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const startX = useRef(0)
  const currentX = useRef(0)
  const isSwiping = useRef(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = doctorsData.length
  const visibleSlides = isDesktop ? 3 : 1
  const maxIndex = Math.max(totalSlides - visibleSlides, 0)
  const activeIndex = Math.min(currentIndex, maxIndex)

  const firstSlideRef = useRef<HTMLDivElement>(null)
  const [stepSize, setStepSize] = useState(0)

  useEffect(() => {
    const calculateStep = () => {
      if (firstSlideRef.current) {
        const slideWidth = firstSlideRef.current.offsetWidth
        setStepSize(slideWidth)
      }
    }
    calculateStep()
    window.addEventListener('resize', calculateStep)
    return () => window.removeEventListener('resize', calculateStep)
  }, [])

  const transformStyle = stepSize > 0
    ? `translate3d(${-activeIndex * stepSize + dragOffset}px, 0, 0)`
    : 'translate3d(0, 0, 0)'

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateLayout = () => setIsDesktop(mediaQuery.matches)
    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  const scroll = useCallback(
    (scrollDirection: 'left' | 'right') => {
      if (scrollDirection === 'left') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
        setDirection(-1)
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
        setDirection(1)
      }
    },
    [maxIndex],
  )

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    if (maxIndex > 0 && !isHovering && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + direction

          if (nextIndex >= maxIndex) {
            setDirection(-1)
            return maxIndex
          }

          if (nextIndex <= 0) {
            setDirection(1)
            return 0
          }

          return nextIndex
        })
      }, 5000)
    }
  }, [maxIndex, isHovering, isDragging, direction, stopAutoPlay])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest('.slider-container')) {
        stopAutoPlay()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        startX.current = clientX
        currentX.current = clientX
        isSwiping.current = true
        setIsDragging(true)
      }
    },
    [stopAutoPlay],
  )

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
      if (diff > 0) {
        scroll('left')
      } else {
        scroll('right')
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    isSwiping.current = false
    startAutoPlay()
  }, [scroll, startAutoPlay])

  return (
    <section
      className='relative w-full bg-[#f4f8fb] py-[2.5rem] select-none'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='mx-auto xsm:h-auto xsm:mb-0 w-full mt-[4rem] xsm:mt-[4rem] h-[38rem] max-w-[104rem] px-[6.25rem] xsm:px-[0.75rem] overflow-visible'>
        <div className='w-full'>
          <SectionHeader />
        </div>

        <div className='relative mt-[0.5rem] xsm:mt-[1rem] group'>
          <DoctorSliderControls
            onPrevious={() => scroll('left')}
            onNext={() => scroll('right')}
          />

          <div
            className='slider-container mx-auto w-full xsm:mt-[3rem] max-w-[85.5rem] overflow-x-hidden overflow-y-visible touch-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div
              className='flex will-change-transform'
              style={{
                width: `${totalSlides * (stepSize || 0)}px`,
                transform: transformStyle,
                transition: isDragging ? 'none' : 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {doctorsData.map((doctor, index) => (
                <div
                  key={doctor.id}
                  ref={index === 0 ? firstSlideRef : null}
                  className='shrink-0 px-[0.75rem] py-[0.375rem] xsm:px-[1rem] xsm:pt-[8rem]'
                >
                  <div className='w-[27rem] xsm:w-[calc(100vw-3.5rem)]'>
                    <div className='h-[30rem] xsm:h-[38rem] xsm:pt-[2rem] xsm:w-[20.5rem] w-full'>
                      <DoctorCard doctor={doctor} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='block xsm:hidden mt-[1.5rem] flex justify-center'>
          <DoctorPagination
            total={maxIndex + 1}
            activeIndex={activeIndex}
          />
        </div>
        <div className='hidden xsm:flex mt-[1rem] xsm:-mt-[12rem] items-center justify-between px-0 xsm:px-[1rem]'>
          <div className='flex items-center gap-[0.5rem]'>
            <DoctorPagination
              total={maxIndex + 1}
              activeIndex={activeIndex}
            />
          </div>

          <div className='flex xsm: -mr-2 items-center gap-[0.75rem]'>
            <button
              onClick={() => scroll('left')}
              className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white transition-all hover:bg-[#1991c7] hover:text-white'
            >
              <ChevronLeft className='h-[1.25rem] w-[1.25rem]' />
            </button>
            <button
              onClick={() => scroll('right')}
              className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white transition-all hover:bg-[#1991c7] hover:text-white'
            >
              <ChevronRight className='h-[1.25rem] w-[1.25rem]' />
            </button>
          </div>
        </div>

        <div className='hidden xsm:block mt-[1.5rem]'>
          <div className='flex justify-center'>
            <Button
              variant='outline'
              className='w-full xsm:w-[10rem] max-w-[17.5rem] rounded-full border-[#1991c7] text-[#1991c7] font-bold h-[2.75rem] text-[0.875rem] shadow-sm hover:bg-[#f1c40f]/20 hover:text-yellow-500 hover:border-[#f1c40f]'
            >
              Xem tất cả <ArrowRight className='ml-[0.5rem] h-[1rem] w-[1rem]' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorSection