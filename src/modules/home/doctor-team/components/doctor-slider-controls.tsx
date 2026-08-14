'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderControlsProps {
  onPrevious: () => void
  onNext: () => void
}

export const DoctorSliderControls = ({ onPrevious, onNext }: SliderControlsProps) => {
  return (
    <div className='pointer-events-none absolute z-30 block xsm:hidden w-full mt-[12rem]'>
      <button
        onClick={onPrevious}
        className='pointer-events-auto absolute left-[-4rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#0f3b5e] transition-all duration-200 hover:bg-[#0f3b5e] hover:text-white hover:scale-105'
      >
        <ChevronLeft className='w-[1.5rem] h-[1.5rem]' />
      </button>
      <button
        onClick={onNext}
        className='pointer-events-auto absolute right-[-4rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#0f3b5e] transition-all duration-200 hover:bg-[#0f3b5e] hover:text-white hover:scale-105'
      >
        <ChevronRight className='w-[1.5rem] h-[1.5rem]' />
      </button>
    </div>
  )
}