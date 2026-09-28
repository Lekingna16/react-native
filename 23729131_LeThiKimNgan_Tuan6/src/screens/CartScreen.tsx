import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { CartNavigationProp } from '../navigation/types';
import { BOOKS_DATA } from '../data/books';
import { useCart } from '../hooks/useCart';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartNavigationProp>();
  const {
    items,
    totalQuantity,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    navigation.navigate('CheckoutScreen', { totalAmount });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
          <Text style={styles.headerSubtitle}>
            {totalQuantity} sản phẩm đã chọn
          </Text>
        </View>
        {items.length > 0 && (
          <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={72} color="#cccccc" />
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptySubtext}>
            Hãy thêm vài cuốn sách thú vị vào giỏ hàng nhé!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.bookId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const book = BOOKS_DATA.find((b) => b.id === item.bookId);
              if (!book) return null;

              return (
                <View style={styles.cartCard}>
                  <Image
                    source={{ uri: book.coverImage }}
                    style={styles.bookCover}
                  />
                  <View style={styles.bookInfo}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {book.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.bookId)}
                        style={styles.deleteBtn}
                      >
                        <Ionicons name="trash-outline" size={18} color="#999" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.bookPrice}>
                      {book.price.toLocaleString('vi-VN')} đ
                    </Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.bookId, -1)}
                      >
                        <Ionicons name="remove" size={16} color="#333" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item.bookId, 1)}
                      >
                        <Ionicons name="add" size={16} color="#333" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          {/* Checkout Bar */}
          <View style={styles.checkoutBar}>
            <View>
              <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
              <Text style={styles.totalValue}>
                {totalAmount.toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.8}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutBtnText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 2,
  },
  clearBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearBtnText: {
    fontSize: 13,
    color: '#ff3b30',
  },
  listContent: {
    padding: 14,
    paddingBottom: 90,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  bookCover: {
    width: 65,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bookTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginRight: 8,
  },
  deleteBtn: {
    padding: 2,
  },
  bookPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#d32f2f',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#444',
  },
  emptySubtext: {
    marginTop: 6,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: '#777',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  checkoutBtn: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});
