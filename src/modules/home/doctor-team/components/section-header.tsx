'use client'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/UI/button'

export const SectionHeader = () => {
  return (
    <div className='flex items-center justify-between ml-[0.5rem] mr-[0.5rem]'>

      {/* 1. MOBILE LAYOUT */}
      <div className='hidden xsm:flex -mt-[5rem] flex-col items-start gap-[0.375rem] w-full'>
        <div className='inline-flex w-fit items-center gap-[0.375rem] bg-[#f1c40f] px-[0.625rem] py-[0.25rem] rounded-full text-white font-bold text-[0.6rem] uppercase tracking-wide shadow-sm'>
          <svg
            width='11'
            height='11'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='6'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-white flex-shrink-0'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
          Đội ngũ bác sĩ giàu kinh nghiệm
        </div>
        <h2 className='text-[1.4rem] font-extrabold text-[#1991c7] tracking-tight leading-tight text-left'>
          NỀN TẢNG CỦA NIỀM TIN
        </h2>
      </div>

      {/* 2. DESKTOP LAYOUT */}
      <div className='block xsm:hidden flex-col gap-[0.25rem]'>
        <div className='inline-flex items-center w-[18.5rem] gap-[0.25rem] bg-[#f1c40f] px-[0.625rem] py-[0.25rem] rounded-[3rem] text-white font-bold text-[0.9rem] uppercase tracking-wide shadow-sm whitespace-nowrap'>
          <svg
            width='13'
            height='13'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='7.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-white flex-shrink-0'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
          Đội ngũ bác sĩ giàu kinh nghiệm
        </div>
        <h2 className='text-[2.25rem] font-bold text-[#1991c7] tracking-tight'>
          NỀN TẢNG CỦA NIỀM TIN
        </h2>
      </div>

      {/* Nút Xem tất cả: Chỉ hiện ở Desktop, ẩn ở Mobile */}
      <div className='block xsm:hidden'>
        <Button
          variant='outline'
          className='rounded-full border-[#1991c7] text-[#1991c7] hover:bg-[#f1c40f]/20 hover:text-yellow-500 hover:border-[#f1c40f] px-[1.5rem] h-[2.5rem] text-[0.875rem] transition-colors font-medium'
        >
          Xem tất cả <ArrowRight className='ml-[0.5rem] w-[1rem] h-[1rem]' />
        </Button>
      </div>

    </div>
  )
}