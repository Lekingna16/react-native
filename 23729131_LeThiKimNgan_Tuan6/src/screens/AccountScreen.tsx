import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';

export const AccountScreen: React.FC = () => {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { wishlistCount } = useWishlist();

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  const handleLogin = () => {
    login();
    Alert.alert('Thành công', 'Đăng nhập thành công với tài khoản mẫu!');
  };

  const menuItems = [
    {
      id: '1',
      title: 'Đơn hàng của tôi',
      icon: 'receipt-outline' as const,
      badge: '2 đơn',
    },
    {
      id: '2',
      title: 'Sách đã lưu / Yêu thích',
      icon: 'heart-outline' as const,
      badge: `${wishlistCount} cuốn`,
      badgeColor: '#ff3b30',
    },
    {
      id: '3',
      title: 'Địa chỉ nhận hàng',
      icon: 'location-outline' as const,
    },
    {
      id: '4',
      title: 'Phương thức thanh toán',
      icon: 'card-outline' as const,
    },
    {
      id: '5',
      title: 'Cài đặt tài khoản',
      icon: 'settings-outline' as const,
    },
    {
      id: '6',
      title: 'Trợ giúp & Hỗ trợ',
      icon: 'help-circle-outline' as const,
    },
  ];

  const guestMenuItems = [
    {
      id: 'g1',
      title: 'Giới thiệu về Nhà Sách',
      icon: 'information-circle-outline' as const,
    },
    {
      id: 'g2',
      title: 'Điều khoản & Chính sách',
      icon: 'document-text-outline' as const,
    },
    {
      id: 'g3',
      title: 'Trung tâm trợ giúp & Hotline',
      icon: 'call-outline' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Title */}
        <View style={styles.screenHeader}>
          <Text style={styles.headerTitle}>Tài khoản</Text>
          <View style={styles.statusPill}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isLoggedIn ? '#34c759' : '#8e8e93' },
              ]}
            />
            <Text style={styles.statusPillText}>
              {isLoggedIn ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
            </Text>
          </View>
        </View>

        {isLoggedIn && user ? (
          /* ================= GIAO DIỆN ĐÃ ĐĂNG NHẬP ================= */
          <>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name
                    .split(' ')
                    .slice(-2)
                    .map((n) => n[0])
                    .join('')}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                {user.membershipTier && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{user.membershipTier}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Menu List */}
            <View style={styles.menuContainer}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon} size={22} color="#007AFF" />
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.menuRight}>
                    {Boolean(item.badge) && (
                      <View
                        style={[
                          styles.menuBadge,
                          item.badgeColor
                            ? { backgroundColor: item.badgeColor + '15' }
                            : {},
                        ]}
                      >
                        <Text
                          style={[
                            styles.menuBadgeText,
                            item.badgeColor ? { color: item.badgeColor } : {},
                          ]}
                        >
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={18} color="#bbb" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* ================= GIAO DIỆN CHƯA ĐĂNG NHẬP ================= */
          <>
            {/* Guest Banner Card */}
            <View style={styles.guestCard}>
              <View style={styles.guestAvatar}>
                <Ionicons name="person-outline" size={36} color="#888888" />
              </View>
              <Text style={styles.guestTitle}>Chào mừng bạn đến với Nhà Sách!</Text>
              <Text style={styles.guestSubtitle}>
                Đăng nhập để theo dõi đơn hàng, lưu danh sách yêu thích và nhận ưu đãi độc quyền.
              </Text>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Ionicons name="log-in-outline" size={20} color="#ffffff" />
                <Text style={styles.loginBtnText}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>

            {/* Guest Menu List */}
            <View style={styles.menuContainer}>
              {guestMenuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon} size={22} color="#007AFF" />
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#bbb" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusPillText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  userEmail: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff4e5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#ff9800',
    fontWeight: '700',
  },
  guestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  guestAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#f2f3f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  guestTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  guestSubtitle: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  menuBadgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ffd2d2',
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 15,
    fontWeight: '700',
  },
});
