'use client'

export interface Doctor {
  id: number;
  name: string;
  title: string;
  specialty: string;
  specialtyColor?: string;
  yearsOfExperience: number;
  avatar: string;
  bgImage?: string;
  achievements: string[];
}

export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: 'TTUT.TS.BS ĐỖ VĂN TRANG',
    title: 'Giám đốc Bệnh viện Đông Tâm',
    specialty: 'NGOẠI KHOA',
    specialtyColor: 'bg-yellow-400',
    yearsOfExperience: 40,
    avatar: 'https://benhviendongtam.vn/wp-content/uploads/2026/05/bs_nha_1-2.webp',
    bgImage: 'https://benhviendongtam.vn/wp-content/uploads/2026/04/card_b_c_s_.webp',
    achievements: [
      'Chuyên gia hàng đầu trong lĩnh vực Ngoại khoa tiêu hóa gan mật.',
      'Tốt nghiệp thủ khoa Bác sĩ nội trú chuyên ngành Ngoại, ĐH Y Hà Nội.',
      'Điều trị thành công hàng nghìn ca phẫu thuật khó, ca  bệnh hiểm nghèo giúp nhiều bệnh nhân thoát khỏi nguy kịch.',
    ],
  },
  {
    id: 2,
    name: 'BSCKI NGUYỄN THỊ NHÃ',
    title: 'Phó Giám đốc Bệnh viện Đông Tâm',
    specialty: 'HỖ TRỢ SINH SẢN',
    specialtyColor: 'bg-yellow-400',
    yearsOfExperience: 40,
    avatar: 'https://benhviendongtam.vn/wp-content/uploads/2026/05/bs_nha_1.webp',
    bgImage: 'https://benhviendongtam.vn/wp-content/uploads/2026/04/card_b_c_s_.webp',
    achievements: [
      'Chuyên gia hàng đầu trong lĩnh vực Hỗ trợ sinh sản và sản khoa.',
      'Đã điều trị thành công hàng nghìn ca vô sinh hiếm muộn, lâu năm, sinh con mắc các bệnh di truyền',
      'Là người góp phần đặc biệt quan trọng đưa IVF Bưu điện trở thành cơ sở y tế điều trị vô sinh hiếm muộn hàng đầu trong nước và khu vực.',
    ],
  },
  {
    id: 3,
    name: 'ThS.NGUYỄN KHẮC SINH',
    title: 'Trưởng phòng LAB IVF Đông Tâm',
    specialty: 'HỖ TRỢ SINH SẢN',
    specialtyColor: 'bg-yellow-400',
    yearsOfExperience: 11,
    avatar: 'https://benhviendongtam.vn/wp-content/uploads/2026/04/img_6053_1.webp',
    bgImage: 'https://benhviendongtam.vn/wp-content/uploads/2026/04/card_b_c_s_.webp',
    achievements: [
      'Được đào tạo chuyên sâu trong và ngoài nước, đặc biệt tại Nhật Bản.',
      'Thành thạo các kỹ thuật nuôi cấy phôi với yêu cầu trình độ rất cao,  mang lại hiệu quả điều trị tương đương với các Lab trong khu vực và thế giới.',
      'Xử lý thành công nhiều ca IVF khó như: bệnh nhân lớn tuổi, thất bại nhiều lần .',
    ],
  },
  {
    id: 4,
    name: 'ThS.BS.TRỊNH VĂN DU',
    title: 'Trưởng khoa phụ sản',
    specialty: 'KHOA PHỤ SẢN',
    specialtyColor: 'bg-yellow-400',
    yearsOfExperience: 15,
    avatar: 'https://benhviendongtam.vn/wp-content/uploads/2026/05/IMG_2754-scaled.png',
    bgImage: 'https://benhviendongtam.vn/wp-content/uploads/2026/04/card_b_c_s_.webp',
    achievements: [
      'Tốt nghiệp Thạc sĩ Sản phụ khoa ĐH Y Hà Nội, vô sinh hiếm muộn Bệnh viện Từ Dũ (TP. Hồ Chí Minh)',
      'Hơn 15 năm kinh nghiệm trong lĩnh vực Hỗ trợ sinh sản, Sản phụ khoa và Mỗ nội soi vô sinh với gần 10.000 ca IVF thành công.',
    ],
  },
]