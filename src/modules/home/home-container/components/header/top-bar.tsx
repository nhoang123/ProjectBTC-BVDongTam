import { Phone } from 'lucide-react'

import { Button } from '@/components/UI/button'

export function TopBar() {
  return (
    <div className='hidden lg:block bg-[#0897d8] text-white py-1.5'>
      <div className='mx-auto px-4 xsm:px-5 sm:px-6 lg:px-25 xl:px-10 2xl:px-16 text-[0.75rem] xsm:text-[0.8125rem] sm:text-[0.875rem]'>
        <div className='flex h-8 xsm:h-9 sm:h-10 items-center justify-end gap-2 xsm:gap-3'>
          <div className='flex items-center gap-1.5 xsm:gap-2 rounded-full border border-white bg-white px-3 xsm:px-4 py-1'>
            <Phone className='h-3 w-3 xsm:h-3.5 xsm:w-3.5 text-[#0897d8]' />
            <span className='font-medium text-[#0897d8] text-[0.6875rem] xsm:text-[0.75rem] sm:text-[0.8125rem]'>
              Tổng đài 0946 885 885
            </span>
          </div>

          <div className='h-4 xsm:h-5 w-px bg-white/30'></div>

          <Button
            variant='outline'
            size='sm'
            className='h-7 xsm:h-8 rounded-full border-2 border-white bg-[#0897d8] px-3 xsm:px-4 sm:px-5 text-[0.6875rem] xsm:text-[0.75rem] sm:text-[0.875rem] font-medium text-white hover:bg-white hover:text-[#0a5c7e] transition-colors'
          >
            Liên hệ
          </Button>
        </div>
      </div>
    </div>
  )
}
