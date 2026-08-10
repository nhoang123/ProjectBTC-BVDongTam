'use client'

import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/UI/button'

export const NewsHeader: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
      <div className='flex flex-col items-start gap-2'>
        <div className='inline-flex items-center gap-1.5 rounded-full bg-[#facc15] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs'>
          <Plus className='h-4 w-4 stroke-[8]' />
          <span>KIẾN THỨC & TIN TỨC</span>
        </div>

        <h2 className='text-2xl font-extrabold uppercase tracking-tight text-[#0089cf] sm:text-3xl lg:text-[2.25rem]'>
          THÔNG TIN NỔI BẬT
        </h2>
      </div>

      <Button
        asChild
        variant='outline'
        className='hidden lg:flex group h-11 rounded-full border border-[#0089cf] bg-white px-6 text-sm font-semibold text-[#0089cf] transition-all hover:bg-[#0089cf] hover:text-white'
      >
        <Link
          href='/tin-tuc'
          className='flex items-center gap-2'
        >
          <span>Xem tất cả</span>
          <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        </Link>
      </Button>
    </div>
  )
}
