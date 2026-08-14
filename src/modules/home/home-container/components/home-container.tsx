import DoctorSection from '@/modules/home/doctor-team/components/doctor-section'
import { FeaturedNewsSection } from '@/modules/home/features-news/index'
import FeaturedServicesSection from '@/modules/home/features-services/index'
import { FooterMainContainer } from '@/modules/home/footer/index'

import { Header } from './header/main-header'
import { HeroSlider } from './hero/hero-slider'

export function HomeContainer() {
  return (
    <main className='bg-white'>
      <Header />
      <HeroSlider />
      <DoctorSection />
      <FeaturedServicesSection />
      <FeaturedNewsSection />
      <FooterMainContainer />
    </main>
  )
}
