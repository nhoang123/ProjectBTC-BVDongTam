'use client'

import Image from 'next/image'
import React from 'react'

interface ServiceHeaderBannerProps {
  bgPatternUrl?: string
  doctorImageUrl?: string
  heartHandsUrl?: string
  familyImageUrl?: string
}

export const ServiceHeaderBanner: React.FC<ServiceHeaderBannerProps> = ({
  bgPatternUrl = '/images/services/bg-pattern.png',
  doctorImageUrl = '/images/services/doctor-baby.png',
  heartHandsUrl = '/images/services/heart-hands.png',
  familyImageUrl = '/images/services/family-baby.png',
}) => {
  return (
    <>
      {/* ==================== DESKTOP VIEW ==================== */}
      <div className='block xsm:hidden relative my-[1rem] w-full px-[0.5rem] py-[1.5rem]'>
        <div className='relative mx-auto flex h-[6rem] w-full items-center justify-between rounded-[1.5rem] bg-[#0089cf] shadow-md'>
          <div className='absolute inset-0 overflow-hidden rounded-[1.5rem] opacity-15 pointer-events-none'>
            <Image
              src={bgPatternUrl}
              alt='Background Pattern'
              fill
              className='object-cover'
            />
          </div>

          <div className='z-10 flex flex-1 items-center justify-center pl-[8rem] pr-[6rem]'>
            <h2 className='text-center text-[1.5rem] font-extrabold uppercase tracking-wide text-white'>
              Dịch vụ nổi bật
            </h2>
          </div>

          <div className='z-10 flex flex-1 items-center justify-center pl-[6rem] pr-[8rem]'>
            <h2 className='text-center text-[1.5rem] font-extrabold uppercase tracking-wide text-white'>
              Hiệu quả điều trị
            </h2>
          </div>

          <div className='absolute left-0 bottom-0 z-20 h-[7.5rem] w-[14rem] pointer-events-none'>
            <Image
              src={doctorImageUrl}
              alt='Bác sĩ bế em bé'
              fill
              className='object-contain object-bottom'
              priority
            />
          </div>

          <div className='absolute left-1/2 top-0 z-20 h-[8.7rem] w-[16rem] -translate-x-1/2 pointer-events-none'>
            <Image
              src={heartHandsUrl}
              alt='Bàn tay hình trái tim'
              fill
              className='object-contain object-top'
              priority
            />
          </div>

          <div className='absolute right-0 bottom-0 z-20 h-[7.5rem] w-[14rem] pointer-events-none'>
            <Image
              src={familyImageUrl}
              alt='Gia đình ba mẹ bế bé'
              fill
              className='object-contain object-bottom'
              priority
            />
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW ==================== */}
      <div className='hidden xsm:block w-full text-center mb-[1.5rem]'>
        <div className='flex flex-col items-center justify-center gap-[0.125rem]'>
          <h2 className='text-[1.35rem] font-black uppercase tracking-tight text-[#0089cf]'>
            DỊCH VỤ NỔI BẬT
          </h2>
          <h2 className='text-[1.35rem] font-black uppercase tracking-tight text-[#0089cf]'>
            HIỆU QUẢ ĐIỀU TRỊ
          </h2>
        </div>

        <div className='relative mt-[0.75rem] mx-auto h-[4rem] w-full max-w-[22rem] rounded-[1.5rem] bg-[#0089cf] shadow-sm overflow-visible'>
          <div className='absolute inset-0 overflow-hidden rounded-[1.5rem] opacity-20 pointer-events-none'>
            <Image
              src={bgPatternUrl}
              alt='Background Pattern'
              fill
              className='object-cover'
            />
          </div>

          <div className='absolute left-1/2 -top-[0.375rem] -translate-x-1/2 z-20 h-[5.4rem] w-[8rem] pointer-events-none'>
            <Image
              src={heartHandsUrl}
              alt='Bàn tay hình trái tim'
              fill
              className='object-contain object-top drop-shadow-sm'
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}
