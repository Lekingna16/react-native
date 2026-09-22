import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import BookCard, { Book } from './BookCard';

interface BookListProps {
  books: Book[];
  onBookPress?: (book: Book) => void;
  headerComponent?: React.ReactElement;
}

/**
 * Thử thách giờ 1: Danh sách 4-5 Book Card xếp chồng theo cột (1 cột)
 */
export const BookList: React.FC<BookListProps> = ({
  books,
  onBookPress,
  headerComponent,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={headerComponent}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={onBookPress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 24,
  },
});

export default BookList;
