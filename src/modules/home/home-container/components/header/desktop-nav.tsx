import Link from 'next/link'

import { navigationItems } from '../../data/navigation-mock'

import { MegaMenu } from './mega-menu'

export function DesktopNav() {
  return (
    <nav className='xsm:hidden flex items-center gap-[3.6rem] h-full'>
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
              <span className='flex items-center gap-[0.25rem] text-[0.875rem] font-medium text-slate-700 transition-colors group-hover:text-[#0a5c7e] outline-none cursor-pointer'>
                {item.label}
              </span>
              <div className='absolute top-full left-0 mt-[0.5rem] hidden group-hover:block bg-white shadow-md border rounded-[0.25rem] p-[0.5rem] min-w-[11.25rem] z-50'>
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className='block px-[1rem] py-[0.5rem] text-[0.875rem] hover:bg-slate-50 cursor-pointer'
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
            className='text-[0.875rem] font-medium text-slate-700 transition-colors hover:text-[#0a5c7e] cursor-pointer'
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
