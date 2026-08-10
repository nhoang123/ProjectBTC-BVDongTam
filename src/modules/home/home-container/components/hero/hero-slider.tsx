'use client'

import { heroSlides } from '../../data/hero.mock'
import { useHeroSlider } from '../../hooks/use-hero-slider'

import { HeroControls } from './hero-controls'
import { HeroSlide } from './hero-slide'

export function HeroSlider() {
  const { current, next, prev } = useHeroSlider(heroSlides.length)

  return (
    <section
      aria-label='Banner trang chủ'
      className='relative overflow-hidden w-full'
    >
      <div className='relative w-full aspect-[28/10] sm:aspect-auto sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px]'>
        <div className='flex h-full w-full'>
          {heroSlides.map((slide, index) => (
            <HeroSlide
              key={slide.id}
              slide={slide}
              active={index === current}
            />
          ))}
        </div>

        <HeroControls
          onPrev={prev}
          onNext={next}
        />
      </div>
    </section>
  )
}
