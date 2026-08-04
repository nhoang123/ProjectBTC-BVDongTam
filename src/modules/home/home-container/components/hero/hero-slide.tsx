import Image from 'next/image'

import { HeroSlide as HeroSlideType } from '../../types/hero.type'

type Props = {
  slide: HeroSlideType
  active: boolean
}

export function HeroSlide({ slide, active }: Props) {
  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
        active ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      aria-hidden={!active}
    >
      <div className='absolute inset-0 bg-[#eaf7ff]' />

      <Image
        src={slide.backgroundImage}
        alt={slide.alt}
        fill
        priority={active}
        sizes='100vw'
        className='object-cover'
        style={{ objectPosition: slide.backgroundPosition ?? 'center' }}
      />

      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.01)_72%,rgba(255,255,255,0.12)_100%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_58%)]' />

      <div className='sr-only'>
        <p>{slide.subtitle}</p>
        <p>{slide.title}</p>
        <p>{slide.description}</p>
      </div>
    </div>
  )
}