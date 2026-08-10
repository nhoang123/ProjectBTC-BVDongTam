'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/UI/button'

export const ServiceFooter: React.FC = () => {
  return (
    <div className='mt-[2rem] flex w-full justify-center xsm:mt-[2.5rem] sm:mt-[3rem]'>
      <Button
        asChild
        variant='outline'
        className='group h-[2.75rem] rounded-full border-[0.125rem] border-[#0284c7] bg-white px-[2rem] text-[0.875rem] font-bold text-[#0284c7] transition-all duration-300 hover:bg-[#0284c7] hover:text-white hover:shadow-md xsm:h-[3rem] xsm:px-[2.5rem] xsm:text-[0.9375rem] sm:h-[3.25rem] sm:px-[3rem]'
      >
        <Link
          href='/dich-vu'
          className='flex items-center gap-[0.5rem]'
        >
          <span>Xem tất cả</span>
          <ArrowRight className='h-[1.125rem] w-[1.125rem] transition-transform duration-300 group-hover:translate-x-[0.25rem] xsm:h-[1.25rem] xsm:w-[1.25rem]' />
        </Link>
      </Button>
    </div>
  )
}
