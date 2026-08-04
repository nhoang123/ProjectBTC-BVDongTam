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
        className='absolute left-[0.75rem] top-1/2 z-20 h-[2.75rem] w-[2.75rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/90 shadow-[0_0.6rem_1.6rem_rgba(0,0,0,0.12)] backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white sm:left-[1rem] sm:h-[3rem] sm:w-[3rem]'
      >
        <ChevronLeft className='h-[1.125rem] w-[1.125rem]' />
      </Button>

      <Button
        variant='secondary'
        size='icon'
        onClick={onNext}
        aria-label='Xem slide tiếp theo'
        className='absolute right-[0.75rem] top-1/2 z-20 h-[2.75rem] w-[2.75rem] -translate-y-1/2 rounded-full border border-white/70 bg-white/90 shadow-[0_0.6rem_1.6rem_rgba(0,0,0,0.12)] backdrop-blur transition-transform hover:-translate-y-1/2 hover:scale-105 hover:bg-white sm:right-[1rem] sm:h-[3rem] sm:w-[3rem]'
      >
        <ChevronRight className='h-[1.125rem] w-[1.125rem]' />
      </Button>
    </>
  )
}
