import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BookWithBadge } from '../components/BookCardBadge';

interface BookDetailScreenProps {
  book?: BookWithBadge;
  onBack?: () => void;
  onAddToCart?: (book: BookWithBadge) => void;
}

const DEFAULT_BOOK: BookWithBadge = {
  id: '1',
  title: 'Đắc Nhân Tâm (How to Win Friends and Influence People)',
  author: 'Dale Carnegie',
  price: '86.000 đ',
  coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
  badge: '-20%',
};

const LONG_DESCRIPTION = `Đắc Nhân Tâm là cuốn sách nổi tiếng và bán chạy nhất từ trước đến nay của Dale Carnegie. Tác phẩm đã được dịch ra hầu hết các ngôn ngữ trên thế giới và liên tục đứng đầu danh sách bán chạy trong nhiều thập kỷ.

Cuốn sách đưa ra những lời khuyên sâu sắc, thực tế về cách giao tiếp, ứng xử, cách thấu hiểu lòng người và cách truyền cảm hứng cho người khác. Không chỉ đơn thuần là kỹ năng đối nhân xử thế, Đắc Nhân Tâm là nghệ thuật sống, là triết lý về sự chân thành, biết lắng nghe và tôn trọng người đối diện.

Nội dung chính gồm 4 phần:
1. Nghệ thuật ứng xử căn bản: Đừng chỉ trích, hãy thành thật khen ngợi và gợi mở sự mong muốn nơi người khác.
2. 6 cách tạo thiện cảm với người khác: Thật lòng quan tâm, luôn mỉm cười, ghi nhớ tên người khác, biết lắng nghe.
3. 12 cách dẫn dắt người khác nghĩ theo bạn: Tôn trọng ý kiến của đối phương, không tranh cãi vô ích, khích lệ và đồng cảm.
4. Chuyển hóa người khác mà không gây xúc phạm: Khen ngợi trước khi góp ý, gợi ý thay vì ra lệnh, giữ thể diện cho người khác.

Một cuốn sách không thể thiếu trên kệ sách của mỗi người, giúp bạn hoàn thiện bản thân và mở rộng những mối quan hệ bền vững trong cuộc sống.`;

/**
 * Bài tập 2: Màn hình Chi tiết sách (Book Detail)
 * 
 * Layout chuẩn xác 100% theo sơ đồ:
 * SafeAreaView (flex: 1)
 *  ├── Header nhỏ (Nút quay lại)
 *  ├── [ĐẦU CỐ ĐỊNH]: Ảnh bìa lớn (alignSelf: 'center', aspectRatio) - NẰM NGOÀI SCROLLVIEW
 *  ├── [GIỮA CUỘN ĐƯỢC]: ScrollView riêng (flex: 1) chứa [Tên sách - Tác giả] + [Giá] + [Mô tả dài]
 *  └── [CUỐI CỐ ĐỊNH]: Thanh 'Thêm vào giỏ' - CỐ ĐỊNH, NGOÀI SCROLLVIEW
 */
export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({
  book = DEFAULT_BOOK,
  onBack,
  onAddToCart,
}) => {
  const handleBack = () => {
    console.log('[LOG BookDetail] Nhấn nút Quay lại Trang chủ');
    onBack?.();
  };

  const handleAddToCart = () => {
    console.log(
      `[LOG BookDetail] Đã thêm sách "${book.title}" vào giỏ hàng! Giá: ${book.price}`
    );
    onAddToCart?.(book);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header thanh điều hướng nhỏ trên cùng */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>Chi tiết sách</Text>
        <TouchableOpacity style={styles.rightAction} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 
        =======================================================================
        1. [ĐẦU CỐ ĐỊNH]: Ảnh bìa lớn (alignSelf: 'center', aspectRatio)
        CỐ ĐỊNH PHÍA TRÊN, NẰM NGOÀI SCROLLVIEW THEO ĐÚNG SƠ ĐỒ
        =======================================================================
      */}
      <View style={styles.topFixedSection}>
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.largeCoverImage}
            resizeMode="cover"
          />
          {book.badge && (
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>{book.badge}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 
        =======================================================================
        2. [GIỮA CUỘN ĐƯỢC]: ScrollView riêng (flex: 1) — mô tả dài
        BỌC: [Tên sách - Tác giả] + [Giá] + [Các dòng mô tả dài]
        =======================================================================
      */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Khối: Tên sách - Tác giả */}
        <View style={styles.titleAuthorCard}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: <Text style={styles.authorBold}>{book.author}</Text></Text>
        </View>

        {/* Khối: Giá */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Giá bán:</Text>
          <Text style={styles.priceValue}>{book.price}</Text>
        </View>

        {/* Khối: Các dòng mô tả dài */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionHeading}>Mô tả nội dung</Text>
          <Text style={styles.descriptionBody}>{LONG_DESCRIPTION}</Text>
        </View>
      </ScrollView>

      {/* 
        =======================================================================
        3. [CUỐI CỐ ĐỊNH]: Thêm vào giỏ - cố định, ngoài ScrollView
        flexDirection: 'row', justifyContent: 'space-between', KHÔNG nằm trong ScrollView
        =======================================================================
      */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceGroup}>
          <Text style={styles.totalPriceLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalPriceValue}>{book.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E', // Đồng bộ màu status bar với Header
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#1A237E',
  },
  backButton: { padding: 4 },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  rightAction: { padding: 4 },

  // 1. Khung chứa ảnh bìa lớn cố định phía trên, nằm ngoài ScrollView
  topFixedSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  // alignSelf: 'center', width theo %, aspectRatio giữ chuẩn tỉ lệ sách
  coverWrapper: {
    position: 'relative',
    alignSelf: 'center',
    width: '42%', // Chiếm 42% chiều ngang màn hình
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  largeCoverImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // 2. ScrollView riêng (flex: 1) — mô tả dài
  scrollView: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  // Khối Tên sách - Tác giả
  titleAuthorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 23,
    marginBottom: 6,
  },
  author: {
    fontSize: 13,
    color: '#64748B',
  },
  authorBold: {
    color: '#334155',
    fontWeight: '600',
  },

  // Khối Giá
  priceCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#059669', // Viền xanh lá như trong hình sơ đồ
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#065F46',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#059669',
  },

  // Khối Mô tả dài
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  descriptionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  descriptionBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 21,
  },

  // 3. Thanh Thêm vào giỏ: cố định, ngoài ScrollView
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#1A237E', // Viền xanh navy như trong hình sơ đồ
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomPriceGroup: {
    justifyContent: 'center',
  },
  totalPriceLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1A237E',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BookDetailScreen;
