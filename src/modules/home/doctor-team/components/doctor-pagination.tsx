'use client'

interface PaginationProps {
  total: number
  activeIndex: number
  onClick?: (index: number) => void
}

export const DoctorPagination = ({ total, activeIndex, onClick }: PaginationProps) => {
  return (
    <div className='flex items-center gap-[0.5rem]'>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick?.(index)}
          className={`h-[0.375rem] rounded-full transition-all duration-500 ease-out cursor-pointer ${
            index === activeIndex
              ? 'w-[2rem] bg-[#1A5D8F] shadow-[0_0_8px_rgba(26,93,143,0.4)]'
              : 'w-[0.375rem] bg-[#C9D7E4] hover:bg-[#A0B8CC] hover:scale-125'
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  )
}