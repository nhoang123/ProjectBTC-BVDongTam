type Props = {
  subtitle: string
  title: string
  description: string
}

export function HeroContent({ subtitle, title, description }: Props) {
  return (
    <div className='relative z-10 flex flex-col items-center text-center px-3 xsm:px-4'>
      <p className='mb-2 xsm:mb-3 text-[0.75rem] xsm:text-[0.875rem] sm:text-[1.125rem] lg:text-[1.375rem] font-bold tracking-[0.15em] text-primary'>
        {subtitle}
      </p>

      <h1 className='mb-2 xsm:mb-3 text-[2.25rem] xsm:text-[2.75rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[6.75rem] font-bold leading-[0.9] text-accent'>
        {title}
      </h1>

      <p className='text-[0.875rem] xsm:text-[1rem] sm:text-[1.5rem] lg:text-[2rem] font-bold tracking-wide text-primary'>
        {description}
      </p>
    </div>
  )
}
