import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import CartScreen from './screens/CartScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { TabKey } from './components/TabBar';
import { BookWithBadge } from './components/BookCardBadge';

/**
 * Thử thách Part_01:
 * Ghép toàn bộ 5 màn hình đã dựng (Home, Detail, Cart, Categories, Profile cùng Tab Bar dùng chung)
 * thành một bộ layout hoàn chỉnh, chỉ dùng state cục bộ (useState) để chuyển đổi hiển thị
 * giữa các màn hình khi bấm vào Tab Bar — chưa cần thư viện navigation thật.
 */
export default function App() {
  // State điều hướng cục bộ giữa các tab
  const [currentTab, setCurrentTab] = useState<TabKey>('home');
  // State quản lý xem chi tiết cuốn sách nào
  const [selectedBook, setSelectedBook] = useState<BookWithBadge | null>(null);

  // 1. MÀN HÌNH 5: Chi tiết sách (Book Detail)
  // Khi người dùng bấm vào bất kỳ sách nào từ Home hoặc các danh sách
  if (selectedBook) {
    return (
      <BookDetailScreen
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
        onAddToCart={(book) => {
          console.log(`[Thử thách Part 01] Thêm sách "${book.title}" vào giỏ! Chuyển ngay sang tab Cart.`);
          setSelectedBook(null);
          setCurrentTab('cart'); // Mở ngay màn hình Giỏ hàng để kiểm tra
        }}
      />
    );
  }

  // 2. MÀN HÌNH 3: Giỏ hàng (Cart Screen)
  if (currentTab === 'cart') {
    return (
      <CartScreen
        activeTab="cart"
        onTabPress={(tab) => setCurrentTab(tab)}
      />
    );
  }

  // 3. MÀN HÌNH 2: Danh mục (Categories Screen)
  if (currentTab === 'categories') {
    return (
      <CategoriesScreen
        activeTab="categories"
        onTabPress={(tab) => setCurrentTab(tab)}
      />
    );
  }

  // 4. MÀN HÌNH 4: Tài khoản (Profile Screen)
  if (currentTab === 'profile') {
    return (
      <ProfileScreen
        activeTab="profile"
        onTabPress={(tab) => setCurrentTab(tab)}
      />
    );
  }

  // 5. MÀN HÌNH 1 (Mặc định): Trang chủ (Home Screen)
  return (
    <HomeScreen
      activeTab="home"
      onTabPress={(tab) => setCurrentTab(tab)}
      onSelectBook={(book) => setSelectedBook(book)}
      onCartPress={() => setCurrentTab('cart')}
    />
  );
}
