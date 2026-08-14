'use client'

import Link from 'next/link'
import React from 'react'

export const FooterBottomBlock: React.FC = () => {
  return (
    <div className='flex flex-row items-center justify-between gap-[1rem] text-[0.75rem] text-slate-500 xsm:flex-col xsm:gap-[0.75rem] xsm:text-center'>
      {/* Desktop nằm bên trái, Mobile nằm bên dưới (order-2) */}
      <p className='text-left text-[0.725rem] xsm:order-2 xsm:text-center'>
        Bản quyền © benhviendongtam2026 Bảo lưu mọi quyền
      </p>

      <div className='flex flex-row items-center justify-center gap-[1rem] text-[0.7rem] tracking-tight xsm:order-1 xsm:gap-[0.375rem]'>
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
