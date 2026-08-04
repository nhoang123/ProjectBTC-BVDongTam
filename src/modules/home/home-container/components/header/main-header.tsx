'use client'

import { Great_Vibes } from 'next/font/google'
import { useEffect, useState } from 'react'

import { BookingButton } from './booking-button'
import { DesktopNav } from './desktop-nav'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { SearchButton } from './search-button'
import { TopBar } from './top-bar'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
})

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white ${greatVibes.variable}`}>
      <TopBar />

      <div
        className={`border-b transition-all duration-300 ${
          isScrolled ? 'shadow-md border-slate-200' : 'border-slate-100'
        }`}
      >
        <div className='mx-auto max-w-container px-16 xsm:px-16 sm:px-20 lg:px-24'>
          <div className='grid grid-cols-3 items-center h-20 lg:h-24'>
            <div className='flex justify-start'>
              <Logo />
            </div>

            <div className='hidden xl:block text-center'>
              <p
                className='text-[3rem] text-[#F3BB28]'
                style={{ fontFamily: 'var(--font-great-vibes)' }}
              >
                Gieo mầm hạnh phúc
              </p>
            </div>

            <div className='flex items-center justify-end gap-3'>
              <div className='hidden sm:block'>
                <SearchButton />
              </div>

              <div className='hidden md:block'>
                <BookingButton />
              </div>

              <MobileNav />
            </div>
          </div>
          <div className='hidden lg:flex h-14 items-center justify-center border-t border-slate-100'>
            <DesktopNav />
          </div>
        </div>
      </div>
    </header>
  )
}