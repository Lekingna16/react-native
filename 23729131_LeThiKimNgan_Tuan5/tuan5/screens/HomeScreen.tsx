import React, { useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGridChallenge3 from '../components/BookGridChallenge3';
import FloatingCartButton from '../components/FloatingCartButton';
import TabBar, { TabKey } from '../components/TabBar';
import { BookWithBadge } from '../components/BookCardBadge';

interface HomeScreenProps {
  onSelectBook?: (book: BookWithBadge) => void;
  onTabPress?: (tab: TabKey) => void;
  activeTab?: TabKey;
  onCartPress?: () => void;
}

export const INITIAL_BOOKS: BookWithBadge[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: '86.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    badge: '-20%',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: '79.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    badge: '-35%',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu?',
    author: 'Rosie Nguyễn',
    price: '95.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    badge: '-15%',
  },
  {
    id: '4',
    title: 'Hành Trình Về Phương Đông',
    author: 'Baird T. Spalding',
    price: '110.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    badge: '-25%',
  },
  {
    id: '5',
    title: 'Cây Cam Ngọt Của Tôi',
    author: 'José Mauro de Vasconcelos',
    price: '108.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?w=400',
    badge: '-30%',
  },
  {
    id: '6',
    title: 'Tư Duy Nhanh Và Chậm',
    author: 'Daniel Kahneman',
    price: '145.000 đ',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    badge: '-40%',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectBook,
  onTabPress,
  activeTab = 'home',
  onCartPress,
}) => {
  const [cartCount, setCartCount] = useState<number>(3);

  const handleBookPress = (book: BookWithBadge) => {
    console.log(`[LOG HomeScreen] Xem chi tiết sách "${book.title}"`);
    if (onSelectBook) {
      onSelectBook(book);
    } else {
      setCartCount((prev) => prev + 1);
    }
  };

  const handleCategorySelect = (category: string) => {
    console.log(`[LOG HomeScreen] Chọn danh mục: "${category}"`);
  };

  const handleFloatingCartPress = () => {
    console.log(`[LOG HomeScreen] Nhấn nút Giỏ hàng nổi | Tổng số món: ${cartCount}`);
    onCartPress?.();
  };

  const handleTabPress = (tab: TabKey) => {
    onTabPress?.(tab);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

        {/* 1. Header cố định trên cùng */}
        <Header />

        {/* 2. ScrollView chứa Category Chips và Book Grid */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <CategoryChips onSelectCategory={handleCategorySelect} />

          <BookGridChallenge3
            books={INITIAL_BOOKS}
            onBookPress={handleBookPress}
          />
        </ScrollView>

        {/* 3. Nút Giỏ hàng nổi (đặt nổi phía trên thanh TabBar) */}
        <FloatingCartButton
          cartCount={cartCount}
          onPress={handleFloatingCartPress}
          bottom={76} // Nằm cách thanh Tab Bar (cao 60) một khoảng 16px
        />

        {/* 4. Bài tập 1: Thanh Tab Bar 4 mục cố định dưới cùng màn hình */}
        <TabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
          positionMode="static" // Đặt cố định ngoài ScrollView trong Flexbox Column
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1A237E',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 40,
  },
});

export default HomeScreen;
