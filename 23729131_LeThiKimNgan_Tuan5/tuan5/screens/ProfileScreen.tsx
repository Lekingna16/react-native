import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TabBar, { TabKey } from '../components/TabBar';

interface ProfileScreenProps {
  onTabPress?: (tab: TabKey) => void;
  activeTab?: TabKey;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onTabPress,
  activeTab = 'profile',
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản cá nhân</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Card thông tin người dùng */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Lê Thị Kim Ngân</Text>
            <Text style={styles.userSub}>MSSV: 23729131 • Lập trình React Native</Text>
            <View style={styles.badgeMember}>
              <Text style={styles.badgeMemberText}>Hội viên VIP BookStore</Text>
            </View>
          </View>
        </View>

        {/* Danh sách các chức năng cài đặt */}
        <View style={styles.menuCard}>
          {[
            { icon: 'receipt-outline', title: 'Lịch sử mua hàng' },
            { icon: 'bookmark-outline', title: 'Sách yêu thích' },
            { icon: 'location-outline', title: 'Địa chỉ nhận hàng' },
            { icon: 'card-outline', title: 'Phương thức thanh toán' },
            { icon: 'settings-outline', title: 'Cài đặt tài khoản' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => console.log(`[Profile] Chọn: ${item.title}`)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={20} color="#1A237E" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Tab Bar dùng chung */}
      <TabBar activeTab={activeTab} onTabPress={onTabPress} positionMode="static" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A237E',
  },
  header: {
    height: 50,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  userSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badgeMember: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  badgeMemberText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#B45309',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
});

export default ProfileScreen;
