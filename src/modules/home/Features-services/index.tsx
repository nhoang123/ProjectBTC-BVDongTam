'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

import { mockServicesData } from '@/modules/home/Features-services/data/mockServices'
import { ServiceItemType } from '@/modules/home/Features-services/types/service.type'

import { ServiceFooter } from './components/ServiceFooter'
import { ServiceHeaderBanner } from './components/ServiceHeaderBanner'
import { ServiceItem } from './components/ServiceItem'

export const FeaturedServicesSection: React.FC = () => {
  const [services] = useState<ServiceItemType[]>(mockServicesData)
  const [activeMobileIndex, setActiveMobileIndex] = useState(0)

  const handlePrevMobile = () => {
    setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1))
  }

  const handleNextMobile = () => {
    setActiveMobileIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0))
  }

  return (
    <section className='w-full bg-white py-[2rem] lg:py-[5rem]'>
      <div className='mx-auto w-full max-w-[93rem] px-[1rem] sm:px-[2rem] lg:px-[2.5rem]'>
        <ServiceHeaderBanner />

        {/* ==================== DESKTOP LIST ==================== */}
        <div className='hidden lg:flex mt-[2.5rem] flex-col'>
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              isLast={index === services.length - 1}
            />
          ))}
        </div>

        {/* ==================== MOBILE SLIDER ==================== */}
        <div className='block lg:hidden mt-4'>
          {services[activeMobileIndex] && (
            <ServiceItem
              service={services[activeMobileIndex]}
              isLast={true}
            />
          )}

          <div className='mt-5 flex items-center justify-between px-1'>
            <div className='flex items-center gap-1.5'>
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx ? 'w-8 bg-[#0089cf]' : 'w-3.5 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={handlePrevMobile}
                className='flex h-9 w-9 items-center justify-center rounded-full border border-[#0089cf] text-[#0089cf] transition-colors active:bg-[#0089cf] active:text-white'
                aria-label='Previous service'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                onClick={handleNextMobile}
                className='flex h-9 w-9 items-center justify-center rounded-full border border-[#0089cf] text-[#0089cf] transition-colors active:bg-[#0089cf] active:text-white'
                aria-label='Next service'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='mt-6 flex justify-center'>
            <ServiceFooter />
          </div>
        </div>

        <div className='hidden lg:block'>
          <ServiceFooter />
        </div>
      </div>
    </section>
  )
}

export default FeaturedServicesSection
