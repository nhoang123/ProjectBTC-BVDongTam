import Image from 'next/image'

type Props = {
  doctorImage: string
  motherImage: string
}

export function HeroImages({ doctorImage, motherImage }: Props) {
  return (
    <>
      <div className='absolute left-0 bottom-0 flex h-[30rem] w-[19.8rem] items-end xsm:hidden'>
        <div className='relative h-[22.5rem] w-[19.8rem]'>
          <Image
            src={doctorImage}
            alt='Bác sĩ tư vấn'
            fill
            className='object-contain object-bottom-left'
            priority
          />
        </div>
      </div>
      <div className='absolute right-0 bottom-0 flex h-[30rem] w-[25.2rem] items-end justify-end xsm:hidden'>
        <div className='relative h-[23.4rem] w-[25.2rem]'>
          <Image
            src={motherImage}
            alt='Mẹ và bé'
            fill
            className='object-contain object-bottom-right'
            priority
          />
        </div>
      </div>
      <div className='hidden justify-center items-center xsm:flex'>
        <div className='relative w-[14rem] h-[14rem] xsm:w-[10rem] xsm:h-[10rem]'>
          <Image
            src={motherImage}
            alt='Mẹ và bé'
            fill
            className='object-contain'
            priority
          />
        </div>
      </div>
    </>
  )
}
