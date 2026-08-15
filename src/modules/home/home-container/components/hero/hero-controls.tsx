import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/UI/button'

type Props = {
  onPrev: () => void
  onNext: () => void
}

export function HeroControls({ onPrev, onNext }: Props) {
  return (
    <>
      <Button
        onClick={onPrev}
        aria-label='Xem slide trước'
        className='group hero-prev-btn absolute left-[1rem] xsm:left-[0.5rem] top-1/2 z-30 flex h-[3rem] xsm:h-[2rem] w-[3rem] xsm:w-[2rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#e1e5e7] shadow-md transition-colors hover:bg-[#a3a9ac]'
      >
        <ChevronLeft className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem] text-gray-500 group-hover:text-[#dee6e9]' />
      </Button>

      <Button
        onClick={onNext}
        aria-label='Xem slide tiếp theo'
        className='group hero-next-btn absolute right-[1rem] xsm:right-[0.5rem] top-1/2 z-30 flex h-[3rem] xsm:h-[2rem] w-[3rem] xsm:w-[2rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[#e1e5e7] shadow-md transition-colors hover:bg-[#a3a9ac]'
      >
        <ChevronRight className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem] text-gray-500 group-hover:text-[#dee6e9]' />
      </Button>
    </>
  )
}