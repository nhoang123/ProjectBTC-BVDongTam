import { Button } from '@/components/UI/button'

type Props = {
  total: number
  current: number
  onSelect: (index: number) => void
}

export function HeroIndicators({ total, current, onSelect }: Props) {
  if (total <= 1) return null

  return (
    <div className='absolute bottom-[0.75rem] xsm:bottom-[1rem] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[0.4rem] xsm:gap-[0.55rem] rounded-full bg-white/55 px-[0.5rem] xsm:px-[0.7rem] py-[0.35rem] xsm:py-[0.45rem] shadow-[0_0.5rem_1.25rem_rgba(15,23,42,0.08)] backdrop-blur-sm sm:bottom-[0.75rem]'>
      {Array.from({ length: total }).map((_, index) => (
        <Button
          key={index}
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => onSelect(index)}
          aria-label={`Đi tới slide ${index + 1}`}
          aria-pressed={index === current}
          className={`h-[0.6rem] xsm:h-[0.7rem] w-[0.6rem] xsm:w-[0.7rem] rounded-full p-0 transition-all duration-300 hover:bg-primary/10 ${
            index === current
              ? 'scale-110 bg-primary shadow-[0_0.35rem_0.9rem_rgba(19,143,196,0.35)]'
              : 'bg-primary/25'
          }`}
        />
      ))}
    </div>
  )
}
