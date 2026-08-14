'use client'

import Link from 'next/link'
import React from 'react'

import { NavColumnData } from '../types/footer-type'

interface FooterNavColumnProps {
  column: NavColumnData
}

export const FooterNavColumn: React.FC<FooterNavColumnProps> = ({ column }) => {
  return (
    <div className='flex flex-col gap-[0.75rem]'>
      <h3 className='text-[0.875rem] font-extrabold uppercase tracking-tight text-slate-800'>
        {column.title}
      </h3>

      <ul className='flex flex-col gap-[0.5rem]'>
        {column.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className='text-[0.75rem] font-normal text-slate-600 transition-colors duration-200 hover:text-[#0089cf]'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
