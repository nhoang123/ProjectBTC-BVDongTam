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
  bgPatternUrl = '/images/service-images/bg-pattern.png',
  doctorImageUrl = '/images/service-images/doctor-baby.png',
  heartHandsUrl = '/images/service-images/heart-hands.png',
  familyImageUrl = '/images/service-images/family-baby.png',
}) => {
  return (
    <>
      {/* ==================== DESKTOP VIEW ==================== */}
      <div className='hidden lg:block relative my-4 w-full px-2 py-6 sm:px-4 lg:py-8'>
        <div className='relative mx-auto flex h-16 w-full items-center justify-between rounded-2xl bg-[#0089cf] shadow-md xsm:h-20 sm:h-24 lg:h-28'>
          <div className='absolute inset-0 overflow-hidden rounded-2xl opacity-15 pointer-events-none'>
            <Image
              src={bgPatternUrl}
              alt='Background Pattern'
              fill
              className='object-cover'
            />
          </div>

          <div className='z-10 flex flex-1 items-center justify-center pl-16 pr-10 xsm:pl-20 xsm:pr-14 sm:pl-32 sm:pr-20 md:pl-40 md:pr-24 lg:pl-48 lg:pr-32'>
            <h2 className='text-center text-xs font-extrabold uppercase tracking-wide text-white xsm:text-sm sm:text-lg md:text-xl lg:text-2xl'>
              Dịch vụ nổi bật
            </h2>
          </div>

          <div className='z-10 flex flex-1 items-center justify-center pl-10 pr-16 xsm:pl-14 xsm:pr-20 sm:pl-20 sm:pr-32 md:pl-24 md:pr-40 lg:pl-32 lg:pr-48'>
            <h2 className='text-center text-xs font-extrabold uppercase tracking-wide text-white xsm:text-sm sm:text-lg md:text-xl lg:text-2xl'>
              Hiệu quả điều trị
            </h2>
          </div>

          <div className='absolute left-0 bottom-0 z-20 h-[125%] w-20 xsm:w-28 sm:w-40 md:w-48 lg:w-56 pointer-events-none'>
            <Image
              src={doctorImageUrl}
              alt='Bác sĩ bế em bé'
              fill
              sizes='(max-width: 768px) 120px, 250px'
              className='object-contain object-bottom'
              priority
            />
          </div>

          <div className='absolute left-1/2 top-0 z-20 h-[145%] w-24 -translate-x-1/2 xsm:w-32 sm:w-44 md:w-52 lg:w-64 pointer-events-none'>
            <Image
              src={heartHandsUrl}
              alt='Bàn tay hình trái tim'
              fill
              sizes='(max-width: 768px) 150px, 280px'
              className='object-contain object-top'
              priority
            />
          </div>

          <div className='absolute right-0 bottom-0 z-20 h-[125%] w-20 xsm:w-28 sm:w-40 md:w-48 lg:w-56 pointer-events-none'>
            <Image
              src={familyImageUrl}
              alt='Gia đình ba mẹ bế bé'
              fill
              sizes='(max-width: 768px) 120px, 250px'
              className='object-contain object-bottom'
              priority
            />
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW ==================== */}
      <div className='block lg:hidden w-full text-center mb-6'>
        <div className='flex flex-col items-center justify-center gap-0.5'>
          <h2 className='text-[1.35rem] font-black uppercase tracking-tight text-[#0089cf]'>
            DỊCH VỤ NỔI BẬT
          </h2>
          <h2 className='text-[1.35rem] font-black uppercase tracking-tight text-[#0089cf]'>
            HIỆU QUẢ ĐIỀU TRỊ
          </h2>
        </div>

        <div className='relative mt-3 mx-auto h-16 w-full max-w-[22rem] rounded-2xl bg-[#0089cf] shadow-sm overflow-visible'>
          <div className='absolute inset-0 overflow-hidden rounded-2xl opacity-20 pointer-events-none'>
            <Image
              src={bgPatternUrl}
              alt='Background Pattern'
              fill
              className='object-cover'
            />
          </div>

          <div className='absolute left-1/2 -top-1.5 -translate-x-1/2 z-20 h-[135%] w-32 pointer-events-none'>
            <Image
              src={heartHandsUrl}
              alt='Bàn tay hình trái tim'
              fill
              sizes='150px'
              className='object-contain object-top drop-shadow-sm'
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}
