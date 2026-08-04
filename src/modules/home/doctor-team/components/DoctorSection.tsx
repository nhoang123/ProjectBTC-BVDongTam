'use client'

import React, { useState, useEffect, useCallback } from 'react'

import { doctorsData } from '../data/mockDoctors'

import DoctorCard from './DoctorCard'
import { DoctorPagination } from './DoctorPagination'
import { DoctorSliderControls } from './DoctorSliderControls'
import { SectionHeader } from './SectionHeader'

const DoctorSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const totalSlides = doctorsData.length
  const visibleSlides = isDesktop ? 3 : 1
  const maxIndex = Math.max(totalSlides - visibleSlides, 0)
  const activeIndex = Math.min(currentIndex, maxIndex)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateLayout = () => setIsDesktop(mediaQuery.matches)
    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const scroll = (direction: 'left' | 'right') => {
    const baseIndex = Math.min(currentIndex, maxIndex)
    const newIndex = direction === 'left'
      ? Math.max(baseIndex - 1, 0)
      : Math.min(baseIndex + 1, maxIndex)
    setDirection(direction === 'left' ? -1 : 1)
    goToSlide(newIndex)
  }

  useEffect(() => {
    if (isHovering || maxIndex === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        const baseIndex = Math.max(0, Math.min(previousIndex, maxIndex))
        let nextIndex = baseIndex + direction
        if (nextIndex >= maxIndex) {
          setDirection(-1)
          nextIndex = maxIndex > 0 ? maxIndex - 1 : 0
        }
        if (nextIndex <= 0) {
          setDirection(1)
          nextIndex = maxIndex > 0 ? 1 : 0
        }
        return nextIndex
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex, direction, goToSlide, isHovering, maxIndex])

  return (
    <section
      className="w-full bg-linear-to-b from-white to-blue-50/30 py-12 md:py-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-6 lg:px-12">
        <div className="w-full">
          <SectionHeader />
        </div>

        <div className="relative mt-6 group">
          <DoctorSliderControls onPrevious={() => scroll('left')} onNext={() => scroll('right')} />

          <div className="w-full overflow-hidden pb-3">
            <div
              className="flex will-change-transform"
              style={{
                width: `${(totalSlides / visibleSlides) * 100}%`,
                transform: `translate3d(-${(activeIndex * 100) / totalSlides}%, 0, 0)`,
                transition: 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {doctorsData.map((doctor) => (
                <div
                  key={doctor.id}
                  className="shrink-0 px-2 lg:px-3"
                  style={{ flex: `0 0 ${100 / totalSlides}%` }}
                >
                  <div className="h-full min-h-96 sm:min-h-100">
                    <DoctorCard doctor={doctor} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <DoctorPagination total={totalSlides} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  )
}

export default DoctorSection