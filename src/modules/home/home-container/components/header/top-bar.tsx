import { Phone } from 'lucide-react'

import { Button } from '@/components/UI/button'

export function TopBar() {
  return (
    <div className='block xsm:hidden bg-[#0897d8] text-white py-[0.375rem]'>
      <div className='mx-auto px-[6rem] xsm:px-[1rem] text-[0.875rem] xsm:text-[0.75rem]'>
        <div className='flex h-[2.5rem] xsm:h-[2rem] items-center justify-end gap-[0.75rem] xsm:gap-[0.5rem]'>
          <div className='flex items-center gap-[0.5rem] xsm:gap-[0.375rem] rounded-full border border-white bg-white px-[1rem] xsm:px-[0.75rem] py-[0.25rem] cursor-pointer hover:shadow-md transition-shadow'>
            <Phone className='h-[0.875rem] w-[0.875rem] xsm:h-[0.75rem] xsm:w-[0.75rem] text-[#0897d8] fill-blue-400' />
            <span className='font-medium text-[#0897d8] text-[0.8125rem] xsm:text-[0.6875rem]'>
              Tổng đài 0946 885 885
            </span>
          </div>

          <div className='h-[1.25rem] xsm:h-[1rem] w-px bg-white/30'></div>

          <Button
            variant='outline'
            size='sm'
            className='h-[2rem] xsm:h-[1.75rem] rounded-full border-2 border-white bg-[#0897d8] px-[1.25rem] xsm:px-[0.75rem] text-[0.875rem] xsm:text-[0.6875rem] font-medium text-white hover:bg-white hover:text-[#0a5c7e] transition-all duration-300 cursor-pointer'
          >
            Liên hệ
          </Button>
        </div>
      </div>
    </div>
  )
}
