import Image from 'next/image'

export function Logo() {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative h-12 w-12 overflow-hidden rounded-full bg-[#0a5c7e]/10 ring-1 ring-[#0a5c7e]/10'>
        <Image
          src='/images/logo-home.png'
          alt='Bệnh viện Đồng Tâm'
          fill
          className='object-cover object-bottom'
          priority
        />
      </div>

      <div className='leading-tight'>
        <div className='text-[1.25rem] font-bold tracking-tight text-[#0897d8] lg:text-[1.5rem]'>
          BỆNH VIỆN ĐỒNG TÂM
        </div>
      </div>
    </div>
  )
}