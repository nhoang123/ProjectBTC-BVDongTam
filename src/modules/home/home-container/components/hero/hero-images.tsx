import Image from 'next/image'

type Props = {
  doctorImage: string
  motherImage: string
}

export function HeroImages({ doctorImage, motherImage }: Props) {
  return (
    <>
      <div className='absolute left-0 bottom-0 hidden h-full w-[26%] items-end lg:flex'>
        <div className='relative h-[85%] w-full'>
          <Image
            src={doctorImage}
            alt='Bác sĩ tư vấn'
            fill
            className='object-contain object-bottom-left'
            priority
          />
        </div>
      </div>

      <div className='absolute right-0 bottom-0 hidden h-full w-[32%] items-end justify-end lg:flex'>
        <div className='relative h-[88%] w-full'>
          <Image
            src={motherImage}
            alt='Mẹ và bé'
            fill
            className='object-contain object-bottom-right'
            priority
          />
        </div>
      </div>

      <div className='relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56 lg:hidden'>
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
