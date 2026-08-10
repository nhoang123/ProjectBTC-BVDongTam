'use client'

import React from 'react'

interface NewsSliderPaginationProps {
  totalDots: number
  itemsPerPage: number
  activeIndex: number
  onSelect: (index: number) => void
}

export const NewsSliderPagination: React.FC<NewsSliderPaginationProps> = ({
  totalDots,
  itemsPerPage,
  activeIndex,
  onSelect,
}) => {
  // Tính tổng số nấc có thể trượt (4 item hiển thị 3 => 2 nấc)
  const maxSteps = Math.max(1, totalDots - itemsPerPage + 1)

  return (
    <div className='mt-[2rem] flex items-center justify-center gap-[0.5rem] xsm:mt-[2.5rem]'>
      {Array.from({ length: maxSteps }).map((_, idx) => {
        const isPageActive = activeIndex === idx

        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`h-[0.25rem] rounded-full transition-all duration-300 ${
              isPageActive ? 'w-[3rem] bg-[#0089cf]' : 'w-[1.25rem] bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide step ${idx + 1}`}
          />
        )
      })}
    </div>
  )
}