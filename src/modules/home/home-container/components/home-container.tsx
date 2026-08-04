import DoctorSection from '@/modules/home/doctor-team/components/DoctorSection'

import { Header } from './header/main-header'
import { HeroSlider } from './hero/hero-slider'

export function HomeContainer() {
  return (
    <main className='bg-white'>
      <Header />
      <HeroSlider />
      <DoctorSection />
    </main>
  )
}