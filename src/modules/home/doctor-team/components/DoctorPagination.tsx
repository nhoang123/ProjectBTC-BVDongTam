'use client'

interface PaginationProps {
  total: number;
  activeIndex: number;
}

export const DoctorPagination = ({ total, activeIndex }: PaginationProps) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
            index === activeIndex ? 'w-10 bg-[#1A5D8F]' : 'w-2 bg-[#C9D7E4]'
          }`}
        />
      ))}
    </div>
  )
}