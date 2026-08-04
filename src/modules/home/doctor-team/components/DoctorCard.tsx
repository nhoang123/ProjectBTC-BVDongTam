import { Check, ArrowRight, BriefcaseMedical } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/UI/button'

import { Doctor } from '../data/mockDoctors'

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const cardConfig = {
    bgSquare: {
      top: 'top-[42%]',
      bottom: 'bottom-[8%]',
      left: 'left-[2%]',
      right: 'right-[2%]',
      rounded: 'rounded-[16px]',
    },
    avatar: {
      top: '-top-[5%]',
      bottom: 'bottom-6',
      width: 'w-[100%]',
    },
  }

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-[16px] border border-[#dbe8f4] bg-white shadow-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgba(15,59,94,0.14)]">
      <div className="absolute inset-0 z-0">
        <Image
          src={
            doctor.bgImage ||
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'
          }
          alt="Background"
          fill
          className="object-cover opacity-85 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 lg:p-6">
        <div className="grid flex-1 grid-cols-12 gap-3 items-start lg:gap-4">
          <div className="col-span-5 relative flex min-h-[220px] h-full items-center justify-center sm:min-h-[250px]">
            <div
              className={`absolute z-0 bg-white/10 backdrop-blur-xs border-2 border-white shadow-[0_8px_24px_rgba(15,59,94,0.12)] ${cardConfig.bgSquare.top} ${cardConfig.bgSquare.bottom} ${cardConfig.bgSquare.left} ${cardConfig.bgSquare.right} ${cardConfig.bgSquare.rounded}`}
            />

            <div
              className={`absolute z-10 ${cardConfig.avatar.top} ${cardConfig.avatar.bottom} ${cardConfig.avatar.width} left-1/2 -translate-x-1/2 pointer-events-none`}
            >
              <Image
                src={doctor.avatar}
                alt={doctor.name}
                fill
                className="object-contain object-bottom drop-shadow-md"
                sizes="(max-width: 768px) 180px, 240px"
                priority
              />
            </div>
          </div>
          <div className="col-span-7 flex flex-col gap-2.5 sm:gap-3">
            <div className="flex justify-end">
              <div
                className={`inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-1.5 shadow-sm ${
                  doctor.specialtyColor ?? 'bg-[#F4C542]'
                }`}
              >
                <BriefcaseMedical className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap text-[11px] font-extrabold uppercase tracking-wider text-white sm:text-[12px] md:text-[13px]">
                  {doctor.specialty}
                </span>
              </div>
            </div>

            <div className="w-full rounded-[10px] bg-gradient-to-r from-[#134a9b] to-[#1b91c7] px-3 py-2.5 text-center shadow-md">
              <h3 className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-tight text-white sm:text-[14px] md:text-[15px] lg:text-[16px]">
                {doctor.name}
              </h3>
              <p className="mt-0.5 whitespace-nowrap text-[10.5px] font-medium text-[#DCEBFF] sm:text-[11.5px] md:text-[12.5px]">
                {doctor.title}
              </p>
            </div>

            <div className="my-0.25 flex w-full flex-col text-center leading-tight">
              <span className="text-[16px] font-black tracking-tight text-[#0B3559] uppercase sm:text-[19px] lg:text-[21px]">
                GẦN {doctor.yearsOfExperience} NĂM
              </span>
              <span className="text-[16px] font-black tracking-tight text-[#0B3559] uppercase sm:text-[19px] lg:text-[21px]">
                KINH NGHIỆM
              </span>
            </div>

            <div className="group/scroll max-h-[115px] overflow-y-auto space-y-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden hover:[scrollbar-width:auto] hover:[&::-webkit-scrollbar]:block blue-custom-scrollbar">
              {doctor.achievements.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#D8F6E9] sm:h-4 sm:w-4">
                    <Check
                      className="h-2.5 w-2.5 text-[#14B86A] sm:h-3 sm:w-3"
                      strokeWidth={3}
                    />
                  </div>
                  <p className="text-[11.5px] leading-snug text-[#173B56] sm:text-[12.5px] lg:text-[13px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Button
            variant="outline"
            className="h-9 w-full max-w-[230px] rounded-full border border-[#C7E3F4] bg-white text-[12px] font-bold text-[#1177CC] shadow-sm hover:bg-[#1177CC] hover:text-white sm:h-9.5 sm:text-[13px]"
          >
            Xem chi tiết
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard