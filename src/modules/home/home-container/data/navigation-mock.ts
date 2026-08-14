import { NavigationItem } from '../types/navigation-type'

export const navigationItems: NavigationItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Bác sĩ - Chuyên gia', href: '/bac-si' },
  {
    label: 'Chuyên khoa & Dịch vụ',
    href: '/dich-vu',
    children: [
      {
        label: 'Trung tâm Hỗ trợ sinh sản',
        href: '#',
        subItems: [
          { label: 'Khám và tư vấn hiếm muộn', href: '#' },
          { label: 'Thụ tinh nhân tạo (IUI)', href: '#' },
          { label: 'Thụ tinh ống nghiệm IVF', href: '#' },
          { label: 'Tiêm tinh trùng vào bào tương trứng (ICSI)', href: '#' },
          { label: 'Công nghệ nuôi phôi Time-lapse tích hợp trí tuệ AI', href: '#' },
          { label: 'Trữ lạnh trứng - tinh trùng - phôi', href: '#' },
          { label: 'Sàng lọc di truyền PGT thế hệ mới', href: '#' },
          { label: 'Kỹ thuật điều trị vô sinh nam', href: '#' },
        ],
      },
      {
        label: 'Khoa Phụ sản',
        href: '#',
        subItems: [
          { label: 'Khám phụ khoa và điều trị các bệnh lý phụ khoa', href: '#' },
          { label: 'Phát hiện sớm ung thư cổ tử cung', href: '#' },
          { label: 'Các thủ thuật phụ khoa', href: '#' },
          { label: 'Quản lí thai nghén', href: '#' },
        ],
      },
      {
        label: 'Khoa Ngoại tổng hợp',
        href: '#',
        subItems: [
          { label: 'Phẫu thuật ngoại tổng quát', href: '#' },
          { label: 'Phẫu thuật nội soi', href: '#' },
        ],
      },
      { label: 'Khoa Nội tổng hợp', href: '#' },
      { label: 'Khoa Xét nghiệm', href: '#' },
      { label: 'Khoa Chẩn đoán hình ảnh', href: '#' },
      { label: 'Hệ thống Phòng khám đa khoa', href: '#' },
      { label: 'Trung tâm Chăm sóc sức khỏe', href: '#' },
      { label: 'Dịch vụ đặc biệt', href: '#' },
    ],
  },
  { label: 'Trang thiết bị - Công nghệ', href: '/cong-nghe' },
  { label: 'Video', href: '/video' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Phép màu Đồng Tâm', href: '/phep-mau' },
  { label: 'Hỗ trợ khách hàng', href: '/ho-tro' },
]
