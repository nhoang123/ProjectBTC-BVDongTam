import { ContactInfoData, NavColumnData } from '../types/footer.type'

export const mockContactInfo: ContactInfoData = {
  hotline: '0946 885 885',
  address: 'Km 12, Quốc lộ 1, Xã Thanh Trì, Thành phố Hà Nội, Việt Nam',
  email: 'benhviendongtam@gmail.com',
  workingHours: 'Thứ 2 - Thứ 7: 7:00 - 17:00',
  mapDirectionsUrl: 'https://maps.google.com',
}

export const mockNavColumns: NavColumnData[] = [
  {
    title: 'NĂNG LỰC - DỊCH VỤ',
    links: [
      { label: 'Bác sĩ - Chuyên gia', href: '/bac-si' },
      { label: 'Chuyên khoa & Dịch vụ', href: '/dich-vu' },
      { label: 'Cơ sở vật chất & Công nghệ', href: '/co-so-vat-chat' },
      { label: 'Hiệu quả điều trị', href: '/hieu-qua-dieu-tri' },
      { label: 'Phép màu Đồng Tâm', href: '/phep-mau' },
    ],
  },
  {
    title: 'TÌM HIỂU THÊM',
    links: [
      { label: 'Về chúng tôi', href: '/ve-chung-toi' },
      { label: 'Tin tức', href: '/tin-tuc' },
      { label: 'Tuyển dụng', href: '/tuyen-dung' },
      { label: 'Liên hệ', href: '/lien-he' },
    ],
  },
  {
    title: 'CHUYÊN KHOA',
    links: [
      { label: 'Trung tâm Hỗ trợ sinh sản', href: '/khoa/ho-tro-sinh-san' },
      { label: 'Khoa Phụ sản', href: '/khoa/phu-san' },
      { label: 'Khoa Ngoại tổng hợp', href: '/khoa/ngoai-tong-hop' },
      { label: 'Khoa Nội tổng hợp', href: '/khoa/noi-tong-hop' },
      { label: 'Khoa Xét nghiệm', href: '/khoa/xet-nghiem' },
      { label: 'Khoa Chẩn đoán hình ảnh', href: '/khoa/chan-doan-hinh-anh' },
    ],
  },
]