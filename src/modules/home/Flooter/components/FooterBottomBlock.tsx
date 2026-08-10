'use client'

import Link from 'next/link'
import React from 'react'

export const FooterBottomBlock: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:text-sm'>
      {/*Mobile nằm bên dưới (order-2), Desktop nằm bên trái (sm:order-1) */}
      <p className='order-2 text-center text-[0.725rem] sm:order-1 sm:text-left sm:text-xs'>
        Bản quyền © benhviendongtam2026 Bảo lưu mọi quyền
      </p>

      <div className='order-1 flex whitespace-nowrap items-center justify-center gap-1.5 text-[0.7rem] tracking-tight sm:order-2 sm:gap-4 sm:text-xs'>
        <Link
          href='/chinh-sach-bao-mat'
          className='transition-colors hover:text-[#0089cf]'
        >
          Chính sách bảo mật
        </Link>
        <span className='text-slate-300'>|</span>
        <Link
          href='/dieu-khoan-su-dung'
          className='transition-colors hover:text-[#0089cf]'
        >
          Điều khoản sử dụng
        </Link>
        <span className='text-slate-300'>|</span>
        <Link
          href='/quyen-rieng-tu'
          className='transition-colors hover:text-[#0089cf]'
        >
          Quyền riêng tư
        </Link>
      </div>
    </div>
  )
}
