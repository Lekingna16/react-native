import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Book } from './BookCard';

interface BookGridProps {
  books: Book[];
  onBookPress?: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, onBookPress }) => {
  const handlePress = (book: Book) => {
    console.log(`[LOG Grid] Đã nhấn vào sách (Lưới 2 cột): "${book.title}" - Giá: ${book.price}`);
    onBookPress?.(book);
  };

  return (
    // Yêu cầu kỹ thuật:
    // • Container ngoài: flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
    <View style={styles.gridContainer}>
      {books.map((book) => (
        // • Mỗi item: width: '48%' (chừa khoảng trống ở giữa 2 cột), marginBottom cho khoảng cách hàng
        <TouchableOpacity
          key={book.id}
          style={styles.gridItem}
          onPress={() => handlePress(book)}
          activeOpacity={0.8}
        >
          {/* • Ảnh bìa trong item: width: '100%', aspectRatio cố định 3/4 thay vì height cố định */}
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />

          {/* Phần thông tin tên + giá phía dưới */}
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
  );
};

const styles = StyleSheet.create({
  // Container ngoài chia 2 cột bằng thuần Flexbox (không dùng FlatList numColumns)
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // Mỗi item chiếm 48% để chừa 4% khoảng cách ở giữa
  gridItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    // Đổ bóng thẩm mỹ
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // Ảnh bìa dùng width 100% và aspectRatio: 3/4 để giữ nguyên tỉ lệ ảnh khi width thay đổi theo %
  coverImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E5E7EB',
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
    minHeight: 36, // Giúp các card đều hàng khi tên 1 dòng hoặc 2 dòng
  },
  author: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 8,
  },
});

export default BookGrid;
