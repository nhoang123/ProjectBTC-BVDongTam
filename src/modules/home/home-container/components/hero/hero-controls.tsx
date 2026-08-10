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
        variant='secondary'
        size='icon'
        onClick={onPrev}
        aria-label='Xem slide trước'
        className='absolute left-[0.25rem] xsm:left-[0.5rem] sm:left-[1rem] top-1/2 z-20 h-[1.75rem] w-[1.75rem] xsm:h-[2.25rem] xsm:w-[2.25rem] sm:h-[3rem] sm:w-[3rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/80 shadow-md backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white'
      >
        <ChevronLeft className='h-3 w-3 xsm:h-4 xsm:w-4 sm:h-5 sm:w-5' />
      </Button>

      <Button
        variant='secondary'
        size='icon'
        onClick={onNext}
        aria-label='Xem slide tiếp theo'
        className='absolute right-[0.25rem] xsm:right-[0.5rem] sm:right-[1rem] top-1/2 z-20 h-[1.75rem] w-[1.75rem] xsm:h-[2.25rem] xsm:w-[2.25rem] sm:h-[3rem] sm:w-[3rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/80 shadow-md backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white'
      >
        <ChevronRight className='h-3 w-3 xsm:h-4 xsm:w-4 sm:h-5 sm:w-5' />
      </Button>
    </>
  )
}
