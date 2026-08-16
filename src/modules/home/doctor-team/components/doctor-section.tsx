'use client'

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './css/doctor-swiper.css'

import { Button } from '@/components/UI/button'

import { doctorsData } from '../data/mock-doctors'

import DoctorCard from './doctor-card'
import { DoctorPagination } from './doctor-pagination'
import { SectionHeader } from './section-header'

const DoctorSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const totalSlides = doctorsData.length
  const slidesPerView = isDesktop ? 3 : 1
  // Swiper trượt từng slide một (slidesPerGroup mặc định = 1), nên số vị trí
  // dừng thực tế là totalSlides - slidesPerView + 1, KHÔNG PHẢI ceil(totalSlides / slidesPerView)
  const totalPages = Math.max(totalSlides - slidesPerView + 1, 1)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateLayout = () => {
      const isDesktopNow = mediaQuery.matches
      setIsDesktop(isDesktopNow)
    }
    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const goToPage = (pageIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(pageIndex)
    }
  }

  const currentPage = activeIndex

  return (
    <section className='relative w-full bg-[#f4f8fb] py-[2.5rem] select-none'>
      <div className='mx-auto xsm:h-auto xsm:mb-0 w-full mt-[4rem] xsm:mt-[4rem] max-w-[104rem] px-[6.25rem] xsm:px-[0.75rem] overflow-visible'>
        <div className='w-full'>
          <SectionHeader />
        </div>

        <div className='relative mt-[5rem] xsm:mt-[1rem] group'>
          {/* Desktop Navigation */}
          <div className='pointer-events-none absolute z-30 block xsm:hidden w-full mt-[12rem]'>
            <button
              onClick={handlePrev}
              className='pointer-events-auto absolute left-[-4rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#38a8db] transition-all duration-200 hover:bg-[#38a8db] hover:text-white hover:scale-105'
              aria-label='Previous slide'
            >
              <ChevronLeft className='w-[1.5rem] h-[1.5rem]' />
            </button>
            <button
              onClick={handleNext}
              className='pointer-events-auto absolute right-[-4rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#38a8db] transition-all duration-200 hover:bg-[#38a8db] hover:text-white hover:scale-105'
              aria-label='Next slide'
            >
              <ChevronRight className='w-[1.5rem] h-[1.5rem]' />
            </button>
          </div>

          <div className='slider-container mx-auto w-full xsm:mt-[3rem] max-w-[85.5rem] overflow-x-hidden overflow-y-visible'>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                setActiveIndex(swiper.realIndex)
              }}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={0}
              loop={false}
              speed={750}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSlideChange={(swiper) => {
                const newIndex = swiper.realIndex
                setActiveIndex(newIndex)
              }}
              className='doctor-swiper'
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
              }}
            >
              {doctorsData.map((doctor) => (
                <SwiperSlide key={doctor.id}>
                  <div className='shrink-0 px-[0.75rem] py-[0.375rem] xsm:px-[1rem] xsm:pt-[8rem]'>
                    <div className='w-[27rem] xsm:w-[calc(100vw-3.5rem)]'>
                      <div className='h-[30rem] xsm:h-auto xsm:pt-[2rem] xsm:w-[20.5rem] w-full'>
                        <DoctorCard doctor={doctor} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className='flex xsm:hidden justify-center'>
          <div className='mt-[1rem]'>
            <DoctorPagination
              key={`desktop-${currentPage}`}
              total={totalPages}
              activeIndex={currentPage}
              onClick={goToPage}
            />
          </div>
        </div>

        <div className='hidden xsm:flex -mt-[4rem] items-center justify-between px-0 xsm:px-[1rem]'>
          <div className='flex items-center gap-[0.5rem]'>
            <DoctorPagination
              key={`mobile-${currentPage}`}
              total={totalPages}
              activeIndex={currentPage}
              onClick={goToPage}
            />
          </div>

          <div className='flex items-center gap-[0.75rem]'>
            <button
              onClick={handlePrev}
              className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white transition-all hover:bg-[#1991c7] hover:text-white'
              aria-label='Previous slide'
            >
              <ChevronLeft className='h-[1.25rem] w-[1.25rem]' />
            </button>
            <button
              onClick={handleNext}
              className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-[#1991c7] bg-white text-[#1991c7] shadow-sm active:bg-[#1991c7] active:text-white transition-all hover:bg-[#1991c7] hover:text-white'
              aria-label='Next slide'
            >
              <ChevronRight className='h-[1.25rem] w-[1.25rem]' />
            </button>
          </div>
        </div>

        <div className='hidden xsm:block mt-[1rem]'>
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