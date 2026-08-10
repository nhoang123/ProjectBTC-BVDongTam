import Image from 'next/image'

type Props = {
  doctorImage: string
  motherImage: string
}

export function HeroImages({ doctorImage, motherImage }: Props) {
  return (
    <>
      <div className='absolute left-0 bottom-0 hidden h-full w-[20%] xsm:w-[22%] sm:w-[24%] md:w-[26%] items-end lg:flex'>
        <div className='relative h-[80%] xsm:h-[83%] sm:h-[85%] w-full'>
          <Image
            src={doctorImage}
            alt='Bác sĩ tư vấn'
            fill
            className='object-contain object-bottom-left'
            priority
          />
        </div>
      </div>

      <div className='absolute right-0 bottom-0 hidden h-full w-[26%] xsm:w-[28%] sm:w-[30%] md:w-[32%] items-end justify-end lg:flex'>
        <div className='relative h-[84%] xsm:h-[86%] sm:h-[88%] w-full'>
          <Image
            src={motherImage}
            alt='Mẹ và bé'
            fill
            className='object-contain object-bottom-right'
            priority
          />
        </div>
      </div>

      <div className='relative mx-auto mb-4 xsm:mb-6 h-40 xsm:h-48 sm:h-56 w-40 xsm:w-48 sm:w-56 lg:hidden'>
        <Image
          src={motherImage}
          alt='Mẹ và bé'
          fill
          className='object-contain'
          priority
        />
      </div>
    </>
  )
}
