'use client'

import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent } from '@/components/UI/card'

import { NewsItemType } from '../types/news.type'

import { DateBadge } from './DateBadge'

interface NewsCardProps {
  news: NewsItemType
  isSmallMobile?: boolean
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, isSmallMobile = false }) => {
  //   Layout bài viết nhỏ dạng hàng ngang trên Mobile
  if (isSmallMobile) {
    return (
      <Link
        href={news.href}
        className='group block w-full outline-none'
      >
        <div className='flex items-center gap-3.5 py-1.5'>
          <div className='relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-xs'>
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              sizes='128px'
              className='object-cover object-center'
            />
          </div>

          <div className='flex flex-1 flex-col justify-center'>
            <h4 className='line-clamp-2 text-[0.9375rem] font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#0089cf]'>
              {news.title}
            </h4>

            <div className='mt-2 flex items-center gap-2 text-xs font-semibold text-[#0089cf]'>
              <span className='uppercase'>{news.category || 'TIN TỨC'}</span>
              <span className='text-slate-300'>•</span>
              <div className='flex items-center gap-1 text-slate-400'>
                <Calendar className='h-3.5 w-3.5 stroke-[2]' />
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

  // Layout Card mặc định (Desktop và Card lớn Mobile)
  return (
    <Link
      href={news.href}
      className='group block h-full outline-none'
    >
      <Card className='relative h-full overflow-hidden rounded-2xl border-none bg-white shadow-xs transition-all duration-300 hover:shadow-md'>
        <CardContent className='p-0'>
          <div className='relative h-48 w-full overflow-hidden bg-slate-100 sm:h-52 lg:h-[13.5rem]'>
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105'
            />
          </div>

          <div className='flex items-stretch bg-white'>
            <div className='shrink-0'>
              <DateBadge
                day={news.day}
                monthYear={news.monthYear}
              />
            </div>

            <div className='flex flex-1 flex-col justify-center py-3 pl-3.5 pr-3'>
              <span className='text-xs whitespace-nowrap shrink-0 font-semibold text-[#0089cf]'>
                {news.category}
              </span>
              <h3 className='mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#0089cf] sm:text-base'>
                {news.title}
              </h3>

              <p className='mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500'>
                {news.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
