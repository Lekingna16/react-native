export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  category: string;
  publisher: string;
  pages: number;
  publishedYear: number;
  description: string;
}

export const BOOKS_DATA: Book[] = [
  {
    id: '1',
    title: 'Nhà Giả Kim (The Alchemist)',
    author: 'Paulo Coelho',
    price: 79000,
    originalPrice: 99000,
    rating: 4.8,
    reviewsCount: 1420,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    category: 'Văn học kinh điển',
    publisher: 'NXB Hội Nhà Văn',
    pages: 228,
    publishedYear: 2020,
    description:
      'Nhà Giả Kim là cuốn sách bán chạy chỉ sau Kinh Thánh. Cuốn sách kể về hành trình phiêu lưu của cậu bé chăn cừu Santiago đi tìm kho báu ở Kim Tự Tháp Ai Cập, qua đó khám phá ra "Vận mệnh cuộc đời" và ý nghĩa đích thực của hạnh phúc.',
  },
  {
    id: '2',
    title: 'Đắc Nhân Tâm (How to Win Friends and Influence People)',
    author: 'Dale Carnegie',
    price: 86000,
    originalPrice: 108000,
    rating: 4.9,
    reviewsCount: 2310,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    category: 'Kỹ năng sống',
    publisher: 'NXB Tổng Hợp TP.HCM',
    pages: 320,
    publishedYear: 2021,
    description:
      'Đắc Nhân Tâm là cuốn sách kinh điển về nghệ thuật ứng xử, giao tiếp và thu phục lòng người. Cuốn sách mang đến những bài học sâu sắc giúp bạn xây dựng mối quan hệ tốt đẹp trong công việc và cuộc sống.',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu?',
    author: 'Rosie Nguyễn',
    price: 75000,
    originalPrice: 95000,
    rating: 4.7,
    reviewsCount: 980,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    category: 'Phát triển bản thân',
    publisher: 'NXB Nhã Nam',
    pages: 292,
    publishedYear: 2019,
    description:
      'Cuốn sách là lời nhắn nhủ dành cho những người trẻ đang chênh vênh giữa ngưỡng cửa trưởng thành. Hãy đọc sách, học hỏi, đi thật nhiều và rèn luyện bản thân để tuổi trẻ không trôi qua một cách lãng phí.',
  },
  {
    id: '4',
    title: 'Cây Cam Ngọt Của Tôi',
    author: 'José Mauro de Vasconcelos',
    price: 88000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 1850,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    category: 'Tiểu thuyết nước ngoài',
    publisher: 'NXB Hội Nhà Văn',
    pages: 244,
    publishedYear: 2021,
    description:
      'Tác phẩm kể về chú bé Zezé 5 tuổi thông minh nhưng tinh nghịch, lớn lên trong một gia đình nghèo. Tình bạn ấm áp giữa cậu bé và cây cam ngọt sau vườn đã lay động trái tim hàng triệu độc giả trên toàn thế giới.',
  },
  {
    id: '5',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin (Uncle Bob)',
    price: 320000,
    originalPrice: 400000,
    rating: 4.8,
    reviewsCount: 650,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
    category: 'Công nghệ thông tin',
    publisher: 'Prentice Hall',
    pages: 464,
    publishedYear: 2018,
    description:
      'Cuốn sách kinh điển dành cho lập trình viên phần mềm. Tác giả hướng dẫn cách viết mã nguồn sạch, dễ đọc, dễ bảo trì và tối ưu hoá kiến trúc hệ thống theo chuẩn Agile.',
  },
  {
    id: '6',
    title: 'Tư Duy Nhanh Và Chậm (Thinking, Fast and Slow)',
    author: 'Daniel Kahneman',
    price: 185000,
    originalPrice: 220000,
    rating: 4.6,
    reviewsCount: 720,
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
    category: 'Tâm lý học',
    publisher: 'NXB Thế Giới',
    pages: 612,
    publishedYear: 2020,
    description:
      'Khám phá hai hệ thống tư duy chi phối tâm trí con người: Hệ thống 1 (nhanh, cảm tính, tự động) và Hệ thống 2 (chậm, lý tính, cẩn trọng). Cuốn sách thay đổi hoàn toàn cách chúng ta đưa ra quyết định.',
  },
];
