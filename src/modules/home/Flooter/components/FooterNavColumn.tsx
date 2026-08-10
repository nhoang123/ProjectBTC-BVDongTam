'use client'

import Link from 'next/link'
import React from 'react'

import { NavColumnData } from '../types/footer.type'

interface FooterNavColumnProps {
  column: NavColumnData
}

export const FooterNavColumn: React.FC<FooterNavColumnProps> = ({ column }) => {
  return (
    <div className='flex flex-col gap-3'>
      <h3 className='text-sm font-extrabold uppercase tracking-tight text-slate-800'>
        {column.title}
      </h3>

      <ul className='flex flex-col gap-2'>
        {column.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className='text-xs font-normal text-slate-600 transition-colors duration-200 hover:text-[#0089cf]'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
