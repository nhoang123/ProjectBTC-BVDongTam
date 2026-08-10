'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SliderControlsProps {
  onPrevious: () => void
  onNext: () => void
}

export const DoctorSliderControls = ({ onPrevious, onNext }: SliderControlsProps) => {
  return (
    <div className='pointer-events-none absolute z-30 hidden w-full mt-60 justify-between lg:flex'>
      <button
        onClick={onPrevious}
        className='pointer-events-auto -ml-15 xsm:-ml-10 flex h-12 xsm:h-11 w-12 xsm:w-11 items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#0f3b5e] transition-all duration-200 hover:bg-[#0f3b5e] hover:text-white hover:scale-105'
      >
        <ChevronLeft className='w-5 xsm:w-6 h-5 xsm:h-6' />
      </button>
      <button
        onClick={onNext}
        className='pointer-events-auto -mr-15 xsm:-mr-10 flex h-12 xsm:h-11 w-12 xsm:w-11 items-center justify-center rounded-full border border-[#cfe2f1] bg-white shadow-[0_0.625rem_1.5rem_rgba(15,59,94,0.1)] text-[#0f3b5e] transition-all duration-200 hover:bg-[#0f3b5e] hover:text-white hover:scale-105'
      >
        <ChevronRight className='w-5 xsm:w-6 h-5 xsm:h-6' />
      </button>
    </div>
  )
}
