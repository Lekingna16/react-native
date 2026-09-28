import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { CheckoutRouteProp, CheckoutNavigationProp } from '../navigation/types';

export const CheckoutScreen: React.FC = () => {
  const route = useRoute<CheckoutRouteProp>();
  const navigation = useNavigation<CheckoutNavigationProp>();

  // Extract totalAmount received via route.params
  const totalAmount = route.params?.totalAmount ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        {/* Success / Order Info Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="card-outline" size={44} color="#007AFF" />
        </View>

        <Text style={styles.screenTitle}>Xác nhận thanh toán</Text>
        <Text style={styles.screenDesc}>
          Khung màn hình thanh toán tối giản (Sẽ hoàn thiện chi tiết ở Tuần 9)
        </Text>

        {/* Card hiển thị Tổng tiền nhận từ route.params */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Tổng số tiền cần thanh toán:</Text>
          <Text style={styles.totalAmountText}>
            {totalAmount.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        {/* Placeholder Tuần 9 */}
        <View style={styles.placeholderBox}>
          <Ionicons name="construct-outline" size={20} color="#888888" />
          <Text style={styles.placeholderText}>
            Các mục địa chỉ giao hàng, phương thức thanh toán và mã giảm giá sẽ được phát triển ở Tuần 9.
          </Text>
        </View>

        {/* Back to Cart button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={18} color="#ffffff" />
          <Text style={styles.backButtonText}>Quay lại giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  screenDesc: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  totalAmountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  placeholderBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 14,
    gap: 10,
    marginBottom: 30,
  },
  placeholderText: {
    flex: 1,
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    gap: 8,
    width: '100%',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
