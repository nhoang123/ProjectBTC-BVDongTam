'use client'

import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/UI/button'

export const NewsHeader: React.FC = () => {
  return (
    <div className='flex flex-row items-end justify-between gap-[1rem] xsm:flex-col xsm:items-start'>
      <div className='flex flex-col items-start gap-[0.5rem]'>
        <div className='inline-flex items-center gap-[0.375rem] rounded-full bg-[#facc15] px-[0.875rem] py-[0.375rem] text-[0.75rem] font-bold text-white shadow-xs'>
          <Plus className='h-[1rem] w-[1rem] stroke-[8]' />
          <span>KIẾN THỨC & TIN TỨC</span>
        </div>

        <h2 className='text-[2.25rem] font-extrabold uppercase tracking-tight text-[#0089cf] xsm:text-[1.5rem]'>
          THÔNG TIN NỔI BẬT
        </h2>
      </div>

      {/* Nút Xem tất cả: Hiện trên Desktop, ẩn trên Mobile */}
      <Button
        asChild
        variant='outline'
        className='block xsm:hidden group h-[2.75rem] rounded-full border border-[#0089cf] bg-white px-[1.5rem] text-[0.875rem] font-semibold text-[#0089cf] transition-all hover:bg-[#0089cf] hover:text-white'
      >
        <Link
          href='/tin-tuc'
          className='flex items-center gap-[0.5rem]'
        >
          <span>Xem tất cả</span>
          <ArrowRight className='h-[1rem] w-[1rem] transition-transform duration-300 group-hover:translate-x-[0.25rem]' />
        </Link>
      </Button>
    </div>
  )
}
