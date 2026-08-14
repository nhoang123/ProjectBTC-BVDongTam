'use client'

import {
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Calendar,
  Phone,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/UI/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/UI/sheet'

import { navigationItems } from '../../data/navigation-mock'
import { NavigationItem } from '../../types/navigation-type'

export function MobileNav() {
  const [activeCategory, setActiveCategory] = useState<NavigationItem | null>(null)
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>('Trung tâm Hỗ trợ sinh sản')
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActiveCategory(null)
      setSearchQuery('')
    }
  }

  const toggleSubAccordion = (title: string) => {
    setExpandedSubMenu((prev) => (prev === title ? null : title))
  }

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='h-[2.5rem] w-[2.5rem] rounded-full border-slate-200'
          aria-label='Mở menu'
        >
          <Menu className='h-[1.25rem] w-[1.25rem] text-slate-700' />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='flex w-full max-w-[22rem] flex-col justify-between p-[0px] [&>button]:hidden'
      >
        {!activeCategory ? (
          <div className='flex h-full flex-col justify-between overflow-y-auto px-[1.25rem] py-[1.5rem]'>
            <div>
              <div className='flex items-center justify-between pb-[1rem]'>
                <div className='flex items-center gap-[0.5rem]'>
                  <div className='relative h-[2.25rem] w-[2.25rem] shrink-0 overflow-hidden rounded-full border border-sky-100'>
                    <Image
                      src='/images/logo-home.png'
                      alt='Bệnh viện Đồng Tâm'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span className='text-[1rem] font-extrabold uppercase tracking-tight text-[#0089cf]'>
                    Bệnh viện Đồng Tâm
                  </span>
                </div>
                <SheetClose asChild>
                  <button className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200'>
                    <X className='h-[1rem] w-[1rem]' />
                  </button>
                </SheetClose>
              </div>

              <div className='relative my-[0.75rem]'>
                <Search className='absolute left-[0.875rem] top-1/2 h-[1rem] w-[1rem] -translate-y-1/2 text-slate-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm dịch vụ...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full rounded-full bg-slate-100/80 py-[0.625rem] pl-[2.5rem] pr-[1rem] text-[0.875rem] text-slate-700 placeholder-slate-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0089cf]/30'
                />
              </div>

              <div className='mt-[0.5rem] divide-y divide-slate-100 border-t border-slate-100'>
                {navigationItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0

                  if (hasChildren) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => setActiveCategory(item)}
                        className='flex w-full items-center justify-between py-[0.875rem] text-left font-medium text-slate-800 transition-colors hover:text-[#0089cf]'
                      >
                        <span className='text-[0.9375rem]'>{item.label}</span>
                        <ChevronRight className='h-[1rem] w-[1rem] text-slate-400' />
                      </button>
                    )
                  }

                  return (
                    <SheetClose
                      key={item.label}
                      asChild
                    >
                      <Link
                        href={item.href || '#'}
                        className='block py-[0.875rem] text-[0.9375rem] font-medium text-slate-800 transition-colors hover:text-[#0089cf]'
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                })}
              </div>
            </div>

            <div className='mt-[1.5rem] flex flex-col gap-[0.75rem] pt-[1rem] border-t border-slate-100'>
              <SheetClose asChild>
                <Link
                  href='#dat-lich'
                  className='flex h-[2.75rem] w-full items-center justify-center gap-[0.5rem] rounded-full bg-[#0089cf] font-semibold text-white shadow-md transition-all hover:bg-[#0073ad]'
                >
                  <Calendar className='h-[1rem] w-[1rem]' />
                  <span>Đặt lịch khám</span>
                </Link>
              </SheetClose>

              <a
                href='tel:0946885885'
                className='flex h-[2.75rem] w-full items-center justify-center gap-[0.5rem] rounded-full border border-[#0089cf] font-semibold text-[#0089cf] transition-all hover:bg-sky-50'
              >
                <Phone className='h-[1rem] w-[1rem]' />
                <span>Gọi tổng đài 0946 885 885</span>
              </a>
            </div>
          </div>
        ) : (
          <div className='flex h-full flex-col overflow-y-auto'>
            <div className='sticky top-0 z-10 flex items-center bg-sky-50/90 px-[1rem] py-[0.875rem] backdrop-blur-sm'>
              <button
                onClick={() => setActiveCategory(null)}
                className='flex items-center gap-[0.5rem] text-[0.875rem] font-semibold text-[#0089cf] transition-colors hover:text-[#006ba3]'
              >
                <ChevronLeft className='h-[1.25rem] w-[1.25rem]' />
                <span>{activeCategory.label}</span>
              </button>
            </div>

            <div className='divide-y divide-slate-100 px-[1rem] py-[0.5rem]'>
              {activeCategory.children?.map((subCat) => {
                const hasSubItems = subCat.subItems && subCat.subItems.length > 0
                const isExpanded = expandedSubMenu === subCat.label

                return (
                  <div
                    key={subCat.label}
                    className='py-[0.625rem]'
                  >
                    {hasSubItems ? (
                      <>
                        <button
                          onClick={() => toggleSubAccordion(subCat.label)}
                          className='flex w-full items-center justify-between text-left font-semibold text-slate-800 hover:text-[#0089cf]'
                        >
                          <span className='text-[0.9375rem]'>{subCat.label}</span>
                          <ChevronDown
                            className={`h-[1rem] w-[1rem] text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#0089cf]' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className='mt-[0.625rem] flex flex-col gap-[0.625rem] pl-[0.75rem] border-l-2 border-sky-100'>
                            {subCat.subItems?.map((item) => (
                              <SheetClose
                                key={item.label}
                                asChild
                              >
                                <Link
                                  href={item.href || '#'}
                                  className='text-[0.75rem] text-slate-600 hover:text-[#0089cf]'
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href={subCat.href || '#'}
                          className='block text-[0.9375rem] font-semibold text-slate-800 hover:text-[#0089cf]'
                        >
                          {subCat.label}
                        </Link>
                      </SheetClose>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
