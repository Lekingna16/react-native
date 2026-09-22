import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { BookWithBadge } from './BookCardBadge';

interface BookGrid3ColProps {
  books: BookWithBadge[];
  onBookPress?: (book: BookWithBadge) => void;
}

const NUM_COLUMNS = 3; // Số cột = 3
const CONTAINER_PADDING = 16; // Padding 2 bên của container
const GAP = 10; // Khoảng cách gap giữa các cột và giữa các hàng

export const BookGrid3Col: React.FC<BookGrid3ColProps> = ({ books, onBookPress }) => {
  const { width: windowWidth } = useWindowDimensions();

  // Công thức: width = (Tổng chiều rộng khả dụng - Tổng gap) / Số cột
  const availableWidth = windowWidth - CONTAINER_PADDING * 2;
  const totalGapWidth = (NUM_COLUMNS - 1) * GAP;
  const itemWidth = Math.floor((availableWidth - totalGapWidth) / NUM_COLUMNS);

  const handlePress = (book: BookWithBadge) => {
    console.log(`[LOG Grid 3 Cột] Đã nhấn vào sách: "${book.title}" | Nhãn: ${book.badge || 'Không có'} - Giá: ${book.price}`);
    onBookPress?.(book);
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.gridContainer, { gap: GAP }]}>
        {books.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={[styles.gridItem, { width: itemWidth }]}
            onPress={() => handlePress(book)}
            activeOpacity={0.8}
          >
            {/* 
              Yêu cầu kỹ thuật:
              View chứa ảnh bìa cần position: 'relative' để làm containing block cho Badge
            */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: book.coverUrl }}
                style={styles.coverImage}
                resizeMode="cover"
              />

              {/* Badge nổi ở góc trên-trái (top: 6, left: 6, position: 'absolute') */}
              {book.badge ? (
                <View
                  style={[
                    styles.badge,
                    book.badge.includes('%') ? styles.badgeDiscount : styles.badgeNew,
                  ]}
                >
                  <Text style={styles.badgeText}>{book.badge}</Text>
                </View>
              ) : null}
            </View>

            {/* Thông tin tên sách + tác giả + giá */}
            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {book.author}
              </Text>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingVertical: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // View chứa ảnh bìa cần position: 'relative' để làm containing block
  imageWrapper: {
    position: 'relative',
    width: '100%',
  },
  coverImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E5E7EB',
  },
  // Badge chồng lên góc trên-trái của ảnh bìa mà không đẩy layout
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 5,
    elevation: 3,
  },
  badgeDiscount: {
    backgroundColor: '#DC2626', // Màu đỏ nổi bật cho giảm giá
  },
  badgeNew: {
    backgroundColor: '#EA580C', // Màu cam nổi bật cho nhãn 'Mới'
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 6,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 16,
    minHeight: 32,
  },
  author: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 4,
  },
});

export default BookGrid3Col;
