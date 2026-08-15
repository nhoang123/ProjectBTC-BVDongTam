'use client'

import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import '../css/hero-slider.css'

import { heroSlides } from '../../data/hero-mock'

import { DecorativeElements } from './decorative-elements'
import { HeroControls } from './hero-controls'
import { HeroSlide } from './hero-slide'

export function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null)

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

  return (
    <section
      aria-label='Banner trang chủ'
      className='relative w-full select-none'
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, Navigation]}
        loop={true}
        speed={600}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
        navigation={{
          prevEl: '.hero-prev-btn',
          nextEl: '.hero-next-btn',
        }}
        className='relative w-full'
        style={{ height: '35rem' }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className='relative w-full h-full'>
                <HeroSlide
                  slide={slide}
                  active={isActive}
                />

                <DecorativeElements />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <HeroControls onPrev={handlePrev} onNext={handleNext} />
    </section>
  )
}