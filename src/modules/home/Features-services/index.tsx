'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { mockServicesData } from '@/modules/home/Features-services/data/mockServices'
import { ServiceItemType } from '@/modules/home/Features-services/types/service.type'

import { ServiceFooter } from './components/ServiceFooter'
import { ServiceHeaderBanner } from './components/ServiceHeaderBanner'
import { ServiceItem } from './components/ServiceItem'

export const FeaturedServicesSection: React.FC = () => {
  const [services] = useState<ServiceItemType[]>(mockServicesData)
  const [activeMobileIndex, setActiveMobileIndex] = useState(0)

  // State quản lý Drag & Swipe cho Mobile
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHoveringMobile, setIsHoveringMobile] = useState(false)

  const startX = useRef(0)
  const currentX = useRef(0)
  const isSwiping = useRef(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const totalServices = services.length

  const handlePrevMobile = useCallback(() => {
    setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : totalServices - 1))
  }, [totalServices])

  const handleNextMobile = useCallback(() => {
    setActiveMobileIndex((prev) => (prev < totalServices - 1 ? prev + 1 : 0))
  }, [totalServices])

  // Dừng Auto-play Mobile
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  // Khởi chạy Auto-play Mobile
  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    if (totalServices > 1 && !isHoveringMobile && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        handleNextMobile()
      }, 5000)
    }
  }, [totalServices, isHoveringMobile, isDragging, handleNextMobile, stopAutoPlay])

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
      if (diff > 0) {
        handlePrevMobile()
      } else {
        handleNextMobile()
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    isSwiping.current = false
    startAutoPlay()
  }, [handlePrevMobile, handleNextMobile, startAutoPlay])

  const baseTranslatePercent = (activeMobileIndex * 100) / totalServices
  const transformStyle = `calc(-${baseTranslatePercent}% + ${dragOffset}px)`

  return (
    <section className='w-full bg-white py-[2rem] lg:py-[5rem]'>
      <div className='mx-auto w-full max-w-[93rem] px-[1rem] sm:px-[2rem] lg:px-[2.5rem]'>
        <ServiceHeaderBanner />

        {/* ==================== DESKTOP LIST ==================== */}
        <div className='hidden lg:flex mt-[2.5rem] flex-col'>
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              isLast={index === services.length - 1}
            />
          ))}
        </div>

        {/* ==================== MOBILE SLIDER ==================== */}
        <div
          className='block lg:hidden mt-4 select-none'
          onMouseEnter={() => setIsHoveringMobile(true)}
          onMouseLeave={() => setIsHoveringMobile(false)}
        >
          <div
            className='w-full overflow-hidden touch-none py-1'
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
                width: `${totalServices * 100}%`,
                transform: `translate3d(${transformStyle}, 0, 0)`,
                transition: isDragging
                  ? 'none'
                  : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className='shrink-0 px-1'
                  style={{ flex: `0 0 ${100 / totalServices}%` }}
                >
                  <ServiceItem
                    service={service}
                    isLast={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Điều hướng & Phân trang Mobile */}
          <div className='mt-5 flex items-center justify-between px-1'>
            <div className='flex items-center gap-1.5'>
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx ? 'w-8 bg-[#0089cf]' : 'w-3.5 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={handlePrevMobile}
                className='flex h-9 w-9 items-center justify-center rounded-full border border-[#0089cf] text-[#0089cf] transition-colors active:bg-[#0089cf] active:text-white'
                aria-label='Previous service'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                onClick={handleNextMobile}
                className='flex h-9 w-9 items-center justify-center rounded-full border border-[#0089cf] text-[#0089cf] transition-colors active:bg-[#0089cf] active:text-white'
                aria-label='Next service'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='mt-6 flex justify-center'>
            <ServiceFooter />
          </div>
        </div>

        <div className='hidden lg:block'>
          <ServiceFooter />
        </div>
      </div>
    </section>
  )
}

export default FeaturedServicesSection