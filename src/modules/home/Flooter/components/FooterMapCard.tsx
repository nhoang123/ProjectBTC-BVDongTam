'use client'

import { MapPin } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/UI/button'

interface FooterMapCardProps {
  mapUrl: string
}

export const FooterMapCard: React.FC<FooterMapCardProps> = ({ mapUrl }) => {
  return (
    <div className='relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xs sm:h-44'>
      <iframe
        title='Google Map Bệnh viện Đồng Tâm'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.374920340982!2d105.84293113971118!3d20.937453679543026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad003721b3ef%3A0x110a1dcb57d7313c!2zQuG7h25oIHZp4buHbiDEkOG7k25nIFTDom0!5e0!3m2!1svi!2s!4v1786002807303!5m2!1svi!2s'
        className='h-full w-full border-0 opacity-95 filter'
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
      />

      <div className='absolute bottom-2.5 -left-1 transform'>
        <Button
          asChild
          size='sm'
          className='h-7 rounded-full bg-white px-3 text-[0.7rem] font-semibold text-slate-800 shadow-md transition-all hover:bg-slate-50 hover:text-[#0089cf]'
        >
          <a
            href={mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1'
          >
            <MapPin className='h-3 w-3 fill-red-500 text-red-500' />
            <span>Chỉ đường đến Bệnh viện</span>
          </a>
        </Button>
      </div>
    </div>
  )
}
