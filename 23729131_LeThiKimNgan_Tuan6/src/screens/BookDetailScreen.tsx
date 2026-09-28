import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { BookDetailRouteProp, BookDetailNavigationProp } from '../navigation/types';
import { BOOKS_DATA } from '../data/books';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export const BookDetailScreen: React.FC = () => {
  const route = useRoute<BookDetailRouteProp>();
  const navigation = useNavigation<BookDetailNavigationProp>();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Extract bookId passed via route.params
  const { bookId } = route.params || {};
  const book = BOOKS_DATA.find((b) => b.id === bookId) || BOOKS_DATA[0];
  const isFavorite = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book.id);
    Alert.alert('Thành công', `Đã thêm "${book.title}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    addToCart(book.id);
    (navigation as any).navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image & Favorite Button */}
        <View style={styles.imageContainer}>
          <View style={styles.coverWrapper}>
            <Image
              source={{ uri: book.coverImage }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.favoriteFab}
              onPress={() => toggleWishlist(book.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#ff3b30' : '#666666'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Header Info */}
        <View style={styles.detailsCard}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{book.category}</Text>
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: <Text style={styles.authorHighlight}>{book.author}</Text></Text>

          {/* Rating & Reviews */}
          <View style={styles.ratingSection}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color={star <= Math.floor(book.rating) ? '#f5a623' : '#e0e0e0'}
                />
              ))}
              <Text style={styles.ratingNumber}>{book.rating}</Text>
            </View>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.reviewsCount}>{book.reviewsCount} đánh giá</Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.statusInStock}>Còn hàng</Text>
          </View>

          {/* Price Box */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {book.price.toLocaleString('vi-VN')} đ
            </Text>
            {Boolean(book.originalPrice && book.originalPrice > book.price) && (
              <>
                <Text style={styles.originalPriceText}>
                  {book.originalPrice?.toLocaleString('vi-VN')} đ
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    -{Math.round(((book.originalPrice! - book.price) / book.originalPrice!) * 100)}%
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Parameter Details Table */}
          <View style={styles.specsTable}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Mã sách (ID):</Text>
              <Text style={styles.specValue}>{book.id}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Nhà xuất bản:</Text>
              <Text style={styles.specValue}>{book.publisher}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Số trang:</Text>
              <Text style={styles.specValue}>{book.pages} trang</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Năm phát hành:</Text>
              <Text style={styles.specValue}>{book.publishedYear}</Text>
            </View>
          </View>

          {/* Book Description */}
          <View style={styles.descSection}>
            <Text style={styles.descTitle}>Giới thiệu nội dung</Text>
            <Text style={styles.descContent}>{book.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.8}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color="#007AFF" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowBtn}
          activeOpacity={0.8}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  coverWrapper: {
    position: 'relative',
  },
  coverImage: {
    width: 170,
    height: 240,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  favoriteFab: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  detailsCard: {
    padding: 16,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  tagText: {
    color: '#0288d1',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 26,
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  authorHighlight: {
    color: '#007AFF',
    fontWeight: '600',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginLeft: 4,
  },
  dotSeparator: {
    marginHorizontal: 8,
    color: '#bbb',
  },
  reviewsCount: {
    fontSize: 13,
    color: '#666',
  },
  statusInStock: {
    fontSize: 13,
    color: '#2e7d32',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  originalPriceText: {
    fontSize: 14,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  discountBadge: {
    marginLeft: 10,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  specsTable: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  specLabel: {
    fontSize: 13,
    color: '#777',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  descSection: {
    marginTop: 6,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  descContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  addToCartBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f0f7ff',
  },
  addToCartText: {
    color: '#007AFF',
    fontWeight: '700',
    fontSize: 14,
  },
  buyNowBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#d32f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
