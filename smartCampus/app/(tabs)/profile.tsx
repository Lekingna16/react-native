import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { HeaderBar } from '@/components/campus/HeaderBar';
import { StudentFeedbackForm } from '@/components/campus/StudentFeedbackForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconButton, PrimaryButton, SecondaryButton } from '@/components/ui/buttons';

/**
 * ProfileScreen Component (Màn hình Tài khoản & Biểu mẫu Sinh viên SmartCampus)
 */
export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HeaderBar title="Tài khoản cá nhân" />

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <ThemedText style={styles.avatarText}>SV</ThemedText>
          </View>
          <ThemedText style={styles.userName}>Nguyễn Văn A</ThemedText>
          <ThemedText style={styles.userCode}>MSSV: 20268888</ThemedText>
          <ThemedText style={styles.userFaculty}>Khoa Công nghệ Thông tin</ThemedText>
        </View>

        {/* Account Menu Items */}
        <View style={styles.menuSection}>
          <View style={styles.menuItem}>
            <ThemedText style={styles.menuText}>Thông tin cá nhân</ThemedText>
          </View>
          <View style={styles.menuItem}>
            <ThemedText style={styles.menuText}>Bảng điểm học tập</ThemedText>
          </View>
          <View style={styles.menuItem}>
            <ThemedText style={styles.menuText}>Cài đặt giao diện & Thông báo</ThemedText>
          </View>
        </View>

        {/* Student Feedback Form (Keyboard-Safe Structure Demo) */}
        <StudentFeedbackForm />

        {/* Pressable Buttons Demonstration Section */}
        <View style={styles.buttonDemoCard}>
          <View style={styles.sectionHeaderColumn}>
            <ThemedText style={styles.sectionTitle}>
              Hệ thống Nút bấm Pressable
            </ThemedText>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>4 Trạng thái • Giữ chuẩn kích thước</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.demoSubhead}>1. Nút chính (PrimaryButton)</ThemedText>
          <PrimaryButton
            title="Đăng ký học phần (Bình thường / Nhấn)"
            iconName="graduationcap.fill"
            onPress={() => alert('Đã nhấn Nút chính!')}
          />
          <PrimaryButton
            title="Đăng ký học phần (Trạng thái Focus)"
            iconName="graduationcap.fill"
            isFocusedDemo={true}
          />
          <PrimaryButton
            title="Đăng ký học phần (Đang tải...)"
            loading={true}
          />
          <PrimaryButton
            title="Đăng ký học phần (Vô hiệu hóa)"
            disabled={true}
          />

          <ThemedText style={styles.demoSubhead}>2. Nút phụ (SecondaryButton)</ThemedText>
          <SecondaryButton
            title="Xem chi tiết học phần (Bình thường / Nhấn)"
            iconName="magnifyingglass"
            onPress={() => alert('Đã nhấn Nút phụ!')}
          />
          <SecondaryButton
            title="Xem chi tiết học phần (Trạng thái Focus)"
            iconName="magnifyingglass"
            isFocusedDemo={true}
          />
          <SecondaryButton
            title="Xem chi tiết học phần (Đang tải...)"
            loading={true}
          />
          <SecondaryButton
            title="Xem chi tiết học phần (Vô hiệu hóa)"
            disabled={true}
          />

          <ThemedText style={styles.demoSubhead}>3. Nút biểu tượng (IconButton - 48x48px Target Size)</ThemedText>
          <View style={styles.iconButtonsRow}>
            <IconButton
              iconName="house.fill"
              onPress={() => alert('Đã nhấn Nút biểu tượng Trang chủ!')}
              accessibilityLabel="Trang chủ"
            />
            <IconButton
              iconName="calendar"
              isFocusedDemo={true}
              accessibilityLabel="Lịch học focus"
            />
            <IconButton
              iconName="bell.fill"
              loading={true}
              accessibilityLabel="Đang tải thông báo"
            />
            <IconButton
              iconName="person.fill"
              disabled={true}
              accessibilityLabel="Tài khoản vô hiệu hóa"
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FF',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
    gap: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  userCode: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  userFaculty: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 8,
    gap: 4,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    marginVertical: 2,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  buttonDemoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  sectionHeaderColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
  },
  badge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  demoSubhead: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 8,
    marginBottom: 4,
  },
  iconButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 12,
    marginVertical: 4,
  },
});
