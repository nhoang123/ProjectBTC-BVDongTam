'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useSyncExternalStore, useState } from 'react'

import { Button } from '@/components/UI/button'

import { NewsCard } from './components/NewsCard'
import { NewsHeader } from './components/NewsHeader'
import { NewsSliderControls } from './components/NewsSliderControls'
import { NewsSliderPagination } from './components/NewsSliderPagination'
import { mockNewsData } from './data/news.mock'

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}

export const FeaturedNewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerPage = useSyncExternalStore(subscribe, getItemsPerPage, () => 3)
  const totalSlides = mockNewsData.length
  const maxIndex = Math.max(0, totalSlides - itemsPerPage)
  const safeIndex = Math.min(currentIndex, maxIndex)

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  const handleSelectPage = (index: number) => setCurrentIndex(Math.min(index, maxIndex))

  const featuredNews = mockNewsData[0]
  const listNews = mockNewsData.slice(1)

  return (
    <section className='relative w-full overflow-hidden bg-white py-8 lg:py-20'>
      {/* Background SVG Wave (Chỉ hiện trên Desktop) */}
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-0 hidden h-[26rem] w-full lg:block'>
        <svg
          className='h-full w-full'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M-50,180 C350,120 1050,280 1490,160 L1490,260 C1050,380 350,220 -50,280 Z'
            fill='#e0f2fe'
            fillOpacity='0.6'
          />
        </svg>
      </div>

      <div className='container relative z-10 mx-auto w-full max-w-[95rem] px-4 lg:px-[4.5rem]'>
        {/* Header Component */}
        <NewsHeader />

        {/* ==================== DESKTOP LAYOUT (Giữ nguyên) ==================== */}
        <div className='relative mt-8 hidden lg:block'>
          <NewsSliderControls
            onPrev={handlePrev}
            onNext={handleNext}
            canPrev={safeIndex > 0}
            canNext={safeIndex < maxIndex}
          />

          <div className='relative w-full overflow-hidden'>
            <motion.div
              className='flex'
              animate={{
                x: `-${safeIndex * (100 / itemsPerPage)}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
                mass: 0.6,
              }}
            >
              {mockNewsData.map((news) => (
                <div
                  key={news.id}
                  className='shrink-0 px-3.5'
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className='relative z-10 w-full drop-shadow-sm'>
                    <NewsCard news={news} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <NewsSliderPagination
            totalDots={totalSlides}
            itemsPerPage={itemsPerPage}
            activeIndex={safeIndex}
            onSelect={handleSelectPage}
          />
        </div>

        {/* ==================== MOBILE LAYOUT (Theo chuẩn Hình 1) ==================== */}
        <div className='block lg:hidden mt-6 space-y-4'>
          {/* 1. Bài viết lớn đầu tiên */}
          {featuredNews && (
            <div className='w-full'>
              <NewsCard news={featuredNews} />
            </div>
          )}

          {/* 2. Danh sách bài viết nhỏ phía dưới */}
          <div className='mt-4 flex flex-col gap-3 pt-2'>
            {listNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                isSmallMobile={true}
              />
            ))}
          </div>

          {/* 3. Nút Xem tất cả hiển thị ở vị trí cuối cùng */}
          <div className='pt-6 flex justify-center'>
            <Button
              asChild
              variant='outline'
              className='h-11 rounded-full border border-[#0089cf] bg-white px-8 text-sm font-bold text-[#0089cf] transition-all'
            >
              <Link
                href='/tin-tuc'
                className='flex items-center gap-2'
              >
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
