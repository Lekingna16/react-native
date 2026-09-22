import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Book } from './BookCard';

export interface BookWithBadge extends Book {
  badge?: string; // Ví dụ: '-20%', '-15%', 'MỚI'
  badgeType?: 'discount' | 'new'; // discount: đỏ, new: cam/xanh
}

interface BookCardBadgeProps {
  book: BookWithBadge;
  onPress?: (book: BookWithBadge) => void;
}

/**
 * Bài tập 1: Badge giảm giá / Nhãn 'Mới' trên bìa sách (Thẻ sách 1 cột)
 * Yêu cầu:
 * • View chứa ảnh bìa cần position: 'relative' để làm containing block
 * • Badge dùng position: 'absolute', top: 6, left: 6
 * • Badge có nền màu nổi bật (đỏ/cam), borderRadius nhỏ, padding vừa đủ ôm chữ
 */
export const BookCardBadge: React.FC<BookCardBadgeProps> = ({ book, onPress }) => {
  const handlePress = () => {
    console.log(
      `[LOG BookBadge] Đã nhấn vào sách: "${book.title}" | Nhãn: ${book.badge || 'Không có'} | Giá: ${book.price}`
    );
    onPress?.(book);
  };

  const isDiscount = book.badge?.includes('%') || book.badgeType === 'discount';

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* 
        Yêu cầu kỹ thuật 1:
        View chứa ảnh bìa cần position: 'relative' để làm containing block cho Badge
      */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: book.coverUrl }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        {/* 
          Yêu cầu kỹ thuật 2 & 3:
          Badge dùng position: 'absolute', top: 6, left: 6, nền đỏ/cam nổi bật, borderRadius nhỏ
        */}
        {book.badge ? (
          <View
            style={[
              styles.badge,
              isDiscount ? styles.badgeDiscount : styles.badgeNew,
            ]}
          >
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        ) : null}
      </View>

      {/* Cột thông tin bên phải */}
      <View style={styles.infoColumn}>
        <View style={styles.topInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
        </View>

        <Text style={styles.price}>{book.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // View cha chứa ảnh bìa: CẦN position: 'relative' để làm mốc tọa độ cho badge con
  imageWrapper: {
    position: 'relative',
    width: 80,
    height: 110,
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  // Badge nổi ở góc trên-trái của ảnh bìa sách, chồng lên ảnh chứ không đẩy layout
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
    elevation: 4,
  },
  badgeDiscount: {
    backgroundColor: '#DC2626', // Màu đỏ nổi bật cho giảm giá
  },
  badgeNew: {
    backgroundColor: '#EA580C', // Màu cam nổi bật cho nhãn 'MỚI'
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110,
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
    color: '#DC2626',
  },
});

export default BookCardBadge;
