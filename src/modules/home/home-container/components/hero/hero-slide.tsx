'use client'

import Image from 'next/image'

import { HeroSlide as HeroSlideType } from '../../types/hero-type'

type Props = {
  slide: HeroSlideType
  active: boolean
}

export function HeroSlide({ slide, active }: Props) {
  return (
    <div className='relative w-full h-full overflow-hidden'>
      <div className='absolute inset-0 z-0 w-full h-full'>
        <Image
          src={slide.backgroundImage}
          alt={slide.alt}
          fill
          priority={active}
          sizes='(max-width: 640px) 23.4375rem, 100vw'
          className='object-cover'
          draggable={false}
        />
      </div>

      <div className='absolute inset-0 z-10 pointer-events-none'>
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.01)_72%,rgba(255,255,255,0.12)_100%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_58%)]' />
      </div>
    </div>
  )
}