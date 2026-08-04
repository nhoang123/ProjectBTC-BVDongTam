type Props = {
  subtitle: string
  title: string
  description: string
}

export function HeroContent({ subtitle, title, description }: Props) {
  return (
    <div className='relative z-10 flex flex-col items-center text-center px-4'>
      <p className='mb-3 text-[0.875rem] font-bold tracking-[0.15em] text-primary xsm:text-[1rem] sm:text-[1.125rem] lg:text-[1.375rem]'>
        {subtitle}
      </p>

      <h1 className='mb-3 text-[2.75rem] font-bold leading-[0.9] text-accent xsm:text-[3.25rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[6.75rem]'>
        {title}
      </h1>

      <p className='text-[1rem] font-bold tracking-wide text-primary xsm:text-[1.125rem] sm:text-[1.5rem] lg:text-[2rem]'>
        {description}
      </p>
    </div>
  )
}
