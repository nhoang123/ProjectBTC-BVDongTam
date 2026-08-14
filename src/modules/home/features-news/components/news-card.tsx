'use client'

import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent } from '@/components/UI/card'
import { NewsItemType } from '@/modules/home/features-news/types/news-type'

import { DateBadge } from '../../features-news/components/date-badge'

interface NewsCardProps {
  news: NewsItemType
  isSmallMobile?: boolean
  isDragging?: boolean
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  isSmallMobile = false,
  isDragging = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
    }
  }

  if (isSmallMobile) {
    return (
      <Link
        href={news.href}
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className='group block w-full outline-none select-none'
      >
        <div className='flex items-center gap-[0.875rem] py-[0.375rem]'>
          <div className='relative h-[5rem] w-[8rem] shrink-0 overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-xs pointer-events-none'>
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              sizes='128px'
              draggable={false}
              className='object-cover object-center select-none'
            />
          </div>

          <div className='flex flex-1 flex-col justify-center'>
            <h4 className='line-clamp-2 text-[0.9375rem] font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#0089cf]'>
              {news.title}
            </h4>

            <div className='mt-[0.5rem] flex items-center gap-[0.5rem] text-[0.75rem] font-semibold text-[#0089cf]'>
              <span className='uppercase'>{news.category || 'TIN TỨC'}</span>
              <span className='text-slate-300'>•</span>
              <div className='flex items-center gap-[0.25rem] text-slate-400'>
                <Calendar className='h-[0.875rem] w-[0.875rem] stroke-[2]' />
                <span className='text-[0.75rem]'>
                  {news.day}/{news.monthYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Layout Card mặc định (Desktop)
  return (
    <Link
      href={news.href}
      onClick={handleClick}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className='group block h-full outline-none select-none'
    >
      <Card className='relative h-full overflow-hidden rounded-[1.5rem] border-none bg-white shadow-xs transition-all duration-300 hover:shadow-md'>
        <CardContent className='p-0'>
          <div className='relative h-[13.5rem] w-full overflow-hidden bg-slate-100 xsm:h-[12rem] pointer-events-none'>
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              draggable={false}
              className='object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 select-none'
            />
          </div>

          <div className='flex items-stretch bg-white'>
            <div className='shrink-0'>
              <DateBadge
                day={news.day}
                monthYear={news.monthYear}
              />
            </div>

            <div className='flex flex-1 flex-col justify-center py-[0.75rem] pl-[0.875rem] pr-[0.75rem]'>
              <span className='text-[0.75rem] whitespace-nowrap shrink-0 font-semibold text-[#0089cf]'>
                {news.category}
              </span>
              <h3 className='mt-[0.25rem] line-clamp-2 text-[1rem] font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#0089cf] xsm:text-[0.875rem]'>
                {news.title}
              </h3>

              <p className='mt-[0.375rem] line-clamp-2 text-[0.75rem] leading-relaxed text-slate-500'>
                {news.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
