'use client'

import { Great_Vibes } from 'next/font/google'
import { useEffect, useState, useRef } from 'react'

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
  const [isAtTop, setIsAtTop] = useState(true)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY.current
      setIsAtTop(currentScrollY === 0)

      if (currentScrollY > 80) {
        if (scrollDifference > 0) {
          setIsHidden(true)
        } else if (scrollDifference < -5) {
          setIsHidden(false)
        }
      } else {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-500 ease-in-out ${greatVibes.variable} ${
        isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {isAtTop && <TopBar />}

      <div
        className={`border-b transition-all duration-300 ${
          !isAtTop ? 'shadow-md border-slate-200' : 'border-slate-100'
        }`}
      >
        <div className='mx-auto px-[6rem] xsm:px-[1rem]'>
          <div className='relative flex items-center justify-between h-[6rem] xsm:h-[3.5rem]'>
            <Logo />

            <div className='pointer-events-none absolute left-1/2 -translate-x-1/2 block text-center xsm:hidden'>
              <p
                className='text-[3.5rem] text-[#F3BB28]'
                style={{ fontFamily: 'var(--font-great-vibes)' }}
              >
                Gieo mầm hạnh phúc
              </p>
            </div>

            <div className='flex items-center gap-[0.75rem] xsm:gap-[0.375rem] z-10'>
              <div className='block xsm:hidden'>
                <SearchButton />
              </div>

              <div className='block xsm:hidden'>
                <BookingButton />
              </div>

              <div className='xsm:block hidden'>
                <MobileNav />
              </div>
            </div>
          </div>

          <div className='flex h-[3.5rem] items-center justify-center border-t border-slate-100 xsm:hidden'>
            <DesktopNav />
          </div>
        </div>
      </div>
    </header>
  )
}
