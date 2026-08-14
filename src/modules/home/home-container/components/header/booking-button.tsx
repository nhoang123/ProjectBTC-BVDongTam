import { CalendarDays } from 'lucide-react'

import { Button } from '@/components/UI/button'

export function BookingButton() {
  return (
    <Button className='h-[2.75rem] rounded-full bg-[#0897d8] px-[1.5rem] text-[0.9375rem] font-semibold shadow-soft hover:bg-[#F3BB28] hover:shadow-lg transition-all duration-300 cursor-pointer xsm:h-[2.25rem] xsm:px-[0.75rem] xsm:text-[0.75rem]'>
      <CalendarDays className='mr-[0.5rem] h-[1.25rem] w-[1.25rem] xsm:mr-[0.375rem] xsm:h-[1rem] xsm:w-[1rem]' />
      Đặt lịch khám
    </Button>
  )
}
