import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { HomeNavigationProp } from '../navigation/types';
import { BOOKS_DATA, Book } from '../data/books';
import { BookCard } from '../components/BookCard';
import { FloatingCartButton } from '../components/FloatingCartButton';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleBookPress = (book: Book) => {
    // Navigate to BookDetailScreen with bookId via route.params
    navigation.navigate('BookDetailScreen', { bookId: book.id });
  };

  const renderHeader = () => (
    <View style={styles.headerArea}>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm sách, tác giả, thể loại..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          editable={false}
        />
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sách bán chạy nổi bật</Text>
        <Text style={styles.sectionSubtitle}>Gợi ý hôm nay dành cho bạn</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={BOOKS_DATA}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => handleBookPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {/* Floating Cart Button with dynamic badge from store */}
      <FloatingCartButton bottom={18} right={18} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  listContent: {
    paddingBottom: 24,
  },
  headerArea: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  greetingText: {
    fontSize: 13,
    color: '#666666',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 2,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f3f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
