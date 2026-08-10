'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className='flex items-center justify-end gap-1.5 xsm:gap-2'>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='flex h-[2.5rem] xsm:h-[2.75rem] w-[2.5rem] xsm:w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#0a5c7e]'
        >
          <Search className='h-5 w-5' />
        </button>
      )}

      {isOpen && (
        <div className='flex items-center gap-1.5 xsm:gap-2'>
          <div className='flex h-[2.5rem] xsm:h-[2.75rem] w-48 xsm:w-56 sm:w-64 items-center rounded-full bg-slate-100 px-3 xsm:px-4 transition-all duration-300'>
            <Search className='mr-2 h-5 w-5 shrink-0 text-slate-500' />
            <input
              ref={inputRef}
              type='text'
              placeholder='Tìm kiếm dịch vụ...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full bg-transparent text-[0.875rem] xsm:text-[0.9375rem] text-slate-700 placeholder:text-slate-400 outline-none'
            />
          </div>

          <button
            onClick={handleClose}
            className='flex h-[2.5rem] xsm:h-[2.75rem] w-[2.5rem] xsm:w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
      )}
    </div>
  )
}
