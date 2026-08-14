'use client'

import { useState } from 'react'

import { heroSlides } from '../../data/hero-mock'
import { useHeroSlider } from '../../hooks/use-hero-slider'

import { HeroControls } from './hero-controls'
import { HeroSlide } from './hero-slide'

export function HeroSlider() {
  const totalSlides = heroSlides.length

  const {
    current,
    setCurrent,
    next,
    prev,
    isDragging,
    dragOffset,
    isTransitioning,
    containerRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    setIsHovering,
  } = useHeroSlider(totalSlides)

  const [enableTransition, setEnableTransition] = useState(true)
  const extendedSlides = [...heroSlides, ...heroSlides, ...heroSlides]

  const displayIndex = totalSlides + current
  const handleTransitionEnd = () => {
    if (current >= totalSlides || current <= -totalSlides) {
      setEnableTransition(false)
      const normalizedCurrent = ((current % totalSlides) + totalSlides) % totalSlides
      setCurrent(normalizedCurrent)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true)
        })
      })
    }
  }

  const transformStyle = `calc(-${displayIndex * 100}% + ${dragOffset}px)`

  return (
    <section
      aria-label='Banner trang chủ'
      className='relative overflow-hidden w-full select-none'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={containerRef}
        className='relative w-full left-0 xsm:w-[23.4375rem] xsm:left-[50%] xsm:-ml-[11.71875rem]'
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
      >
        <div className={`w-full h-[35rem] xsm:h-[8rem] ${isDragging ? 'pointer-events-none' : ''}`}>
          <div
            className='flex h-full w-full relative'
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(${transformStyle})`,
              transition:
                !enableTransition || isDragging || !isTransitioning
                  ? 'none'
                  : 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {extendedSlides.map((slide, index) => {
              const isActive = index === displayIndex
              return (
                <div
                  key={`${slide.id}-${index}`}
                  className='w-full h-full shrink-0 relative'
                >
                  <HeroSlide
                    slide={slide}
                    active={isActive}
                    isDragging={isDragging}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <HeroControls
          onPrev={prev}
          onNext={next}
        />
      </div>
    </section>
  )
}
