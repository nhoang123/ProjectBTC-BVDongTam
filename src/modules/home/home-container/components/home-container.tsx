import DoctorSection from '@/modules/home/doctor-team/components/DoctorSection'
import { FeaturedNewsSection } from '@/modules/home/Features-news/index'
import FeaturedServicesSection from '@/modules/home/Features-services/index'
import { FooterMainContainer } from '@/modules/home/Flooter/index'

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
