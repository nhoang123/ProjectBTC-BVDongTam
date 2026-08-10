'use client'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import { Button } from '@/components/UI/button'

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

  const scroll = (scrollDirection: 'left' | 'right') => {
    if (scrollDirection === 'left') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
      setDirection(-1)
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
      setDirection(1)
    }
  }

  useEffect(() => {
    if (maxIndex <= 0 || isHovering) return

    const interval = setInterval(() => {
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

    return () => clearInterval(interval)
  }, [maxIndex, direction, isHovering])

  return (
    <section
      className='relative w-full bg-[#f4f8fb] pt-2 xsm:pt-3 sm:pt-4 pb-8 xsm:pb-10 sm:pb-12 md:pb-16 overflow-hidden'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='mx-auto w-full max-w-[109.375rem] px-3 xsm:px-1 sm:px-6 lg:px-25'>
        <div className='w-full'>
          <SectionHeader />
        </div>

        <div className='relative mt-4 xsm:mt-4 group'>
          <DoctorSliderControls
            onPrevious={() => scroll('left')}
            onNext={() => scroll('right')}
          />

          <div className='w-full overflow-x-hidden overflow-y-visible pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            <div
              className='flex will-change-transform'
              style={{
                width: `${(totalSlides / visibleSlides) * 100}%`,
                transform: `translate3d(-${(activeIndex * 100) / totalSlides}%, 0, 0)`,
                transition: 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {doctorsData.map((doctor) => (
                <div
                  key={doctor.id}
                  className='shrink-0 -mt-10 px-2 xsm:px-3 sm:px-4 lg:px-3'
                  style={{ flex: `0 0 ${100 / totalSlides}%` }}
                >
                  <div className='h-full min-h-80 xsm:min-h-96 sm:min-h-96'>
                    <DoctorCard doctor={doctor} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hàng Phân trang & Điều hướng Mobile*/}
        <div className='mt-6 xsm:mt-7 flex items-center justify-between lg:justify-center'>
          <DoctorPagination
            total={maxIndex + 1}
            activeIndex={activeIndex}
          />

          <div className='flex items-center gap-2 lg:hidden'>
            <button
              onClick={() => scroll('left')}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <button
              onClick={() => scroll('right')}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>

        <div className='mt-4 xsm:mt-5 flex justify-center lg:hidden'>
          <Button
            variant='outline'
            className='w-full max-w-[280px] rounded-full border-[#1991c7] text-[#1991c7] font-bold h-11 text-sm shadow-sm'
          >
            Xem tất cả <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default DoctorSection
