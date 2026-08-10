import Image from 'next/image'

import { HeroSlide as HeroSlideType } from '../../types/hero.type'

type Props = {
  slide: HeroSlideType
  active: boolean
  isDragging?: boolean
}

export function HeroSlide({ slide, active, isDragging = false }: Props) {
  return (
    <div
      className="shrink-0 w-full h-full relative overflow-hidden"
      style={{
        pointerEvents: isDragging ? 'none' : 'auto',
        touchAction: 'none',
      }}
      aria-hidden={!active}
    >
      <div className="absolute inset-0">
        <Image
          src={slide.backgroundImage}
          alt={slide.alt}
          fill
          priority={active}
          sizes='100vw'
          className='object-cover transition-transform duration-1000 ease-out'
          style={{
            objectPosition: slide.backgroundPosition ?? 'center',
            transform: active ? 'scale(1)' : 'scale(1.05)',
          }}
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 transition-opacity duration-700">
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.01)_72%,rgba(255,255,255,0.12)_100%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_58%)]' />
      </div>

      {!active && !isDragging && (
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-700" />
      )}

      <div className='sr-only'>
        <p>{slide.subtitle}</p>
        <p>{slide.title}</p>
        <p>{slide.description}</p>
      </div>
    </div>
  )
}