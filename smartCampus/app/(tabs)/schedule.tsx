import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CourseCard } from '@/components/campus/CourseCard';
import { HeaderBar } from '@/components/campus/HeaderBar';
import { ResponsiveCourseGrid } from '@/components/campus/ResponsiveCourseGrid';
import { ScheduleItem } from '@/components/campus/ScheduleItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * ScheduleScreen Component (Màn hình Lịch học & Khóa học Sinh viên)
 * 
 * Demonstrates 6 CourseCard Image Handling Cases & Responsive Flexbox Course Grid:
 * 1. Flexbox Grid Properties: Uses flexBasis ('45%'), minWidth (150), maxWidth (360), flexGrow (1), 
 *    and flexWrap ('wrap') for fluid multi-column grid responsiveness without manual width math.
 */
export default function ScheduleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <HeaderBar title="Lịch học SmartCampus" />

        {/* Section 1: Today's Schedule List */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Lịch học hôm nay
          </ThemedText>
          <View style={styles.dayBadge}>
            <ThemedText style={styles.dayBadgeText}>Thứ 2</ThemedText>
          </View>
        </View>

        <ScheduleItem
          startTime="08:00"
          endTime="09:30"
          subjectName="Toán cao cấp"
          roomInfo="Phòng 204"
          teacherInfo="Nguyễn Văn A"
          roomBadge="204"
        />

        <ScheduleItem
          startTime="10:00"
          endTime="11:30"
          subjectName="Cơ sở dữ liệu"
          roomInfo="Phòng 312"
          teacherInfo="Trần Thị B"
          roomBadge="312"
        />

        <ScheduleItem
          startTime="13:30"
          endTime="15:00"
          subjectName="Thiết kế UX/UI"
          roomInfo="Phòng 105"
          teacherInfo="Lê Văn C"
          roomBadge="105"
        />

        {/* Section 2: Responsive Flexbox Grid (flexBasis, minWidth, maxWidth, flexGrow, wrap) */}
        <View style={styles.sectionCard}>
          {/* <View style={styles.sectionHeaderColumn}>
            <ThemedText style={styles.sectionTitle}>
              Lưới học phần (Responsive Flexbox Grid)
            </ThemedText>
            <View style={styles.dayBadge}>
              <ThemedText style={styles.dayBadgeText}>Flexbox: flexBasis • minWidth • maxWidth • flexGrow</ThemedText>
            </View>
          </View> */}

          <ResponsiveCourseGrid
            onCoursePress={(course) => alert(`Đã chọn môn học: ${course.title}`)}
          />
        </View>

        {/* Section 3: Featured Courses (Demonstrating all 6 CourseCard Image Cases) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderColumn}>
            <ThemedText style={styles.sectionTitle}>
              Danh sách khóa học học phần
            </ThemedText>
            <View style={styles.dayBadge}>
              <ThemedText style={styles.dayBadgeText}>6 Trường hợp xử lý ảnh</ThemedText>
            </View>
          </View>

          {/* 1. Local Image Case */}
          <CourseCard
            title="Lập trình React Native & Expo"
            instructor="TS. Nguyễn Văn A"
            room="Phòng 204"
            schedule="08:00 - 09:30"
            imageSource={require('@/assets/images/react-logo.png')}
            imageType="informative"
            imageAlt="Logo môn học React Native"
            onPress={() => alert('Chi tiết môn Lập trình React Native')}
          />

          {/* 2. Remote Image Case */}
          <CourseCard
            title="Hệ quản trị Cơ sở dữ liệu SQL"
            instructor="ThS. Trần Thị B"
            room="Phòng 312"
            schedule="10:00 - 11:30"
            imageSource="https://picsum.photos/200"
            imageType="informative"
            imageAlt="Ảnh minh họa môn Cơ sở dữ liệu"
            onPress={() => alert('Chi tiết môn Cơ sở dữ liệu')}
          />

          {/* 3. Loading State Case */}
          <CourseCard
            title="Thiết kế Giao diện UX/UI (Đang tải ảnh)"
            instructor="TS. Lê Văn C"
            room="Phòng 105"
            schedule="13:30 - 15:00"
            imageSource="https://picsum.photos/201"
            forceLoading={true}
            imageType="informative"
            imageAlt="Ảnh môn học UX/UI đang tải"
            onPress={() => alert('Chi tiết môn UX/UI')}
          />

          {/* 4. Failed Image Case (Triggers Graceful Fallback Icon) */}
          <CourseCard
            title="Trí tuệ nhân tạo (Ảnh lỗi - Fallback)"
            instructor="GS. Phạm Hoàng D"
            room="Phòng 402"
            schedule="15:15 - 17:00"
            imageSource="https://invalid-domain.example/nonexistent-image.png"
            imageType="informative"
            imageAlt="Ảnh môn AI bị lỗi"
            onPress={() => alert('Chi tiết môn Trí tuệ nhân tạo (Fallback)')}
          />

          {/* 5. Informative Image Case */}
          <CourseCard
            title="An toàn Thông tin & Bảo mật"
            instructor="ThS. Đỗ Anh E"
            room="Lab 201"
            schedule="Thứ 3 • 08:00"
            imageSource={require('@/assets/images/react-logo.png')}
            imageType="informative"
            imageAlt="Ảnh minh họa thông tin bài giảng An toàn thông tin"
            onPress={() => alert('Chi tiết môn An toàn Thông tin')}
          />

          {/* 6. Decorative Image Case (Screen Reader Bypasses Image) */}
          <CourseCard
            title="Phân tích Thiết kế Hệ thống (Ảnh trang trí)"
            instructor="TS. Vũ Minh F"
            room="Phòng 501"
            schedule="Thứ 4 • 10:00"
            imageSource={require('@/assets/images/react-logo.png')}
            imageType="decorative"
            onPress={() => alert('Chi tiết môn Phân tích Hệ thống')}
          />
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
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    flexShrink: 1,
  },
  dayBadge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  dayBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 14,
    marginVertical: 12,
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
});
