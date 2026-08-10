'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/UI/button'

interface NewsSliderControlsProps {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}

export const NewsSliderControls: React.FC<NewsSliderControlsProps> = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
}) => {
  return (
    <>
      <Button
        variant='outline'
        size='icon'
        onClick={onPrev}
        disabled={!canPrev}
        className='absolute -left-[1rem] top-1/2 z-20 h-[2.5rem] w-[2.5rem] -translate-y-1/2 rounded-full border border-[#0089cf] bg-white text-[#0089cf] shadow-md transition-all hover:bg-[#0089cf] hover:text-white disabled:opacity-20 xsm:h-[2.75rem] xsm:w-[2.75rem] sm:-left-[2rem] md:-left-[2.75rem] lg:-left-[3.5rem]'
        aria-label='Previous Slide'
      >
        <ChevronLeft className='h-[1.25rem] w-[1.25rem] stroke-[2.5]' />
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={onNext}
        disabled={!canNext}
        className='absolute -right-[1rem] top-1/2 z-20 h-[2.5rem] w-[2.5rem] -translate-y-1/2 rounded-full border border-[#0089cf] bg-white text-[#0089cf] shadow-md transition-all hover:bg-[#0089cf] hover:text-white disabled:opacity-20 xsm:h-[2.75rem] xsm:w-[2.75rem] sm:-right-[2rem] md:-right-[2.75rem] lg:-right-[3.5rem]'
        aria-label='Next Slide'
      >
        <ChevronRight className='h-[1.25rem] w-[1.25rem] stroke-[2.5]' />
      </Button>
    </>
  )
}
