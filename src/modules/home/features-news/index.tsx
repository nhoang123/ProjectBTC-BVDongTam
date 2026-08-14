'use client'

import { motion, useMotionValue, animate as animateMotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useSyncExternalStore, useState, useRef, useEffect } from 'react'

import { Button } from '@/components/UI/button'
import { NewsCard } from '@/modules/home/features-news/components/news-card'
import { NewsHeader } from '@/modules/home/features-news/components/news-header'
import { NewsSliderControls } from '@/modules/home/features-news/components/news-slider-controls'
import { NewsSliderPagination } from '@/modules/home/features-news/components/news-slider-pagination'
import { mockNewsData } from '@/modules/home/features-news/data/news-mock'

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
  const [isDragging, setIsDragging] = useState(false)
  const [trackWidth, setTrackWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const itemsPerPage = useSyncExternalStore(subscribe, getItemsPerPage, () => 3)
  const totalSlides = mockNewsData.length

  const maxIndex = Math.max(0, totalSlides - itemsPerPage)
  const safeIndex = Math.min(currentIndex, maxIndex)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTrackWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const singleItemPx = trackWidth > 0 ? trackWidth / itemsPerPage : 0
  useEffect(() => {
    const controls = animateMotionValue(x, -safeIndex * singleItemPx, {
      type: 'spring',
      stiffness: 240,
      damping: 25,
      mass: 0.5,
    })
    return () => controls.stop()
  }, [safeIndex, singleItemPx, x])

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  const handleSelectPage = (index: number) => setCurrentIndex(Math.min(index, maxIndex))

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    setTimeout(() => setIsDragging(false), 50)

    const threshold = 40
    const velocityThreshold = 200

    let newIndex = safeIndex

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      newIndex = Math.min(maxIndex, safeIndex + 1)
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      newIndex = Math.max(0, safeIndex - 1)
    }
    setCurrentIndex(newIndex)
  }

  const featuredNews = mockNewsData[0]
  const listNews = mockNewsData.slice(1)

  return (
    <section className='relative w-full overflow-hidden bg-white py-[5rem] xsm:py-[2rem]'>
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

      <div className='container relative z-10 mx-auto w-full max-w-[95rem] px-[4.5rem] xsm:px-[1rem]'>
        <NewsHeader />

        {/* ===== DESKTOP SLIDER ===== */}
        <div className='block xsm:hidden relative mt-[2rem]'>
          <NewsSliderControls
            onPrev={handlePrev}
            onNext={handleNext}
            canPrev={safeIndex > 0}
            canNext={safeIndex < maxIndex}
          />

          <div
            ref={containerRef}
            className='relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none'
          >
            <motion.div
              className='flex touch-none'
              style={{ x }}
              drag='x'
              dragConstraints={{
                left: -(totalSlides - itemsPerPage) * singleItemPx,
                right: 0,
              }}
              dragElastic={0.15}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {mockNewsData.map((news) => (
                <div
                  key={news.id}
                  className='shrink-0 px-[0.875rem] select-none'
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className='relative z-10 w-full drop-shadow-sm'>
                    <NewsCard
                      news={news}
                      isDragging={isDragging}
                    />
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

        {/* ===== MOBILE LAYOUT (LIST) ===== */}
        <div className='hidden xsm:block mt-[1.5rem] space-y-[1rem]'>
          {featuredNews && (
            <div className='w-full'>
              <NewsCard news={featuredNews} />
            </div>
          )}

          <div className='mt-[1rem] flex flex-col gap-[0.75rem] pt-[0.5rem]'>
            {listNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                isSmallMobile={true}
              />
            ))}
          </div>


          <div className='pt-[1.5rem] flex justify-center'>
            <Button
              asChild
              variant='outline'
              className='h-[2.75rem] rounded-full border border-[#0089cf] bg-white px-[2rem] text-[0.875rem] font-bold text-[#0089cf] transition-all'
            >
              <Link
                href='/tin-tuc'
                className='flex items-center gap-[0.5rem]'
              >
                <span>Xem tất cả</span>
                <ArrowRight className='h-[1rem] w-[1rem]' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
