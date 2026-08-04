import { Phone } from 'lucide-react'

import { Button } from '@/components/UI/button'

export function TopBar() {
  return (
    <div className='bg-[#0897d8] text-white'>
      <div className='mx-auto max-w-container px-16 text-[0.875rem] xsm:px-16 sm:px-20 lg:px-24'> {/* Đồng bộ padding với header */}
        <div className='flex h-10 items-center justify-end gap-3'>
          <div className='flex items-center gap-2 rounded-full border border-white bg-white px-4 py-1'>
            <Phone className='h-3.5 w-3.5 text-[#0897d8]' />
            <span className='font-medium text-[#0897d8]'>Tổng đài 0946 885 885</span>
          </div>

          <div className='h-5 w-px bg-white/30'></div>

          <Button
            variant='outline'
            size='sm'
            className='h-8 rounded-full border-2 border-white bg-[#0897d8] px-5 text-sm font-medium text-white hover:bg-white hover:text-[#0a5c7e] transition-colors'
          >
            Liên hệ
          </Button>
        </div>
      </div>
    </div>
  )
}