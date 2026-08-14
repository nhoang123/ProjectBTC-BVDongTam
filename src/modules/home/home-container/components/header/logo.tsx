import Image from 'next/image'

export function Logo() {
  return (
    <div className='flex items-center gap-[1.5rem] xsm:gap-[0.5rem] shrink-0'>
      <div className='relative h-[4rem] w-[4rem] xsm:h-[2.25rem] xsm:w-[2.25rem] shrink-0 overflow-hidden rounded-full bg-[#0a5c7e]/10 ring-1 ring-[#0a5c7e]/10'>
        <Image
          src='/images/logo-home.png'
          alt='Bệnh viện Đồng Tâm'
          fill
          className='object-cover object-bottom'
          priority
        />
      </div>

      <div className='leading-tight'>
        <div className='whitespace-nowrap text-[1.5rem] font-bold tracking-tight text-[#0897d8] xsm:text-[0.875rem]'>
          BỆNH VIỆN ĐỒNG TÂM
        </div>
      </div>
    </div>
  )
}
