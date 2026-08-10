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
  const numberOfPages = Math.ceil(totalDots / itemsPerPage)

  return (
    <div className='mt-[2rem] flex items-center justify-center gap-[0.5rem] xsm:mt-[2.5rem]'>
      {Array.from({ length: numberOfPages }).map((_, idx) => {
        const isPageActive =
          activeIndex >= idx * itemsPerPage && activeIndex < (idx + 1) * itemsPerPage

        return (
          <button
            key={idx}
            onClick={() => onSelect(idx * itemsPerPage)}
            className={`h-[0.25rem] rounded-full transition-all duration-300 ${
              isPageActive ? 'w-[3rem] bg-[#0089cf]' : 'w-[1.25rem] bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide page ${idx + 1}`}
          />
        )
      })}
    </div>
  )
}
