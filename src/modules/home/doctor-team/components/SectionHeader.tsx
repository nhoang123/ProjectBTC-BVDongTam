'use client'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/UI/button'

export const SectionHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-3 bg-[#f1c40f] px-5 py-1.5 rounded-full text-white font-bold text-[1.2rem] uppercase tracking-wide shadow-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>

          Đội ngũ bác sĩ giàu kinh nghiệm
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1991c7] mt-2 tracking-tight">
          NỀN TẢNG CỦA NIỀM TIN
        </h2>
      </div>
      <div className="flex-shrink-0 self-center md:self-end">
        <Button
          variant="outline"
          className="rounded-full border-[#1991c7] text-[#1991c7] hover:bg-[#f1c40f]/20 hover:text-yellow-500 hover:border-[#f1c40f] px-6 h-10 text-sm transition-colors font-medium"
        >
          Xem tất cả <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}