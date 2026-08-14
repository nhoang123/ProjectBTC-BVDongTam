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
    <div className='flex items-center justify-end gap-[0.5rem]'>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#0a5c7e]'
        >
          <Search className='h-[1.25rem] w-[1.25rem]' />
        </button>
      )}

      {isOpen && (
        <div className='flex items-center gap-[0.5rem]'>
          <div className='flex h-[2.75rem] w-[16rem] items-center rounded-full bg-slate-100 px-[1rem] transition-all duration-300'>
            <Search className='mr-[0.5rem] h-[1.25rem] w-[1.25rem] shrink-0 text-slate-500' />
            <input
              ref={inputRef}
              type='text'
              placeholder='Tìm kiếm dịch vụ...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full bg-transparent text-[0.9375rem] text-slate-700 placeholder:text-slate-400 outline-none'
            />
          </div>

          <button
            onClick={handleClose}
            className='flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700'
          >
            <X className='h-[1.25rem] w-[1.25rem]' />
          </button>
        </div>
      )}
    </div>
  )
}
