'use client'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/UI/button'

export const SectionHeader = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:items-end justify-between mb-2 xsm:mb-3 sm:mb-4 md:mb-6 gap-4 xsm:gap-6'>
      <div className='space-y-1.5 xsm:space-y-2 lg:space-y-3'>
        {/* Dòng badge tiêu đề - Desktop */}
        <div className='hidden lg:inline-flex items-center gap-2 xsm:gap-3 bg-[#f1c40f] px-3.5 xsm:px-5 py-1 xsm:py-1.5 rounded-full text-white font-bold text-[0.7rem] xsm:text-[0.875rem] lg:text-[1.2rem] uppercase tracking-wide shadow-sm whitespace-nowrap'>
          <svg
            width='14'
            height='14'
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

        {/* Dòng badge tiêu đề - Mobile */}
        <div className='lg:hidden inline-flex items-center gap-1 xsm:gap-1.5 bg-[#f1c40f] px-2 xsm:px-2.5 py-0.5 xsm:py-1 rounded-full text-white font-bold text-[0.45rem] xsm:text-[0.5rem] uppercase tracking-wider shadow-sm whitespace-nowrap'>
          <svg
            width='8'
            height='8'
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

        {/* Tiêu đề chính */}
        <h2 className='text-[1.1rem] xsm:text-[1.3rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-5xl font-bold text-[#1991c7] mt-0.5 xsm:mt-1 tracking-tight whitespace-nowrap'>
          NỀN TẢNG CỦA NIỀM TIN
        </h2>
      </div>

      {/* Nút Xem tất cả: Chỉ hiện ở Desktop */}
      <div className='hidden lg:block flex-shrink-0 self-end'>
        <Button
          variant='outline'
          className='rounded-full border-[#1991c7] text-[#1991c7] hover:bg-[#f1c40f]/20 hover:text-yellow-500 hover:border-[#f1c40f] px-4 xsm:px-6 h-9 xsm:h-10 text-[0.8125rem] xsm:text-sm transition-colors font-medium'
        >
          Xem tất cả <ArrowRight className='ml-1.5 xsm:ml-2 w-3.5 xsm:w-4 h-3.5 xsm:h-4' />
        </Button>
      </div>
    </div>
  )
}
