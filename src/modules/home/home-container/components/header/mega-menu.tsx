'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

import { NavigationItem } from '../../types/navigation-type'

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
        className='flex items-center gap-[0.25rem] text-[0.875rem] font-medium text-slate-700 transition-colors hover:text-[#0a5c7e] outline-none cursor-pointer'
      >
        {item.label}
        <ChevronDown
          className={`h-[1rem] w-[1rem] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className='fixed left-0 right-0 bg-white shadow-xl border-t border-slate-100 z-50'
          style={{ top: menuTop + 'px' }}
        >
          <div className='mx-auto max-w-7xl px-[1.5rem] xsm:px-[1rem] py-[2rem] xsm:py-[1.5rem]'>
            <div className='grid grid-cols-12 gap-[2rem] xsm:gap-[1rem] items-start'>
              <div className='col-span-3 xsm:col-span-4 pr-[1.5rem] xsm:pr-[1rem] border-r border-slate-500'>
                <div className='flex flex-col gap-[0.25rem]'>
                  {categoriesWithSub.map((cat) => (
                    <button
                      key={cat.label}
                      className={`text-left px-[1rem] xsm:px-[0.75rem] py-[0.75rem] xsm:py-[0.625rem] text-[0.9375rem] xsm:text-[0.8125rem] transition-colors rounded-md cursor-pointer ${
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
                      className='px-[1rem] xsm:px-[0.75rem] py-[0.75rem] xsm:py-[0.625rem] text-[0.9375rem] xsm:text-[0.8125rem] text-slate-700 transition-colors hover:text-[#0a5c7e] rounded-md hover:bg-slate-50 cursor-pointer'
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='col-span-4 xsm:col-span-5 px-[1rem] xsm:px-[0.75rem] border-r border-slate-500 min-h-[18.75rem] xsm:min-h-[15rem]'>
                <div className='flex flex-col gap-[0.875rem] xsm:gap-[0.625rem]'>
                  {activeSubItems?.subItems?.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href || '#'}
                      className='text-[0.9375rem] xsm:text-[0.8125rem] text-slate-700 transition-colors hover:text-[#0a5c7e] cursor-pointer'
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='col-span-5 xsm:col-span-3 pl-[0.75rem] xsm:pl-[0.5rem]'>
                <div className='relative w-[35rem] xsm:w-[12rem] h-[20rem] xsm:h-[12rem] rounded-lg overflow-hidden shadow-sm bg-[#E6F3FA]'>
                  <Image
                    src='/images/mega-menu-image.png'
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
