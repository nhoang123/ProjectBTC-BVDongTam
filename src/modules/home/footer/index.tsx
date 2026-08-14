'use client'

import { Phone, Calendar, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { FooterBottomBlock } from './components/footer-bottom-block'
import { FooterContactInfo } from './components/footer-contact-info'
import { FooterMapCard } from './components/footer-map-card'
import { FooterNavColumn } from './components/footer-nav-column'
import { FooterSloganSocial } from './components/footer-slogan-social'
import { mockContactInfo, mockNavColumns } from './data/footer-mock'

export const FooterMainContainer: React.FC = () => {
  const [contactData] = useState(mockContactInfo)
  const [navData] = useState(mockNavColumns)

  return (
    <footer className='relative w-full bg-[#0089cf] p-[1.25rem] xsm:p-[0.5rem] xsm:pb-[4rem]'>
      <div className='relative mx-auto w-full max-w-[96rem] overflow-hidden rounded-[1rem] bg-white px-[2.25rem] pt-[1.5rem] pb-[1rem] shadow-2xl xsm:px-[1rem]'>
        {/* ================= GIAO DIỆN DESKTOP ================= */}
        <div className='grid xsm:hidden relative grid-cols-12 gap-y-0'>
          <div className='pointer-events-none absolute -top-[1.25rem] -bottom-[1.25rem] left-[33.333333%] w-[0.125rem] bg-slate-200' />
          <div className='pointer-events-none absolute -left-[2.25rem] -right-[2.25rem] top-[13.5rem] h-[0.125rem] bg-slate-200' />
          <div className='flex flex-col items-center justify-center col-span-4 pt-[0.25rem] pb-[1.5rem] pr-[2rem]'>
            <div className='relative h-[8rem] w-[8rem]'>
              <Image
                src='/images/logo-home.png'
                alt='Logo Bệnh viện Đồng Tâm'
                fill
                priority
                className='object-contain'
              />
            </div>
            <h2 className='mt-[0.25rem] text-center uppercase tracking-tight text-[#0089cf]'>
              <span className='block text-[0.875rem] font-bold tracking-widest'>BỆNH VIỆN</span>
              <span className='block text-[1.875rem] font-black'>ĐỒNG TÂM</span>
            </h2>
          </div>

          <div className='grid grid-cols-12 items-center gap-[1.5rem] col-span-8 pt-[0.25rem] pb-[1.5rem] pl-[2rem]'>
            <div className='col-span-7'>
              <FooterContactInfo
                data={contactData}
                isMobile={false}
              />
            </div>
            <div className='col-span-5'>
              <FooterMapCard mapUrl={contactData.mapDirectionsUrl} />
            </div>
          </div>

          <div className='flex flex-col items-center justify-start col-span-4 pt-[2rem] pr-[2rem]'>
            <FooterSloganSocial />
          </div>

          <div className='relative flex items-center col-span-8 pt-[2.5rem] pb-[0.5rem] pl-[2rem]'>
            <div className='relative z-10 grid w-full max-w-[36rem] grid-cols-3 gap-[1.5rem]'>
              {navData.map((col) => (
                <FooterNavColumn
                  key={col.title}
                  column={col}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= GIAO DIỆN MOBILE ================= */}
        <div className='hidden xsm:flex flex-col items-center gap-[1.25rem]'>
          <div className='flex flex-col items-center justify-center'>
            <div className='relative h-[6rem] w-[6rem]'>
              <Image
                src='/images/logo-home.png'
                alt='Logo Bệnh viện Đồng Tâm'
                fill
                priority
                className='object-contain'
              />
            </div>
            <h2 className='mt-[0.25rem] text-center uppercase tracking-tight text-[#0089cf]'>
              <span className='block text-[0.75rem] font-bold tracking-widest'>BỆNH VIỆN</span>
              <span className='block text-[1.5rem] font-black'>ĐỒNG TÂM</span>
            </h2>
          </div>
          <FooterSloganSocial />
          <div className='w-full h-[0.0625rem] bg-slate-100 my-[0.25rem]' />
          <FooterContactInfo
            data={contactData}
            isMobile={true}
          />
          <div className='w-full mt-[0.5rem]'>
            <FooterMapCard mapUrl={contactData.mapDirectionsUrl} />
          </div>
          <div className='w-full my-[0.5rem] border-t border-slate-100' />
          <div className='grid w-full grid-cols-2 gap-[1.5rem] text-left px-[0.5rem]'>
            {navData.map((col) => (
              <FooterNavColumn
                key={col.title}
                column={col}
              />
            ))}
          </div>
        </div>
        <div className='mt-[1.5rem] border-t border-slate-100 pt-[1rem]'>
          <FooterBottomBlock />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className='hidden xsm:flex fixed bottom-0 left-0 right-0 z-50 items-center justify-between bg-[#0089cf] px-[1rem] py-[0.625rem] text-white shadow-lg'>
        <a
          href={`tel:${contactData.hotline.replace(/\s+/g, '')}`}
          className='flex items-center gap-[0.375rem] text-[0.75rem] font-semibold'
        >
          <Phone className='h-[1rem] w-[1rem] fill-white' />
          <span>Gọi tổng đài</span>
        </a>
        <span className='h-[1rem] w-[0.0625rem] bg-white/40' />
        <a
          href='#lien-he'
          className='flex items-center gap-[0.375rem] text-[0.75rem] font-semibold'
        >
          <MessageSquare className='h-[1rem] w-[1rem]' />
          <span>Liên hệ</span>
        </a>
        <span className='h-[1rem] w-[0.0625rem] bg-white/40' />
        <a
          href='#dat-lich'
          className='flex items-center gap-[0.375rem] text-[0.75rem] font-semibold'
        >
          <Calendar className='h-[1rem] w-[1rem]' />
          <span>Đặt lịch khám</span>
        </a>
      </div>
    </footer>
  )
}
