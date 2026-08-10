'use client'

import { Phone, Calendar, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { FooterBottomBlock } from './components/FooterBottomBlock'
import { FooterContactInfo } from './components/FooterContactInfo'
import { FooterMapCard } from './components/FooterMapCard'
import { FooterNavColumn } from './components/FooterNavColumn'
import { FooterSloganSocial } from './components/FooterSloganSocial'
import { mockContactInfo, mockNavColumns, mockSocialLinks } from './data/footer.mock'

export const FooterMainContainer: React.FC = () => {
  const [contactData] = useState(mockContactInfo)
  const [navData] = useState(mockNavColumns)
  const [socialData] = useState(mockSocialLinks)

  return (
    <footer className='relative w-full bg-[#0089cf] p-2 sm:p-5 pb-16 lg:pb-5'>
      <div className='relative mx-auto w-full max-w-[96rem] overflow-hidden rounded-[1rem] bg-white px-4 pt-6 pb-4 shadow-2xl sm:px-8 lg:px-9'>
        {/* ================= GIAO DIỆN DESKTOP ================= */}
        <div className='hidden lg:grid relative grid-cols-12 gap-y-0'>
          <div className='pointer-events-none absolute -top-5 -bottom-5 left-[33.333333%] w-[0.1rem] bg-slate-200' />
          <div className='pointer-events-none absolute -left-9 -right-9 top-56 h-[0.1rem] bg-slate-200' />
          <div className='flex flex-col items-center justify-center col-span-4 pt-1 pb-6 pr-8'>
            <div className='relative h-32 w-32'>
              <Image
                src='/images/logo-home.png'
                alt='Logo Bệnh viện Đồng Tâm'
                fill
                priority
                className='object-contain'
              />
            </div>
            <h2 className='mt-1 text-center uppercase tracking-tight text-[#0089cf]'>
              <span className='block text-sm font-bold tracking-widest'>BỆNH VIỆN</span>
              <span className='block text-3xl font-black'>ĐỒNG TÂM</span>
            </h2>
          </div>

          <div className='grid grid-cols-12 items-center gap-6 col-span-8 pt-1 pb-6 pl-8'>
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

          <div className='flex flex-col items-center justify-start col-span-4 pt-8 pr-8'>
            <FooterSloganSocial socials={socialData} />
          </div>

          <div className='relative flex items-center col-span-8 pt-10 pb-2 pl-8'>
            <div className='relative z-10 grid w-full max-w-xl grid-cols-3 gap-6'>
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
        <div className='flex flex-col items-center gap-5 lg:hidden'>
          <div className='flex flex-col items-center justify-center'>
            <div className='relative h-24 w-24'>
              <Image
                src='/images/logo-home.png'
                alt='Logo Bệnh viện Đồng Tâm'
                fill
                priority
                className='object-contain'
              />
            </div>
            <h2 className='mt-1 text-center uppercase tracking-tight text-[#0089cf]'>
              <span className='block text-xs font-bold tracking-widest'>BỆNH VIỆN</span>
              <span className='block text-2xl font-black'>ĐỒNG TÂM</span>
            </h2>
          </div>
          <FooterSloganSocial socials={socialData} />
          <div className='w-full h-[1px] bg-slate-100 my-1' />
          <FooterContactInfo
            data={contactData}
            isMobile={true}
          />

          <div className='w-full mt-2'>
            <FooterMapCard mapUrl={contactData.mapDirectionsUrl} />
          </div>

          <div className='w-full my-2 border-t border-slate-100' />
          <div className='grid w-full grid-cols-2 gap-6 text-left px-2'>
            {navData.map((col) => (
              <FooterNavColumn
                key={col.title}
                column={col}
              />
            ))}
          </div>
        </div>
        <div className='mt-6 border-t border-slate-100 pt-4'>
          <FooterBottomBlock />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-[#0089cf] px-4 py-2.5 text-white shadow-lg lg:hidden'>
        <a
          href={`tel:${contactData.hotline.replace(/\s+/g, '')}`}
          className='flex items-center gap-1.5 text-xs font-semibold'
        >
          <Phone className='h-4 w-4 fill-white' />
          <span>Gọi tổng đài</span>
        </a>
        <span className='h-4 w-[1px] bg-white/40' />
        <a
          href='#lien-he'
          className='flex items-center gap-1.5 text-xs font-semibold'
        >
          <MessageSquare className='h-4 w-4' />
          <span>Liên hệ</span>
        </a>
        <span className='h-4 w-[1px] bg-white/40' />
        <a
          href='#dat-lich'
          className='flex items-center gap-1.5 text-xs font-semibold'
        >
          <Calendar className='h-4 w-4' />
          <span>Đặt lịch khám</span>
        </a>
      </div>
    </footer>
  )
}
