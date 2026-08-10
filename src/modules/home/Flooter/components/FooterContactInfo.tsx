'use client'

import React from 'react'

import { ContactInfoData } from '../types/footer.type'

interface FooterContactInfoProps {
  data: ContactInfoData
  isMobile?: boolean
}

export const FooterContactInfo: React.FC<FooterContactInfoProps> = ({ data, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className='flex flex-col items-center justify-center gap-3 text-center text-slate-700'>
        <div className='text-2xl font-bold text-[#0089cf] tracking-tight'>
          Hotline:{' '}
          <a
            href={`tel:${data.hotline.replace(/\s+/g, '')}`}
            className='font-extrabold'
          >
            {data.hotline}
          </a>
        </div>

        <div className='text-sm leading-relaxed max-w-xs'>
          <span className='font-bold text-[#0089cf]'>Trụ sở: </span>
          <span className='font-medium text-slate-700'>{data.address}</span>
        </div>

        <div className='text-sm'>
          <span className='font-bold text-[#0089cf]'>Email: </span>
          <a
            href={`mailto:${data.email}`}
            className='font-medium text-slate-700'
          >
            {data.email}
          </a>
        </div>

        <div className='text-sm'>
          <span className='font-bold text-[#0089cf]'>Giờ mở cửa: </span>
          <span className='font-medium text-slate-700'>{data.workingHours}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700'>
      <div className='flex items-center gap-2'>
        <span className='text-xl font-medium text-[#0089cf] sm:text-2xl'>Hotline:</span>
        <a
          href={`tel:${data.hotline.replace(/\s+/g, '')}`}
          className='text-xl font-extrabold text-[#0089cf] transition-colors hover:text-[#006ca3] sm:text-2xl'
        >
          {data.hotline}
        </a>
      </div>
      <div>
        <span className='font-medium text-[#0089cf]'>Trụ sở: </span>
        <span className='font-medium text-[0.8rem]'>{data.address}</span>
      </div>
      <div>
        <span className='font-medium text-[#0089cf]'>Email: </span>
        <a
          href={`mailto:${data.email}`}
          className='font-medium text-[0.8rem]'
        >
          {data.email}
        </a>
      </div>
      <div>
        <span className='font-medium text-[#0089cf]'>Giờ mở cửa: </span>
        <span className='font-medium text-[0.8rem]'>{data.workingHours}</span>
      </div>
    </div>
  )
}
