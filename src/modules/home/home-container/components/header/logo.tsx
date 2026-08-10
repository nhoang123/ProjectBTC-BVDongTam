import Image from 'next/image'

export function Logo() {
  return (
    <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
      <div className='relative h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 overflow-hidden rounded-full bg-[#0a5c7e]/10 ring-1 ring-[#0a5c7e]/10'>
        <Image
          src='/images/logo-home.png'
          alt='Bệnh viện Đồng Tâm'
          fill
          className='object-cover object-bottom'
          priority
        />
      </div>

      <div className='leading-tight'>
        <div className='whitespace-nowrap text-base font-bold tracking-tight text-[#0897d8] sm:text-lg lg:text-[1.5rem]'>
          BỆNH VIỆN ĐỒNG TÂM
        </div>
      </div>
    </div>
  )
}
