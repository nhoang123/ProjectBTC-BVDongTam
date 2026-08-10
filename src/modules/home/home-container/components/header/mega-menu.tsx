'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

import { NavigationItem } from '../../types/navigation.type'

type MegaMenuProps = {
  item: NavigationItem
}

export function MegaMenu({ item }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>(
    item.children?.find((c) => c.subItems)?.label || '',
  )
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [menuTop, setMenuTop] = useState(0)

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuTop(rect.bottom)
    }
  }, [isOpen])

  if (!item.children) return null

  const categoriesWithSub = item.children.filter((c) => c.subItems)
  const otherCategories = item.children.filter((c) => !c.subItems)
  const activeSubItems = categoriesWithSub.find((c) => c.label === activeCategory)

  return (
    <div
      className='relative h-full flex items-center'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false)
        const first = item.children?.find((c) => c.subItems)
        setActiveCategory(first?.label || '')
      }}
    >
      <button
        ref={triggerRef}
        className='flex items-center gap-1 text-[0.9375rem] font-medium text-slate-700 transition-colors hover:text-[#0a5c7e] outline-none'
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className='fixed left-0 right-0 bg-white shadow-xl border-t border-slate-100 z-50'
          style={{ top: menuTop + 'px' }}
        >
          <div className='mx-auto max-w-7xl px-6 lg:px-10 py-8'>
            <div className='grid grid-cols-12 gap-8 items-start'>
              <div className='col-span-3 pr-6 border-r border-slate-100'>
                <div className='flex flex-col gap-1'>
                  {categoriesWithSub.map((cat) => (
                    <button
                      key={cat.label}
                      className={`text-left px-4 py-3 text-[0.9375rem] transition-colors rounded-md ${
                        activeCategory === cat.label
                          ? 'bg-[#EAF5F9] text-[#0a5c7e] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0a5c7e]'
                      }`}
                      onMouseEnter={() => setActiveCategory(cat.label)}
                    >
                      {cat.label}
                    </button>
                  ))}
                  {otherCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href || '#'}
                      className='px-4 py-3 text-[0.9375rem] text-slate-700 transition-colors hover:text-[#0a5c7e] rounded-md hover:bg-slate-50'
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='col-span-4 px-4 border-r border-slate-100 min-h-[18.75rem]'>
                <div className='flex flex-col gap-3.5'>
                  {activeSubItems?.subItems?.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href || '#'}
                      className='text-[0.9375rem] text-slate-700 transition-colors hover:text-[#0a5c7e]'
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='col-span-5 pl-3'>
                <div className='relative w-[35rem] h-[20rem] rounded-lg overflow-hidden shadow-sm bg-[#E6F3FA]'>
                  <Image
                    src='/images/image.png'
                    alt='Dịch vụ Bệnh viện Đồng Tâm'
                    fill
                    className='object-cover object-center'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
