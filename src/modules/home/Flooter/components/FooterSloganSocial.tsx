'use client'

import React from 'react'
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa6'

export const FooterSloganSocial: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-start gap-4 text-center pb-2 sm:gap-5'>
      <p
        className='whitespace-nowrap text-2xl font-normal text-[#f5a623] xsm:text-3xl sm:text-4xl lg:text-[2.6rem] leading-snug tracking-wide'
        style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
      >
        Trao niềm tin – Đón hạnh phúc
      </p>

      <div className='flex items-center justify-center gap-3.5 xsm:gap-4 sm:gap-5'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Facebook'
          className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 sm:h-14 sm:w-14'
        >
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#0089cf] text-white sm:h-9 sm:w-9'>
            <FaFacebookF className='h-4 w-4 sm:h-5 sm:w-5' />
          </div>
        </a>

        <a
          href='https://youtube.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Youtube'
          className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 sm:h-14 sm:w-14'
        >
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#0089cf] text-white sm:h-9 sm:w-9'>
            <FaYoutube className='h-4 w-4 sm:h-5 sm:w-5' />
          </div>
        </a>

        <a
          href='https://tiktok.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Tiktok'
          className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 sm:h-14 sm:w-14'
        >
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#0089cf] text-white sm:h-9 sm:w-9'>
            <FaTiktok className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
          </div>
        </a>

        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
          className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 sm:h-14 sm:w-14'
        >
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#0089cf] text-white sm:h-9 sm:w-9'>
            <FaInstagram className='h-4 w-4 sm:h-5 sm:w-5' />
          </div>
        </a>
      </div>
    </div>
  )
}