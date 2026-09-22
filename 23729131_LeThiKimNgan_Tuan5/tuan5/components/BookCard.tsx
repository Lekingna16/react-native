import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  coverUrl: string;
}

interface BookCardProps {
  book: Book;
  onPress?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const handlePress = () => {
    console.log(`[LOG] Đã nhấn vào sách: "${book.title}" - Tác giả: ${book.author} - Giá: ${book.price}`);
    onPress?.(book);
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* 1. Ảnh bìa bên trái: width/height cố định 80x110, borderRadius */}
      <Image
        source={{ uri: book.coverUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* 2. Cột thông tin bên phải: flex: 1, flexDirection: 'column' */}
      {/* justifyContent: 'space-between' trên trục dọc để giá tiền căn dưới cùng */}
      <View style={styles.infoColumn}>
        <View style={styles.topInfo}>
          {/* Gợi ý: numberOfLines={2} để layout ổn định khi tên sách dài */}
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
        </View>

        {/* Giá tiền căn dưới cùng của cột thông tin */}
        <Text style={styles.price}>{book.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Yêu cầu kỹ thuật:
  // • Card ngoài cùng: flexDirection: 'row', alignItems: 'flex-start'
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    // Đổ bóng thẩm mỹ cho Card
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // • Ảnh bìa: width/height cố định (80x110), borderRadius
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  // • Cột thông tin: flex: 1 để chiếm không gian còn lại, flexDirection: 'column'
  // • Giá tiền căn dưới cùng bằng justifyContent: 'space-between' trên trục dọc
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110, // Khớp với chiều cao ảnh bìa để justifyContent: 'space-between' đẩy giá xuống đáy
    marginLeft: 14,
  },
  topInfo: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 22,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626', // Màu đỏ nổi bật cho giá tiền
  },
});

export default BookCard;
