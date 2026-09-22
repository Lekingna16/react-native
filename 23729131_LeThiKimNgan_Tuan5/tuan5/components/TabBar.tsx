import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabKey = 'home' | 'categories' | 'cart' | 'profile';

interface TabBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
  positionMode?: 'static' | 'absolute'; // Hỗ trợ cả 2 cách theo yêu cầu bài học
}

interface TabItem {
  key: TabKey;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  {
    key: 'home',
    label: 'Trang chủ',
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
  },
  {
    key: 'categories',
    label: 'Danh mục',
    activeIcon: 'grid',
    inactiveIcon: 'grid-outline',
  },
  {
    key: 'cart',
    label: 'Giỏ hàng',
    activeIcon: 'cart',
    inactiveIcon: 'cart-outline',
  },
  {
    key: 'profile',
    label: 'Tài khoản',
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
  },
];

export const TabBar: React.FC<TabBarProps> = ({
  activeTab = 'home',
  onTabPress,
  positionMode = 'static',
}) => {
  const [currentTab, setCurrentTab] = useState<TabKey>(activeTab);

  const handlePress = (tabKey: TabKey) => {
    setCurrentTab(tabKey);
    console.log(`[LOG TabBar] Người dùng chuyển sang tab: "${tabKey}"`);
    onTabPress?.(tabKey);
  };

  return (
    // • Container tab bar: flexDirection: 'row', có thể đặt static hoặc position: 'absolute'
    <View
      style={[
        styles.tabBarContainer,
        positionMode === 'absolute' && styles.absolutePosition,
      ]}
    >
      {TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          // • Mỗi mục: flex: 1 để chia đều 4 phần bằng nhau,
          //   flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handlePress(tab.key)}
            activeOpacity={0.7}
          >
            {/* Icon phía trên */}
            <Ionicons
              name={isActive ? tab.activeIcon : tab.inactiveIcon}
              size={24}
              color={isActive ? '#1A237E' : '#94A3B8'}
            />

            {/* Chữ phía dưới, mục đang chọn có màu nổi bật */}
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  // Yêu cầu kỹ thuật:
  // • Container tab bar: flexDirection: 'row', mỗi mục flex: 1 để chia đều 4 phần bằng nhau
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    // Đổ bóng nhẹ phía trên thanh tab
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  // Chế độ position: 'absolute' ở đáy màn hình
  absolutePosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  // Yêu cầu kỹ thuật:
  // • Mỗi mục: flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 11,
  },
  activeTabLabel: {
    color: '#1A237E', // Màu Navy nổi bật khi chọn
    fontWeight: 'bold',
  },
  inactiveTabLabel: {
    color: '#94A3B8', // Màu xám nhạt khi không chọn
    fontWeight: '500',
  },
});

export default TabBar;
