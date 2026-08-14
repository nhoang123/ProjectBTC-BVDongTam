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
        className='absolute left-[1rem] xsm:left-[0.5rem] top-1/2 z-20 h-[3rem] xsm:h-[2rem] w-[3rem] xsm:w-[2rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/80 shadow-md backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white'
      >
        <ChevronLeft className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem]' />
      </Button>

      <Button
        variant='secondary'
        size='icon'
        onClick={onNext}
        aria-label='Xem slide tiếp theo'
        className='absolute right-[1rem] xsm:right-[0.5rem] top-1/2 z-20 h-[3rem] xsm:h-[2rem] w-[3rem] xsm:w-[2rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/80 shadow-md backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white'
      >
        <ChevronRight className='h-[1.25rem] w-[1.25rem] xsm:h-[1rem] xsm:w-[1rem]' />
      </Button>
    </>
  )
}
