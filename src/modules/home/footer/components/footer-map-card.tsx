'use client'

import { MapPin } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/UI/button'

interface FooterMapCardProps {
  mapUrl: string
}

export const FooterMapCard: React.FC<FooterMapCardProps> = ({ mapUrl }) => {
  return (
    <div className='relative h-[11rem] w-full overflow-hidden rounded-[0.5rem] border border-slate-200 shadow-xs xsm:h-[10rem]'>
      <iframe
        title='Google Map Bệnh viện Đồng Tâm'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.374920340982!2d105.84293113971118!3d20.937453679543026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad003721b3ef%3A0x110a1dcb57d7313c!2zQuG7h25oIHZp4buHbiDEkOG7k25nIFTDom0!5e0!3m2!1svi!2s!4v1786002807303!5m2!1svi!2s'
        className='h-full w-full border-0 opacity-95 filter'
        width='600'
        height='450'
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
      />

      <div className='absolute bottom-[0.625rem] left-[0.5rem] transform'>
        <Button
          asChild
          size='sm'
          className='h-[1.75rem] w-[10rem] rounded-[0.5rem] bg-white px-[0.75rem] text-[0.7rem] font-semibold text-slate-800 shadow-md transition-all hover:bg-slate-50 hover:text-[#0089cf]'
        >
          <a
            href={mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-[0.25rem]'
          >
            <MapPin className='h-[0.75rem] w-[0.75rem] fill-blue-500 text-white' />
            <span>Chỉ đường đến Bệnh viện</span>
          </a>
        </Button>
      </div>
    </div>
  )
}
