'use client'

import { ArrowRight, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ServiceItemIcon } from '@/modules/home/features-services/components/service-item-icon'
import { ServiceItemType } from '@/modules/home/features-services/types/service-type'

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
        className={`block xsm:hidden rounded-[1.5rem] px-[1rem] py-[2rem] transition-all duration-300 ease-out hover:bg-sky-50/60 hover:shadow-md ${
          !isLast ? 'border-b border-slate-100' : ''
        }`}
      >
        <div className='grid grid-cols-12 items-center gap-[2rem]'>
          {/* Cột bên trái - Tên dịch vụ */}
          <div className='flex items-center gap-[1.5rem] col-span-4 pl-[2rem]'>
            <div className='transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3'>
              <ServiceItemIcon iconUrl={service.iconUrl} />
            </div>
            <div className='flex flex-col'>
              {service.subtitle && (
                <span className='text-[0.75rem] font-bold uppercase tracking-wider text-slate-400'>
                  {service.subtitle}
                </span>
              )}
              <h3 className='text-[1.125rem] font-extrabold uppercase leading-snug text-[#0089cf] transition-colors duration-300 group-hover:text-[#0269a1]'>
                {service.title}
              </h3>
            </div>
          </div>

          {/* Cột giữa - Hình ảnh */}
          <div className='flex justify-center col-span-4'>
            <div className='relative h-[13rem] w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] shadow-xs transition-shadow duration-300 group-hover:shadow-md'>
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes='(max-width: 1024px) 100vw, 250px'
                className='object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108'
              />
            </div>
          </div>

          {/* Cột bên phải - Mô tả và nút */}
          <div className='flex items-center justify-between gap-[2rem] col-span-4 pr-[2rem]'>
            <p className='text-[0.875rem] leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800 text-justify'>
              {service.description}
            </p>

            <div className='flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-transparent text-[#0089cf] transition-all duration-300 group-hover:translate-x-[0.375rem] group-hover:bg-[#0089cf] group-hover:text-white group-hover:shadow-sm'>
              <ChevronRight className='h-[1.75rem] w-[1.75rem]' />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW ==================== */}
      <div className='hidden xsm:block w-full rounded-[1.5rem] bg-[#f0f9ff] p-[1rem] border border-[#e0f2fe] shadow-xs transition-all duration-300'>
        <div className='relative h-[13rem] w-full overflow-hidden rounded-[1.25rem] bg-slate-100 shadow-xs'>
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            sizes='100vw'
            className='object-cover object-center'
          />
        </div>

        <div className='mt-[1rem] flex items-center gap-[0.75rem]'>
          <div className='shrink-0 flex items-center justify-center h-[2.5rem] w-[2.5rem]'>
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

        <p className='mt-[0.75rem] line-clamp-2 text-[0.8125rem] leading-[1.5] text-slate-600 text-justify'>
          {service.description}
        </p>

        <div className='mt-[1rem] flex items-center justify-end gap-[0.25rem] text-[0.8125rem] font-semibold text-[#0089cf]'>
          <span>Xem chi tiết</span>
          <ArrowRight className='h-[0.875rem] w-[0.875rem]' />
        </div>
      </div>
    </Link>
  )
}
