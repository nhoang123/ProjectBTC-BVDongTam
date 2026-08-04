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
    item.children?.find((c) => c.subItems)?.label || '')
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
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className='fixed left-0 right-0 bg-white shadow-xl border-t border-slate-100 z-50'
          style={{ top: menuTop + 'px' }}
        >
          <div className='mx-auto max-w-container px-16 xsm:px-16 sm:px-20 lg:px-24 py-10 mb-8'>
            <div className='flex'>
              <div className='w-[330px] shrink-0 grow-0 pr-10 border-r border-slate-100'>
                <div className='flex flex-col gap-1'>
                  {categoriesWithSub.map((cat) => (
                    <button
                      key={cat.label}
                      className={`text-left px-4 py-3 text-[0.9375rem] transition-colors rounded-sm whitespace-nowrap ${
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
                      className='px-4 py-3 text-[0.9375rem] text-slate-700 transition-colors hover:text-[#0a5c7e] rounded-sm hover:bg-slate-50 whitespace-nowrap'
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='w-[460px] shrink-0 grow-0 px-10 border-r border-slate-100'>
                <div className='flex flex-col gap-4'>
                  {activeSubItems?.subItems?.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href || '#'}
                      className='text-[0.9375rem] text-slate-700 transition-colors hover:text-[#0a5c7e] whitespace-nowrap'
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex-1 shrink-0 pl-6'>
                <div className='relative w-full h-[420px] shadow-sm bg-[#E6F3FA]'>
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