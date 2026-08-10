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
        <div className='mx-auto px-4 xsm:px-5 sm:px-6 lg:px-25 xl:px-10 2xl:px-16'>
          <div className='relative flex items-center justify-between h-14 sm:h-20 lg:h-24'>
            <Logo />

            <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 hidden xl:block text-center'>
              <p
                className='text-[2.5rem] xsm:text-[2.75rem] sm:text-[3rem] text-[#F3BB28]'
                style={{ fontFamily: 'var(--font-great-vibes)' }}
              >
                Gieo mầm hạnh phúc
              </p>
            </div>

            <div className='flex items-center gap-2 xsm:gap-3 z-10'>
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