import Link from 'next/link'

import { navigationItems } from '../../data/navigation.mock'

import { MegaMenu } from './mega-menu'

export function DesktopNav() {
  return (
    <nav className='hidden lg:flex items-center gap-8 h-full'>
      {navigationItems.map((item) => {
        const hasMegaMenu = item.children && item.children.some((c: any) => c.subItems)

        if (hasMegaMenu) {
          return (
            <MegaMenu
              key={item.label}
              item={item}
            />
          )
        }
        if (item.children) {
          return (
            <div
              key={item.label}
              className='relative h-full flex items-center group'
            >
              <span className='flex items-center gap-1 text-[0.9375rem] font-medium text-slate-700 transition-colors group-hover:text-[#0a5c7e] outline-none cursor-pointer'>
                {item.label}
              </span>
              <div className='absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-md border rounded-sm p-2 min-w-[11.25rem] z-50'>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className='block px-4 py-2 text-sm hover:bg-slate-50'
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className='text-[0.9375rem] font-medium text-slate-700 transition-colors hover:text-[#0a5c7e]'
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
