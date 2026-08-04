import { redirect } from 'next/navigation'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const homePath = params.locale === 'en' ? '/en/trang-chu' : '/trang-chu'
  redirect(homePath)
}
