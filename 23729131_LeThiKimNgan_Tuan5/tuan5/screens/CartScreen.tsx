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
import TabBar, { TabKey } from '../components/TabBar';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  coverUrl: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    price: 86000,
    quantity: 1,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    price: 79000,
    quantity: 2,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu?',
    price: 95000,
    quantity: 1,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
  },
  {
    id: '4',
    title: 'Hành Trình Về Phương Đông',
    price: 110000,
    quantity: 1,
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300',
  },
];

interface CartScreenProps {
  onTabPress?: (tab: TabKey) => void;
  activeTab?: TabKey;
}

/**
 * Bài tập 2: Màn hình Giỏ hàng (Cart Screen)
 * 
 * Cấu trúc phân cấp 3 VÙNG độc lập, không chồng lấp:
 * SafeAreaView (flex: 1)
 *  ├── VÙNG 1: ScrollView (flex: 1) — Danh sách sản phẩm cuộn được
 *  ├── VÙNG 2: Thanh tổng tiền + Thanh toán — KHÔNG CUỘN, cố định ngay trên tab bar
 *  └── VÙNG 3: Tab Bar (Bài tập 1) — Cố định ở đáy màn hình
 */
export const CartScreen: React.FC<CartScreenProps> = ({
  onTabPress,
  activeTab = 'cart',
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  // Tăng giảm số lượng
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log(
      `[LOG CartScreen] Tiến hành thanh toán! Tổng số tiền: ${totalPrice.toLocaleString('vi-VN')} đ`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header Giỏ hàng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng ({cartItems.length})</Text>
      </View>

      {/* 
        =======================================================================
        VÙNG 1: Danh sách sản phẩm — CUỘN ĐƯỢC (ScrollView, flex: 1)
        =======================================================================
      */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          // Yêu cầu kỹ thuật:
          // Mỗi dòng: flexDirection: 'row', alignItems: 'center'
          // Ảnh cố định, tên flex: 1, giá width cố định
          <View key={item.id} style={styles.cartRow}>
            {/* 1. Ảnh nhỏ kích thước cố định */}
            <Image source={{ uri: item.coverUrl }} style={styles.itemImage} />

            {/* 2. Phần thông tin giữa: flex: 1 (tên sản phẩm + số lượng) */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>

              {/* Bộ chỉnh số lượng SL: 1 */}
              <View style={styles.quantityWrapper}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, -1)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="remove" size={14} color="#475569" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>SL: {item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, 1)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={14} color="#475569" />
                </TouchableOpacity>
              </View>
            </View>

            {/* 3. Giá: width cố định (Khung viền xanh lá chuẩn theo sơ đồ) */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {(item.price * item.quantity).toLocaleString('vi-VN')} đ
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 
        =======================================================================
        VÙNG 2: Tổng tiền + nút 'Thanh toán'
        KHÔNG CUỘN — Cố định ngay trên Tab Bar (flexDirection: 'row', justifyContent: 'space-between')
        =======================================================================
      */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalGroup}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalAmount}>
            {totalPrice.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 
        =======================================================================
        VÙNG 3: Tab Bar (Bài tập 1) — Cố định ở đáy màn hình
        =======================================================================
      */}
      <TabBar
        activeTab={activeTab}
        onTabPress={onTabPress}
        positionMode="static"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Container ngoài cùng bao bọc toàn màn hình (flex: 1)
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E', // Đồng bộ màu status bar
  },
  header: {
    height: 50,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#312E81',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // VÙNG 1: Danh sách sản phẩm cuộn được
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingVertical: 12,
    gap: 10,
  },
  // Mỗi dòng sản phẩm: flexDirection: 'row', alignItems: 'center'
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  // 1. Ảnh nhỏ kích thước cố định
  itemImage: {
    width: 60,
    height: 75,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  // 2. Cột thông tin: flex: 1 để chia tỉ lệ hợp lý
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    marginLeft: 12,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 18,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  // 3. Khung giá: width cố định (hộp màu xanh lá chuẩn theo sơ đồ)
  priceContainer: {
    width: 85,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#059669', // Viền xanh lá như trong hình vẽ
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
  },

  // VÙNG 2: Phần tổng tiền + nút 'Thanh toán' CỐ ĐỊNH ngay trên Tab Bar
  checkoutBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderTopColor: '#1A237E', // Viền xanh navy như trong sơ đồ
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalGroup: {
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1A237E',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CartScreen;
