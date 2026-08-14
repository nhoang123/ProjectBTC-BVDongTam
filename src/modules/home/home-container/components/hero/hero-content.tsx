type Props = {
  subtitle: string
  title: string
  description: string
}

export function HeroContent({ subtitle, title, description }: Props) {
  return (
    <div className='relative z-10 flex flex-col items-center text-center px-[1rem] xsm:px-[0.5rem] pt-[1.5rem] xsm:pt-[1rem]'>
      <p className='mb-[0.5rem] xsm:mb-[0.125rem] text-[1.2rem] xsm:text-[0.6rem] font-bold tracking-[0.15em] text-primary'>
        {subtitle}
      </p>

      <h1 className='mb-[0.5rem] xsm:mb-[0.125rem] text-[5rem] xsm:text-[1.1rem] font-bold leading-[1.1] text-accent'>
        {title}
      </h1>

      <p className='text-[1.5rem] xsm:text-[0.65rem] font-bold tracking-wide text-primary'>
        {description}
      </p>
    </div>
  )
}
