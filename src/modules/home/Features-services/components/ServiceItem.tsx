'use client'

import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ServiceItemType } from '@/modules/home/Features-services/types/service.type'

import { ServiceItemIcon } from './ServiceItemIcon'

interface ServiceItemProps {
  service: ServiceItemType
  isLast?: boolean
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service, isLast = false }) => {
  return (
    <Link
      href={service.href}
      className='group block w-full outline-none'
    >
      {/* ==================== DESKTOP VIEW ==================== */}
      <div
        className={`hidden lg:block rounded-2xl px-3 py-6 transition-all duration-300 ease-out hover:bg-sky-50/60 hover:shadow-md sm:px-4 sm:py-8 ${
          !isLast ? 'border-b border-slate-100' : ''
        }`}
      >
        <div className='grid grid-cols-12 items-center gap-4'>
          <div className='flex items-center gap-4 col-span-4 pl-8'>
            <div className='transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3'>
              <ServiceItemIcon iconUrl={service.iconUrl} />
            </div>
            <div className='flex flex-col'>
              {service.subtitle && (
                <span className='text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400 sm:text-xs'>
                  {service.subtitle}
                </span>
              )}
              <h3 className='text-base font-extrabold uppercase leading-snug text-[#0089cf] transition-colors duration-300 group-hover:text-[#0269a1] sm:text-lg lg:text-[1.125rem]'>
                {service.title}
              </h3>
            </div>
          </div>

          <div className='flex justify-center col-span-4'>
            <div className='relative h-44 w-full overflow-hidden rounded-2xl shadow-xs transition-shadow duration-300 group-hover:shadow-md sm:h-52 lg:h-38 lg:w-[15.5rem]'>
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes='(max-width: 1024px) 100vw, 250px'
                className='object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108'
              />
            </div>
          </div>

          <div className='flex items-center justify-between gap-15 col-span-4 pr-8'>
            <p className='text-xs leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800 sm:text-sm lg:text-[0.875rem] text-justify'>
              {service.description}
            </p>

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-transparent text-[#0089cf] transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-[#0089cf] group-hover:text-white group-hover:shadow-sm'>
              <ChevronRight className='h-6 w-6 sm:h-7 sm:w-7' />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW ==================== */}
      <div className='block lg:hidden w-full rounded-[1.5rem] bg-[#f0f9ff] p-4 border border-[#e0f2fe] shadow-xs transition-all duration-300'>
        <div className='relative h-[13rem] w-full overflow-hidden rounded-[1.25rem] bg-slate-100 shadow-xs'>
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes='100vw'
            className='object-cover object-center'
          />
        </div>

        <div className='mt-4 flex items-center gap-3'>
          <div className='shrink-0 flex items-center justify-center h-10 w-10'>
            <ServiceItemIcon iconUrl={service.iconUrl} />
          </div>

          <div className='flex flex-col justify-center'>
            <span className='text-[0.7rem] font-bold uppercase tracking-wider text-slate-400 leading-tight'>
              {service.subtitle || 'DỊCH VỤ'}
            </span>
            <h3 className='text-[0.95rem] font-extrabold uppercase leading-tight text-[#0089cf]'>
              {service.title}
            </h3>
          </div>
        </div>

        <p className='mt-3 line-clamp-2 text-[0.8125rem] leading-[1.5] text-slate-600 text-justify'>
          {service.description}
        </p>

        <div className='mt-4 flex items-center justify-end gap-1 text-[0.8125rem] font-semibold text-[#0089cf]'>
          <span>Xem chi tiết</span>
          <ArrowRight className='h-3.5 w-3.5' />
        </div>
      </div>
    </Link>
  )
}
