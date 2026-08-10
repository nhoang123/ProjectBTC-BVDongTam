'use client'

import React from 'react'

import { SocialLink } from '../types/footer.type'

interface FooterSloganSocialProps {
  socials: SocialLink[]
}

export const FooterSloganSocial: React.FC<FooterSloganSocialProps> = ({ socials }) => {
  const renderSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase()

    if (lowerName.includes('facebook') || lowerName.includes('fb')) {
      return (
        <svg
          className='h-8 w-8 text-[#0089cf] sm:h-9 sm:w-9'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 0C5.373 0 0 5.373 0 12c0 6.016 4.413 10.998 10.125 11.854v-8.385H7.078v-3.47h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.587 22.998 24 18.016 24 12c0-6.627-5.373-12-12-12z' />
        </svg>
      )
    }

    if (lowerName.includes('youtube') || lowerName.includes('yt')) {
      return (
        <svg
          className='h-8 w-8 text-[#0089cf] sm:h-9 sm:w-9'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      )
    }

    if (lowerName.includes('tiktok')) {
      return (
        <svg
          className='h-8 w-8 text-[#0089cf] sm:h-9 sm:w-9'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.29 10.2a3.81 3.81 0 0 1-2.29-.76v3.81a3.75 3.75 0 1 1-3.75-3.75c.21 0 .42.02.62.06v1.94a1.8 1.8 0 1 0 1.13 1.69V8h1.88a3.8 3.8 0 0 0 2.41 1.88v2.32z' />
        </svg>
      )
    }

    if (lowerName.includes('instagram') || lowerName.includes('ig')) {
      return (
        <svg
          className='h-8 w-8 text-[#0089cf] sm:h-9 sm:w-9'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 12c0 1.657-.012 2.119-.068 2.766-.072.838-.28 1.583-.883 2.186-.603.603-1.348.811-2.186.883-.647.056-1.109.068-2.863.068s-2.216-.012-2.863-.068c-.838-.072-1.583-.28-2.186-.883-.603-.603-.811-1.348-.883-2.186C6.012 14.119 6 13.657 6 12s.012-2.119.068-2.766c.072-.838.28-1.583.883-2.186.603-.603 1.348-.811 2.186-.883C9.784 6.109 10.246 6 12 6s2.216.012 2.863.068c.838.072 1.583.28 2.186.883.603.603.811 1.348.883 2.186.056.647.068 1.109.068 2.863zm-6-3.883c-2.145 0-3.883 1.738-3.883 3.883S9.855 15.883 12 15.883 15.883 14.145 15.883 12 14.145 8.117 12 8.117zm0 6.42a2.537 2.537 0 1 1 0-5.074 2.537 2.537 0 0 1 0 5.074zm3.951-6.488a.908.908 0 1 1-1.816 0 .908.908 0 0 1 1.816 0z' />
        </svg>
      )
    }

    return (
      <svg
        className='h-8 w-8 text-[#0089cf] sm:h-9 sm:w-9'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' />
      </svg>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start gap-5 text-center pb-2'>
      <p
        className='whitespace-nowrap text-3xl font-normal text-[#f5a623] sm:text-4xl lg:text-[2.6rem] leading-snug tracking-wide'
        style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
      >
        Trao niềm tin – Đón hạnh phúc
      </p>

      <div className='flex items-center justify-center gap-4 sm:gap-5'>
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={item.name}
            className='flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/90 bg-white shadow-2xs transition-all hover:border-[#0089cf] hover:scale-105 sm:h-14 sm:w-14'
          >
            {renderSocialIcon(item.name)}
          </a>
        ))}
      </div>
    </div>
  )
}
