import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  // Ghi log khi tương tác theo yêu cầu bài tập
  const handleLogoPress = () => {
    console.log('[LOG] Đã nhấn vào Logo/Tên ứng dụng BookStore');
  };

  const handleSearchPress = () => {
    console.log('[LOG] Đã nhấn vào Icon Tìm kiếm (Search)');
  };

  const handleCartPress = () => {
    console.log('[LOG] Đã nhấn vào Icon Giỏ hàng (Cart)');
  };

  return (
    <View style={styles.headerContainer}>
      {/* Bên trái: Logo và Tên app */}
      <TouchableOpacity 
        style={styles.leftContainer} 
        onPress={handleLogoPress}
        activeOpacity={0.7}
      >
        <Ionicons name="book" size={24} color="#FFD700" style={styles.logoIcon} />
        <Text style={styles.appTitle}>BookStore</Text>
      </TouchableOpacity>

      {/* Bên phải: Hai icon tìm kiếm và giỏ hàng trong một View con */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.7}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCartPress} activeOpacity={0.7}>
          <Ionicons name="cart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Yêu cầu kỹ thuật:
  // • Container header dùng flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'.
  // • Padding ngang 16, chiều cao cố định 56.
  // • Nền header dùng màu navy/indigo theo bảng màu chung của khóa học.
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#1A237E', // Màu Navy/Indigo
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 8,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Gợi ý: Hai icon bên phải đặt trong một View con dùng flexDirection: 'row' với khoảng cách (gap hoặc marginLeft).
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Khoảng cách giữa 2 icon bên phải
  },
});

export default Header;
