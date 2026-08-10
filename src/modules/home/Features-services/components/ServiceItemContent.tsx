'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ServiceItemContentProps {
  title: string
  description: string
  imageUrl: string
}

export const ServiceItemContent: React.FC<ServiceItemContentProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className='flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:gap-8'>
      <div className='relative h-44 w-full shrink-0 overflow-hidden rounded-2xl shadow-xs xsm:h-52 sm:h-60 lg:h-39 lg:w-[15.625rem]'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 1024px) 100vw, 250px'
          className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='flex flex-1 items-center justify-between gap-4'>
        <p className='text-[0.8125rem] leading-relaxed text-[#475569] xsm:text-sm sm:text-[0.9375rem]'>
          {description}
        </p>

        <div className='flex shrink-0 items-center justify-center p-1 text-[#0284c7] transition-transform duration-300 group-hover:translate-x-1'>
          <ChevronRight className='h-6 w-6 xsm:h-7 xsm:w-7 sm:h-8 sm:w-8' />
        </div>
      </div>
    </div>
  )
}
