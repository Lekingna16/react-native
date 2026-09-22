import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { BookWithBadge } from './BookCardBadge';

interface BookGridChallenge3Props {
  books: BookWithBadge[];
  onBookPress?: (book: BookWithBadge) => void;
}

/**
 * THỬ THÁCH GIỜ 3:
 * Lưới sách 2 cột (Giờ 2), mỗi Book Card đều có Badge giảm giá (absolute)
 * Đảm bảo: Badge không bị lệch khi kích thước ảnh bìa co giãn theo màn hình.
 */
export const BookGridChallenge3: React.FC<BookGridChallenge3Props> = ({
  books,
  onBookPress,
}) => {
  const handlePress = (book: BookWithBadge) => {
    console.log(
      `[LOG Thử Thách 3] Đã chọn sách: "${book.title}" | Giảm giá: ${book.badge} | Giá: ${book.price}`
    );
    onBookPress?.(book);
  };

  return (
    <View style={styles.gridContainer}>
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.cardItem}
          onPress={() => handlePress(book)}
          activeOpacity={0.8}
        >
          {/* 
            CHÌA KHÓA KỸ THUẬT:
            imageWrapper có width: '100%' và position: 'relative' ôm khít ảnh bìa.
            Nhờ đó, Badge (position: 'absolute', top: 8, left: 8) LUÔN bám chính xác 
            vào góc trên-trái của ảnh bìa dù kích thước ảnh thay đổi theo bất kỳ màn hình nào.
          */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: book.coverUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />

            {/* Badge giảm giá nổi trên ảnh bìa */}
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>{book.badge || '-20%'}</Text>
            </View>
          </View>

          {/* Phần thông tin bên dưới */}
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {book.author}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  // Lưới 2 cột Giờ 2: flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Mỗi item chiếm 48% chiều rộng
  cardItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  // Khung chứa ảnh bìa làm Containing Block chuẩn xác cho Badge
  imageWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#E5E7EB',
  },
  // aspectRatio 3/4 giúp chiều cao tự co giãn theo chiều rộng %
  coverImage: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  // Badge giảm giá không bao giờ lệch vì định vị theo imageWrapper
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DC2626', // Màu đỏ nổi bật
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 18,
    minHeight: 36,
  },
  author: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
});

export default BookGridChallenge3;
