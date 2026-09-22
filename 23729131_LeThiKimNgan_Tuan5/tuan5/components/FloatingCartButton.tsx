import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingCartButtonProps {
  cartCount?: number;
  onPress?: () => void;
  bottom?: number;
}

const BUTTON_SIZE = 56;

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  cartCount = 5,
  onPress,
  bottom = 24,
}) => {
  const handlePress = () => {
    console.log(`[LOG FloatingCart] Đã nhấn nút Giỏ hàng nổi | Số lượng sản phẩm: ${cartCount}`);
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[styles.floatingButton, { bottom }]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <Ionicons name="cart" size={26} color="#FFFFFF" />

      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {cartCount > 99 ? '99+' : cartCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default FloatingCartButton;
