import { CalendarDays } from 'lucide-react'

import { Button } from '@/components/UI/button'

export function BookingButton() {
  return (
    <Button className='h-11 rounded-full bg-[#0897d8] px-6 text-[0.9375rem] font-semibold shadow-soft hover:bg-[#F3BB28]'>
      <CalendarDays className='mr-2 h-5 w-5' />
      Đặt lịch khám
    </Button>
  )
}