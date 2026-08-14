'use client'

import gsap from 'gsap'
import Lenis from 'lenis'
import { Check, ArrowRight, ClipboardList } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/UI/button'

import { Doctor } from '../data/mock-doctors'

interface DoctorCardProps {
  doctor: Doctor
}

const ScrollArrow = ({ direction }: { direction: 'up' | 'down' }) => (
  <div className='shrink-0 flex h-[0.875rem] w-full items-center justify-center bg-[#E9F4FC]'>
    <svg
      width='8'
      height='6'
      viewBox='0 0 8 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={direction === 'up' ? 'M4 0L8 6L0 6L4 0Z' : 'M0 0L8 0L4 6L0 0Z'}
        fill='#0099FF'
      />
    </svg>
  </div>
)

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isClient, setIsClient] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const thumbHeightRef = useRef(0)
  const isDraggingRef = useRef(false)

  const [isScrollHovering, setIsScrollHovering] = useState(false)
  const [isScrollDragging, setIsScrollDragging] = useState(false)
  const showTrack = isScrollHovering || isScrollDragging

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateThumb = useCallback(() => {
    const content = contentRef.current
    const rail = railRef.current
    const thumb = thumbRef.current
    if (!content || !rail || !thumb) return

    const { scrollHeight, clientHeight, scrollTop } = content
    const railHeight = rail.clientHeight
    const maxScroll = scrollHeight - clientHeight

    if (maxScroll <= 0) {
      thumbHeightRef.current = railHeight
      gsap.set(thumb, { height: railHeight, y: 0 })
      return
    }

    const ratio = clientHeight / scrollHeight
    const thumbHeight = Math.max(ratio * railHeight, 28)
    const scrollRatio = scrollTop / maxScroll
    const thumbY = scrollRatio * (railHeight - thumbHeight)

    thumbHeightRef.current = thumbHeight
    gsap.set(thumb, { height: thumbHeight })
    gsap.to(thumb, {
      y: thumbY,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  useEffect(() => {
    if (!isClient) return

    const content = contentRef.current
    const inner = content?.firstElementChild as HTMLElement | null
    if (!content || !inner) return

    const lenis = new Lenis({
      wrapper: content,
      content: inner,
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', updateThumb)
    updateThumb()

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    const resizeObserver = new ResizeObserver(updateThumb)
    resizeObserver.observe(content)
    resizeObserver.observe(inner)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      lenis.destroy()
      lenisRef.current = null
      gsap.killTweensOf(thumbRef.current)
    }
  }, [isClient, updateThumb])

  const handleArrowScroll = (dir: 'up' | 'down') => {
    const lenis = lenisRef.current
    if (!lenis) return
    const delta = dir === 'up' ? -60 : 60
    lenis.scrollTo(lenis.scroll + delta, { duration: 0.5 })
  }

  const handleThumbPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    const rail = railRef.current
    const content = contentRef.current
    const lenis = lenisRef.current
    if (!rail || !content || !lenis) return

    const railHeight = rail.clientHeight
    const thumbHeight = thumbHeightRef.current
    const maxThumbTravel = railHeight - thumbHeight
    const maxScroll = content.scrollHeight - content.clientHeight
    if (maxThumbTravel <= 0 || maxScroll <= 0) return

    isDraggingRef.current = true
    setIsScrollDragging(true)
    const startY = e.clientY
    const startScroll = lenis.scroll

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return
      const deltaY = moveEvent.clientY - startY
      const scrollDelta = (deltaY / maxThumbTravel) * maxScroll
      const nextScroll = Math.min(Math.max(startScroll + scrollDelta, 0), maxScroll)
      lenis.scrollTo(nextScroll, { immediate: true })
    }

    const handlePointerUp = () => {
      isDraggingRef.current = false
      setIsScrollDragging(false)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const getMobileTitle = (title: string) => {
    return title
      .replace(/(Bệnh viện)\s+.+$/i, '$1')
      .replace(/\s+Đồng Tâm$/i, '')
      .trim()
  }

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. LAYOUT DESKTOP */}
      {/* ========================================================================= */}
      <div className='block xsm:hidden group relative h-full w-full pb-[2rem]'>
        <div className='relative h-full w-full rounded-[1.5rem] border border-[#dbe8f4] bg-white px-[0.25rem] py-[0.5rem] shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_4px_15px_rgba(0,0,0,0.08)] overflow-visible'>
          <div className='absolute inset-0 z-0 rounded-[1.5rem] overflow-hidden'>
            <Image
              src={
                doctor.bgImage ||
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
              }
              alt='Background'
              fill
              className='object-cover opacity-90 transition-opacity duration-300'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent' />
          </div>

          <div className='relative z-10 flex h-full flex-col'>
            <div className='block flex-1'>
              <div className='flex gap-[0.5rem] h-full'>
                <div className='relative w-[8rem] flex items-end justify-start -ml-[0.25rem]'>
                  <div className='absolute z-1 rounded-[0.625rem] border-2 border-white bg-white/40 shadow-[0_0.5rem_1.5rem_rgba(15,59,94,0.12)] backdrop-blur-xs inset-0 ml-[0.75rem] top-[10.55rem] h-[10.5rem] bottom-[5rem] w-[10.5rem]' />
                  <div className='pointer-events-none absolute -ml-[0.5rem] z-5 w-[12rem] h-[20rem] bottom-[3rem] left-[0.35rem]'>
                    <Image
                      src={doctor.avatar}
                      alt={doctor.name}
                      fill
                      className='object-contain object-bottom drop-shadow-md'
                      sizes='(max-width: 1024px) 11.25rem, 15rem'
                      priority
                    />
                  </div>
                </div>

                <div className='flex-1 flex flex-col gap-[1.25rem] pr-0'>
                  <div
                    className={`inline-flex items-center justify-center gap-[0.25rem] rounded-[0.5rem] px-[1.125rem] py-[0.625rem] shadow-sm ml-auto mr-[0.5rem] w-fit ${
                      doctor.specialtyColor ?? 'bg-[#F4C542]'
                    }`}
                  >
                    <ClipboardList className='h-[0.875rem] w-[0.875rem] shrink-0 text-white' />
                    <span className='text-[0.65rem] text-left font-semibold uppercase tracking-[-0.03em] text-white whitespace-nowrap'>
                      {doctor.specialty}
                    </span>
                  </div>

                  <div className='rounded-[0.625rem] w-[15rem] ml-[2.58rem] mt-[1rem] text-center bg-gradient-to-r from-[#134a9b] to-[#1b91c7] px-[0.75rem] py-[0.5rem] shadow-md'>
                    <h3 className='text-[1.1rem] font-semibold uppercase tracking-tight text-white leading-tight'>
                      {doctor.name}
                    </h3>
                    <p className='text-[0.65rem] font-medium text-[#DCEBFF]'>
                      {doctor.title}
                    </p>
                  </div>

                  <div className='flex -mt-[0.5rem] ml-[4rem] text-center flex-col leading-tight'>
                    <span className='text-[2rem] font-semibold tracking-tight text-[#0B3559] uppercase'>
                      GẦN {doctor.yearsOfExperience} NĂM
                    </span>
                    <span className='text-[2rem] font-semibold tracking-tight text-[#0B3559] uppercase'>
                      KINH NGHIỆM
                    </span>
                  </div>

                  <div
                    className='flex-1 min-h-[4.0625rem] -mt-[1.2rem] flex gap-[0.25rem] overflow-hidden max-h-[7.62rem]'
                    onMouseEnter={() => setIsScrollHovering(true)}
                    onMouseLeave={() => setIsScrollHovering(false)}
                  >
                    <div
                      ref={contentRef}
                      className='flex-1 overflow-y-auto ml-[3.5rem] pr-[0.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    >
                      <div className='space-y-[0.25rem]'>
                        {doctor.achievements.map((item, index) => (
                          <div key={index} className='flex items-start gap-[0.75rem]'>
                            <div className='mt-[0.125rem] flex h-[0.875rem] w-[0.875rem] shrink-0 items-center justify-center rounded-full bg-[#3ea360]'>
                              <Check className='h-[0.625rem] w-[0.625rem] text-[#eff3f1]' strokeWidth={3} />
                            </div>
                            <p className='text-[0.73rem] leading-snug text-[#173B56]'>
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isClient && (
                      <div
                        className={`flex w-[0.875rem] shrink-0 flex-col items-center rounded-full bg-[#E9F4FC] transition-opacity duration-300 ease-out ${
                          showTrack ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <button
                          type='button'
                          aria-label='Cuộn lên'
                          onClick={() => handleArrowScroll('up')}
                          className='shrink-0 outline-none'
                        >
                          <ScrollArrow direction='up' />
                        </button>
                        <div ref={railRef} className='relative w-full flex-1'>
                          <div
                            ref={thumbRef}
                            onPointerDown={handleThumbPointerDown}
                            className='absolute left-[0.25rem] top-0 w-[0.375rem] cursor-grab touch-none rounded-full bg-[#0099FF] active:cursor-grabbing'
                          />
                        </div>
                        <button
                          type='button'
                          aria-label='Cuộn xuống'
                          onClick={() => handleArrowScroll('down')}
                          className='shrink-0 outline-none'
                        >
                          <ScrollArrow direction='down' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-[0.75rem] flex w-full justify-center px-0'>
              <Button
                variant='outline'
                className='h-[2rem] w-[26rem] rounded-[0.8rem] border border-[#C7E3F4] bg-[#EBF4FA] text-[0.7rem] font-bold text-[#1177CC] shadow-sm hover:text-yellow-400'
              >
                Xem chi tiết
                <ArrowRight className='ml-[0.375rem] h-[0.875rem] w-[0.875rem]' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYOUT MOBILE */}
      {/* ========================================================================= */}
      <div className='hidden xsm:block relative h-full w-full overflow-visible'>
        <div className='relative h-[23rem] w-full rounded-[1.35rem] border border-[#dbe8f4] bg-white px-[0.75rem] pb-[0.875rem] pt-[8rem] shadow-sm overflow-visible flex flex-col'>
          <div className='absolute inset-0 z-0 rounded-[1.35rem] overflow-hidden'>
            <Image
              src={
                doctor.bgImage ||
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
              }
              alt='Background'
              fill
              className='object-cover opacity-90'
            />
            {/* <div className='absolute inset-0 bg-gradient-to-t from-white/96 via-white/70 to-white/25' /> */}
          </div>

          <div className='relative z-10 flex flex-col h-full'>
            <div
              className='relative w-full h-[12rem] shrink-0'
              style={{ transform: 'translateY(-3.5rem)' }}
            >
              <div
                className='absolute -top-[6rem] left-[-0.75rem] z-20 w-[12rem] h-[14rem] overflow-visible'
                style={{ transform: 'translateY(-6rem)' }}
              >
                <div className='absolute left-[0.5rem] right-[1rem] bottom-[0.5rem] top-[4rem] rounded-[1.5rem] bg-[#D6EEFB]/70 backdrop-blur-[2px]' />
                <div className='absolute left-[0.5rem] right-[1rem] bottom-[0.5rem] top-[4rem] rounded-[0.7rem] border-[0.1rem] border-white bg-white/30 shadow-[0_6px_18px_rgba(15,59,94,0.18)]' />
                <div className='absolute inset-x-0 h-[16rem] -top-[2.5rem] bottom-2 z-10 overflow-visible pointer-events-none'>
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    fill
                    className='object-cover object-top drop-shadow-md'
                    sizes='(max-width: 640px) 48vw, 200px'
                    priority
                  />
                </div>
              </div>

              <div
                className='absolute right-[-1.25rem] -top-[8rem] z-30 flex w-[50%] flex-col items-start gap-0'
                style={{ transform: 'translateY(-1rem)' }}
              >
                <div
                  className={`inline-flex items-center justify-center gap-[0.25rem] rounded-tl-[0.5rem] rounded-tr-[0.5rem] px-[0.625rem] py-[0.07rem] shadow-md ${
                    doctor.specialtyColor ?? 'bg-[#F4C542]'
                  }`}
                >
                  <ClipboardList className='h-[0.75rem] w-[0.75rem] text-white shrink-0' />
                  <span className='text-[0.55rem] font-bold uppercase tracking-wide text-white whitespace-nowrap'>
                    {doctor.specialty}
                  </span>
                </div>

                <div className='mr-[0.25rem] w-[9rem] rounded-bl-[0.5rem] rounded-br-[0.5rem] rounded-tr-[0.5rem] bg-gradient-to-r from-[#134a9b] to-[#1b91c7] px-[0.75rem] py-[0.5rem] text-left text-white shadow-md border border-white/20'>
                  <h3 className='text-[0.62rem] font-bold uppercase leading-snug tracking-tight text-white drop-shadow-sm whitespace-nowrap'>
                    {doctor.name}
                  </h3>
                  <p className='mt-[0.125rem] text-[0.55rem] font-medium text-[#DCEBFF] leading-snug opacity-95'>
                    {getMobileTitle(doctor.title)}
                  </p>
                </div>

                <div className='mt-[2rem] ml-1 flex w-full gap-2 flex-col items-start leading-[1.1]'>
                  <span className='text-[1.3rem] font-semibold tracking-tight text-[#0B3559] uppercase'>
                    GẦN {doctor.yearsOfExperience} NĂM
                  </span>
                  <span className='text-[1.3rem] font-semibold tracking-tight text-[#0B3559] uppercase'>
                    KINH NGHIỆM
                  </span>
                </div>
              </div>
            </div>

            <div
              className='flex-1 space-y-[0.625rem] px-[0.125rem] min-h-0 overflow-y-auto mt-[-13rem]'
            >
              {doctor.achievements.map((item, index) => (
                <div key={index} className='flex items-start gap-[0.5rem]'>
                  <div className='mt-[0.0375rem] flex h-[1.05rem] w-[1.05rem] shrink-0 items-center justify-center rounded-full bg-[#20C997] shadow-sm'>
                    <Check className='h-[0.625rem] w-[0.625rem] text-white' strokeWidth={3} />
                  </div>
                  <p className='text-[0.8rem] font-medium leading-[1.35] text-[#213547]'>
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className='mt-[1rem] w-full shrink-0'>
              <Button
                variant='outline'
                className='flex h-[2.5rem] w-full items-center justify-center gap-[0.375rem] rounded-full border border-[#BDE0FE] bg-[#E8F4FC] text-[0.82rem] font-bold text-[#0088FF] shadow-sm active:scale-[0.98]'
              >
                Xem chi tiết
                <ArrowRight className='h-[0.875rem] w-[0.875rem]' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorCard