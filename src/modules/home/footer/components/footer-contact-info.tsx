'use client'

import React from 'react'

import { ContactInfoData } from '../types/footer-type'

interface FooterContactInfoProps {
  data: ContactInfoData
  isMobile?: boolean
}

export const FooterContactInfo: React.FC<FooterContactInfoProps> = ({ data, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className='flex flex-col items-center justify-center gap-[0.75rem] text-center text-slate-700'>
        <div className='text-[1.5rem] font-bold text-[#0089cf] tracking-tight'>
          Hotline:{' '}
          <a
            href={`tel:${data.hotline.replace(/\s+/g, '')}`}
            className='font-extrabold'
          >
            {data.hotline}
          </a>
        </div>

        <div className='text-[0.875rem] leading-relaxed max-w-[20rem]'>
          <span className='font-bold text-[#0089cf]'>Trụ sở: </span>
          <span className='font-medium text-slate-700'>{data.address}</span>
        </div>

        <div className='text-[0.875rem]'>
          <span className='font-bold text-[#0089cf]'>Email: </span>
          <a
            href={`mailto:${data.email}`}
            className='font-medium text-slate-700'
          >
            {data.email}
          </a>
        </div>

        <div className='text-[0.875rem]'>
          <span className='font-bold text-[#0089cf]'>Giờ mở cửa: </span>
          <span className='font-medium text-slate-700'>{data.workingHours}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[0.625rem] text-[0.875rem] text-slate-700'>
      <div className='flex items-center gap-[0.5rem]'>
        <span className='text-[1.5rem] font-medium text-[#0089cf]'>Hotline:</span>
        <a
          href={`tel:${data.hotline.replace(/\s+/g, '')}`}
          className='text-[1.5rem] font-extrabold text-[#0089cf] transition-colors hover:text-[#006ca3]'
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
