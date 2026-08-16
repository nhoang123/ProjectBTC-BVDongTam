'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './components/css/news-slider.css'

import { Button } from '@/components/UI/button'
import { NewsCard } from '@/modules/home/features-news/components/news-card'
import { NewsHeader } from '@/modules/home/features-news/components/news-header'
import { mockNewsData } from '@/modules/home/features-news/data/news-mock'

export const FeaturedNewsSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => swiperRef.current?.slidePrev()
  const handleNext = () => swiperRef.current?.slideNext()

  const _handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const featuredNews = mockNewsData[0]
  const listNews = mockNewsData.slice(1)
  const slidesPerView = 3
  const totalPages = Math.max(mockNewsData.length - slidesPerView + 1, 1)

  return (
    <section className='relative w-full overflow-hidden bg-white py-20 xsm:py-8'>
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-0 w-full'>
        <svg
          className='h-full w-full'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M-50,220 C350,160 1050,300 1490,200 L1490,320 L-50,320 Z'
            fill='#e0f2fe'
            fillOpacity='0.6'
          />
        </svg>
      </div>

      <div className='container relative z-10 mx-auto w-full max-w-380 px-18 xsm:px-4'>
        <NewsHeader />

        {/* ===== DESKTOP SLIDER ===== */}
        <div className='relative mt-8 block xsm:hidden'>
          <button
            onClick={handlePrev}
            aria-label='Previous Slide'
            className='news-prev-btn'
          >
            <ChevronLeft className='h-6 w-6 stroke-[2.5]' />
          </button>

          <button
            onClick={handleNext}
            aria-label='Next Slide'
            className='news-next-btn'
          >
            <ChevronRight className='h-6 w-6 stroke-[2.5]' />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation, Pagination]}
            loop={false}
            speed={600}
            spaceBetween={0}
            slidesPerView={3}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className='relative w-full overflow-hidden pb-8'
            onSlideChange={_handleSlideChange}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 0 },
              1024: { slidesPerView: 3, spaceBetween: 0 },
            }}
          >
            {mockNewsData.map((news) => (
              <SwiperSlide key={news.id}>
                <div className='select-none px-3.5'>
                  <div className='relative z-10 w-full drop-shadow-sm'>
                    <NewsCard news={news} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='-mt-[10rem] flex items-center justify-center gap-2'>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isActive = activeIndex === idx
              return (
                <button
                  key={idx}
                  onClick={() => swiperRef.current?.slideTo(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive ? 'w-12 bg-[#0089cf]' : 'w-5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              )
            })}
          </div>
        </div>

        {/* ===== MOBILE LAYOUT (LIST) ===== */}
        <div className='hidden xsm:block mt-6 space-y-4'>
          {featuredNews && (
            <div className='w-full'>
              <NewsCard news={featuredNews} />
            </div>
          )}

          <div className='mt-4 flex flex-col gap-3 pt-2'>
            {listNews.map((news) => (
              <NewsCard key={news.id} news={news} isSmallMobile={true} />
            ))}
          </div>

          <div className='flex justify-center pt-6'>
            <Button
              asChild
              variant='outline'
              className='h-11 rounded-full border border-[#0089cf] bg-white px-8 text-[0.875rem] font-bold text-[#0089cf] transition-all'
            >
              <Link href='/tin-tuc' className='flex items-center gap-2'>
                <span>Xem tất cả</span>
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}