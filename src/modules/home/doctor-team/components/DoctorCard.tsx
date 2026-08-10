import gsap from 'gsap'
import Lenis from 'lenis'
import { Check, ArrowRight, BriefcaseMedical } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/UI/button'

import { Doctor } from '../data/mockDoctors'

interface DoctorCardProps {
  doctor: Doctor
}

const ScrollArrow = ({ direction }: { direction: 'up' | 'down' }) => (
  <div className='shrink-0 flex h-3.5 w-full items-center justify-center bg-[#E9F4FC]'>
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

  return (
    <div className='group relative h-[35.2rem] xsm:max-h-[30rem] w-full overflow-visible flex flex-col justify-end pt-12 lg:pt-0'>
      <div className='relative mt-30 lg:pt-14 h-full max-h-[38rem] xsm:max-h-[22rem] sm:max-h-[38rem] w-full rounded-3xl border border-[#dbe8f4] bg-white p-3 xsm:p-4 sm:p-5 lg:p-6 shadow-sm transition-all duration-300 hover:shadow-[0_1.25rem_3.125rem_rgba(15,59,94,0.14)] lg:overflow-hidden overflow-visible'>
        <div className='absolute inset-0 z-0 rounded-3xl overflow-hidden'>
          <Image
            src={
              doctor.bgImage ||
              'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
            }
            alt='Background'
            fill
            className='object-cover opacity-85 transition-opacity duration-300'
          />
          <div className='absolute inset-0 bg-linear-to-t from-white/90 via-white/30 to-transparent lg:from-white/80 lg:via-white/20' />
        </div>

        <div className='relative z-10 flex h-full flex-col justify-between'>
          {/* ================= (MOBILE) ================= */}
          <div className='lg:hidden relative mb-1 min-h-26 xsm:min-h-28'>
            <div className='absolute -left-2 -top-10 xsm:-top-8 sm:-top-6 z-20 w-[50%] min-w-30 max-w-40 sm:w-[48%]'>
              <div className='relative min-h-40 xsm:min-h-44 sm:min-h-48'>
                <div className='absolute inset-x-[0.15rem] -top-[2.6rem] bottom-18 z-0 rounded-3xl border-2 border-white bg-white/40 shadow-[0_0.5rem_1.5rem_rgba(15,59,94,0.12)] backdrop-blur-xs' />
                <div className='pointer-events-none absolute left-1/2 -top-[6.6rem] z-10 h-[120%] w-[120%] -translate-x-1/2'>
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    fill
                    className='object-contain object-bottom drop-shadow-md'
                    sizes='(max-width: 768px) 160px, 200px'
                    priority
                  />
                </div>
              </div>
            </div>
            <div className='absolute -right-5 -top-12 xsm:-top-[5.2rem] sm:-top-[1.2rem] z-30 flex w-[58%] min-w-0 flex-col items-start gap-1 sm:w-[58%]'>
              <div
                className={`inline-flex items-center gap-0 rounded-xl px-2.5 py-0.5 shadow-md ${
                  doctor.specialtyColor ?? 'bg-[#F4C542]'
                }`}
              >
                <BriefcaseMedical className='h-3 w-3 text-white' />
                <span className='whitespace-nowrap text-[0.6rem] font-extrabold uppercase tracking-wider text-white'>
                  {doctor.specialty}
                </span>
              </div>

              <div className='w-full rounded-[0.625rem] bg-linear-to-r from-[#134a9b] to-[#1b91c7] px-2.5 py-1.5 text-left shadow-md'>
                <h3 className='wrap-break-word text-[0.7rem] font-extrabold uppercase leading-tight tracking-tight text-white'>
                  {doctor.name}
                </h3>
                <p className='mt-0.5 wrap-break-word text-[0.58rem] font-medium leading-tight text-[#DCEBFF]'>
                  {doctor.title}
                </p>
              </div>

              <div className='pt-0.5 pr-2 w-full text-right leading-tight'>
                <span className='text-[0.8rem] font-black tracking-tight text-[#0B3559] uppercase xsm:text-[0.875rem]'>
                  GẦN {doctor.yearsOfExperience} NĂM
                </span>
                <span className='block text-[0.8rem] font-black tracking-tight text-[#0B3559] uppercase xsm:text-[0.875rem]'>
                  KINH NGHIỆM
                </span>
              </div>
            </div>
          </div>

          {/* Block Grid 12 Cột - Desktop */}
          <div className='grid grid-cols-12 items-start gap-2 xsm:gap-3 lg:gap-4'>
            <div className='relative col-span-12 hidden h-full min-h-45 items-center justify-center xsm:min-h-55 sm:min-h-[15.625rem] lg:col-span-5 lg:flex'>
              <div className='absolute z-0 rounded-3xl border-2 border-white bg-white/40 shadow-[0_0.5rem_1.5rem_rgba(15,59,94,0.12)] backdrop-blur-xs -left-3 -right-1 top-[30%] w-44 h-47 bottom-[5%] -lg:left-[1%] -lg:top-[40%] lg:bottom-[4%]' />
              <div className='pointer-events-none absolute w-[11.2rem] h-112 z-10 bottom-2 left-1/2 -translate-x-1/2 ml-1 -top-[12%] lg:-top-45 lg:bottom-6'>
                <Image
                  src={doctor.avatar}
                  alt={doctor.name}
                  fill
                  className='object-contain object-bottom drop-shadow-md'
                  sizes='(max-width: 768px) 180px, 240px'
                  priority
                />
              </div>
            </div>

            <div className='hidden col-span-7 -mr-3.5 flex-col items-start gap-1.5 text-left lg:flex lg:items-end lg:text-right xsm:gap-2 lg:gap-3'>
              <div className='flex w-full justify-start lg:justify-end'>
                <div
                  className={`inline-flex mb-4 -mt-10 h-[1.6rem] [word-spacing:-0.1rem] items-center gap-3 rounded-lg px-2.5 py-1 shadow-sm xsm:gap-1.5 xsm:px-3.5 ${
                    doctor.specialtyColor ?? 'bg-[#F4C542]'
                  }`}
                >
                  <BriefcaseMedical className='h-3 w-3 -mr-[0.6rem] text-white sm:h-4 sm:w-4' />
                  <span className='whitespace-nowrap text-[0.625rem] font-extrabold uppercase tracking-wider text-white xsm:text-[0.6875rem] sm:text-[0.75rem] md:text-[0.8125rem]'>
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              <div className='w-60 rounded-[0.625rem] bg-linear-to-r from-[#134a9b] to-[#1b91c7] px-2.5 py-2 text-left shadow-md xsm:px-3 lg:text-center'>
                <h3 className='whitespace-nowrap text-[0.75rem] font-extrabold uppercase tracking-tight text-white xsm:text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem]'>
                  {doctor.name}
                </h3>
                <p className='mt-0.5 whitespace-nowrap text-[0.625rem] font-medium text-[#DCEBFF] xsm:text-[0.65625rem] sm:text-[0.71875rem] md:text-[0.78125rem]'>
                  {doctor.title}
                </p>
              </div>

              <div className='my-0.5 flex w-full flex-col leading-tight text-left lg:text-center'>
                <span className='text-[0.875rem] font-black tracking-tight text-[#0B3559] uppercase xsm:text-[1rem] sm:text-[1.1875rem] lg:text-[1.3125rem]'>
                  GẦN {doctor.yearsOfExperience} NĂM
                </span>
                <span className='text-[0.875rem] font-black tracking-tight text-[#0B3559] uppercase xsm:text-[1rem] sm:text-[1.1875rem] lg:text-[1.3125rem]'>
                  KINH NGHIỆM
                </span>
              </div>

              <div
                className='hidden w-full max-h-[5.625rem] mt-4 lg:flex lg:gap-2'
                onMouseEnter={() => setIsScrollHovering(true)}
                onMouseLeave={() => setIsScrollHovering(false)}
              >
                <div
                  ref={contentRef}
                  className='max-h-[5.625rem] flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                  <div className='space-y-1.5'>
                    {doctor.achievements.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-start gap-1.5 justify-start text-left'
                      >
                        <div className='mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#D8F6E9]'>
                          <Check
                            className='h-2.5 w-2.5 text-[#14B86A]'
                            strokeWidth={3}
                          />
                        </div>
                        <p className='text-[0.78125rem] leading-snug text-[#173B56] lg:text-[0.8125rem]'>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {isClient && (
                  <div
                    className={`flex w-3.5 shrink-0 flex-col items-center rounded-full bg-[#E9F4FC] transition-opacity duration-300 ease-out ${
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

                    <div
                      ref={railRef}
                      className='relative w-full flex-1'
                    >
                      <div
                        ref={thumbRef}
                        onPointerDown={handleThumbPointerDown}
                        className='absolute left-1 top-0 w-1.5 cursor-grab touch-none rounded-full bg-[#0099FF] active:cursor-grabbing'
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

          {/* Danh sách thành tựu Mobile */}
          <div className='block lg:hidden -mt-4 space-y-1 pr-1'>
            {doctor.achievements.map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-1.5 xsm:gap-2'
              >
                <div className='mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#D8F6E9]'>
                  <Check
                    className='h-2.5 w-2.5 text-[#14B86A]'
                    strokeWidth={3}
                  />
                </div>
                <p className='text-[0.6875rem] leading-snug text-[#173B56] xsm:text-[0.71875rem]'>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className='mt-6 flex w-full justify-center'>
            <Button
              variant='outline'
              className='h-8 w-full rounded-full border border-[#C7E3F4] bg-[#EBF4FA] text-[0.6875rem] font-bold text-[#1177CC] shadow-sm hover:text-yellow-400 xsm:h-9 xsm:max-w-[14.375rem] xsm:text-[0.75rem] sm:h-9.5 sm:text-[0.8125rem] lg:bg-white'
            >
              Xem chi tiết
              <ArrowRight className='ml-1.5 h-3.5 w-3.5 xsm:h-4 xsm:w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard