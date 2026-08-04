'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/UI/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/UI/sheet'

import { navigationItems } from '../../data/navigation.mock'

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='h-11 w-11 rounded-full lg:hidden'
        >
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='w-[20rem] p-0'
      >
        <SheetHeader className='border-b p-6 text-left'>
          <SheetTitle className='text-[#0a5c7e]'>Bệnh viện Đồng Tâm</SheetTitle>
        </SheetHeader>

        <div className='flex flex-col p-4'>
          {navigationItems.map((item) => (
            <div
              key={item.label}
              className='border-b border-slate-100 py-3'
            >
              <Link
                href={item.href}
                className='block text-[1rem] font-medium text-slate-700 hover:text-[#0a5c7e]'
              >
                {item.label}
              </Link>

              {item.children && (
                <div className='mt-2 ml-3 flex flex-col gap-2'>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className='text-[0.9375rem] text-slate-500 hover:text-[#0a5c7e]'
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}