'use client'

interface PaginationProps {
  total: number
  activeIndex: number
}

export const DoctorPagination = ({ total, activeIndex }: PaginationProps) => {
  return (
    <div className='flex items-center gap-[0.5rem]'>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-[0.375rem] rounded-full transition-all duration-500 ease-out ${
            index === activeIndex ? 'w-[2rem] bg-[#1A5D8F]' : 'w-[0.375rem] bg-[#C9D7E4]'
          }`}
        />
      ))}
    </div>
  )
}