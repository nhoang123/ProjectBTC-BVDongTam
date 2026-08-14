'use client'

import React from 'react'
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa6'

export const FooterSloganSocial: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-start gap-[1.25rem] text-center pb-[0.5rem] xsm:gap-[1rem]'>
      <p
        className='whitespace-nowrap text-[2.6rem] font-normal text-[#f5a623] xsm:text-[1.875rem] leading-snug tracking-wide'
        style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
      >
        Trao niềm tin – Đón hạnh phúc
      </p>

      <div className='flex items-center justify-center gap-[1.25rem] xsm:gap-[0.875rem]'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Facebook'
          className='flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 xsm:h-[2.75rem] xsm:w-[2.75rem]'
        >
          <div className='flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-[#0089cf] text-white xsm:h-[1.75rem] xsm:w-[1.75rem]'>
            <FaFacebookF className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem]' />
          </div>
        </a>

        <a
          href='https://youtube.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Youtube'
          className='flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 xsm:h-[2.75rem] xsm:w-[2.75rem]'
        >
          <div className='flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-[#0089cf] text-white xsm:h-[1.75rem] xsm:w-[1.75rem]'>
            <FaYoutube className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem]' />
          </div>
        </a>

        <a
          href='https://tiktok.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Tiktok'
          className='flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 xsm:h-[2.75rem] xsm:w-[2.75rem]'
        >
          <div className='flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-[#0089cf] text-white xsm:h-[1.75rem] xsm:w-[1.75rem]'>
            <FaTiktok className='h-[1rem] w-[1rem] xsm:h-[0.875rem] xsm:w-[0.875rem]' />
          </div>
        </a>

        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
          className='flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 xsm:h-[2.75rem] xsm:w-[2.75rem]'
        >
          <div className='flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-[#0089cf] text-white xsm:h-[1.75rem] xsm:w-[1.75rem]'>
            <FaInstagram className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem]' />
          </div>
        </a>
      </div>
    </div>
  )
}
