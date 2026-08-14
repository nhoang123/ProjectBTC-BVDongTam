'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/UI/button'

export const ServiceFooter: React.FC = () => {
  return (
    <div className='mt-[3rem] flex w-full justify-center xsm:mt-[2rem]'>
      <Button
        asChild
        variant='outline'
        className='group h-[3.25rem] rounded-full border-2 border-[#0284c7] bg-white px-[3rem] text-[0.9375rem] font-bold text-[#0284c7] transition-all duration-300 hover:bg-[#0284c7] hover:text-white hover:shadow-md xsm:h-[2.75rem] xsm:px-[2rem] xsm:text-[0.875rem]'
      >
        <Link
          href='/dich-vu'
          className='flex items-center gap-[0.5rem]'
        >
          <span>Xem tất cả</span>
          <ArrowRight className='h-[1.25rem] w-[1.25rem] transition-transform duration-300 group-hover:translate-x-[0.25rem] xsm:h-[1.125rem] xsm:w-[1.125rem]' />
        </Link>
      </Button>
    </div>
  )
}
