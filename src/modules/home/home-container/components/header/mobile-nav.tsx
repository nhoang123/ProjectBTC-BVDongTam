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

import { navigationItems } from '../../data/navigation.mock'
import { NavigationItem } from '../../types/navigation.type'

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
          className='h-10 w-10 rounded-full border-slate-200 lg:hidden'
          aria-label='Mở menu'
        >
          <Menu className='h-5 w-5 text-slate-700' />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='flex w-full max-w-[22rem] flex-col justify-between p-0 sm:max-w-[24rem] [&>button]:hidden'
      >
        {!activeCategory ? (
          <div className='flex h-full flex-col justify-between overflow-y-auto px-5 py-6'>
            <div>
              <div className='flex items-center justify-between pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-sky-100'>
                    <Image
                      src='/images/logo-home.png'
                      alt='Bệnh viện Đồng Tâm'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span className='text-base font-extrabold uppercase tracking-tight text-[#0089cf]'>
                    Bệnh viện Đồng Tâm
                  </span>
                </div>
                <SheetClose asChild>
                  <button className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200'>
                    <X className='h-4 w-4' />
                  </button>
                </SheetClose>
              </div>

              <div className='relative my-3'>
                <Search className='absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm dịch vụ...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full rounded-full bg-slate-100/80 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#0089cf]/30'
                />
              </div>

              <div className='mt-2 divide-y divide-slate-100 border-t border-slate-100'>
                {navigationItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0

                  if (hasChildren) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => setActiveCategory(item)}
                        className='flex w-full items-center justify-between py-3.5 text-left font-medium text-slate-800 transition-colors hover:text-[#0089cf]'
                      >
                        <span className='text-[0.9375rem]'>{item.label}</span>
                        <ChevronRight className='h-4 w-4 text-slate-400' />
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
                        className='block py-3.5 text-[0.9375rem] font-medium text-slate-800 transition-colors hover:text-[#0089cf]'
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                })}
              </div>
            </div>

            <div className='mt-6 flex flex-col gap-3 pt-4 border-t border-slate-100'>
              <SheetClose asChild>
                <Link
                  href='#dat-lich'
                  className='flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0089cf] font-semibold text-white shadow-md transition-all hover:bg-[#0073ad]'
                >
                  <Calendar className='h-4 w-4' />
                  <span>Đặt lịch khám</span>
                </Link>
              </SheetClose>

              <a
                href='tel:0946885885'
                className='flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#0089cf] font-semibold text-[#0089cf] transition-all hover:bg-sky-50'
              >
                <Phone className='h-4 w-4' />
                <span>Gọi tổng đài 0946 885 885</span>
              </a>
            </div>
          </div>
        ) : (
          <div className='flex h-full flex-col overflow-y-auto'>
            <div className='sticky top-0 z-10 flex items-center bg-sky-50/90 px-4 py-3.5 backdrop-blur-sm'>
              <button
                onClick={() => setActiveCategory(null)}
                className='flex items-center gap-2 text-sm font-semibold text-[#0089cf] transition-colors hover:text-[#006ba3]'
              >
                <ChevronLeft className='h-5 w-5' />
                <span>{activeCategory.label}</span>
              </button>
            </div>

            <div className='divide-y divide-slate-100 px-4 py-2'>
              {activeCategory.children?.map((subCat) => {
                const hasSubItems = subCat.subItems && subCat.subItems.length > 0
                const isExpanded = expandedSubMenu === subCat.label

                return (
                  <div
                    key={subCat.label}
                    className='py-2.5'
                  >
                    {hasSubItems ? (
                      <>
                        <button
                          onClick={() => toggleSubAccordion(subCat.label)}
                          className='flex w-full items-center justify-between text-left font-semibold text-slate-800 hover:text-[#0089cf]'
                        >
                          <span className='text-[0.9375rem]'>{subCat.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#0089cf]' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className='mt-2.5 flex flex-col gap-2.5 pl-3 border-l-2 border-sky-100'>
                            {subCat.subItems?.map((item) => (
                              <SheetClose
                                key={item.label}
                                asChild
                              >
                                <Link
                                  href={item.href || '#'}
                                  className='text-xs text-slate-600 hover:text-[#0089cf]'
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
