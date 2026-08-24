import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AnnouncementCard } from '@/components/campus/AnnouncementCard';
import { HeaderBar } from '@/components/campus/HeaderBar';
import { ScheduleItem } from '@/components/campus/ScheduleItem';
import { StatCard } from '@/components/campus/StatCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * SmartCampus Dashboard Screen (`app/(tabs)/index.tsx`)
 * 
 * Layout Architectural Decisions & Refactoring Log:
 * 1. Requirement 1 (Long Translated Strings & Font Size Increase):
 *    - Replaced all short labels with extended, descriptive Vietnamese strings across cards, headers, and notices.
 *    - Enlarged typography font sizes: body text 18px (lineHeight: 26px), subtitles 20-22px (lineHeight: 28-30px), 
 *      titles 28px (lineHeight: 36px), and stat metrics numbers 32px bold.
 * 2. Requirement 2 (Zero Fixed Heights & Repaired Text Wrapping):
 *    - Removed all rigid height bounds (`height: ...`). All card containers and headers use dynamic vertical 
 *      padding (`paddingVertical: 14-18px`) allowing cards to expand vertically according to content volume.
 *    - Text containers specify `flex: 1` and `flexShrink: 1` so long translated multi-line strings wrap 
 *      fluidly without pushing adjacent badge pills or action buttons off-screen.
 * 3. Requirement 3 (Component Modularization):
 *    - Encapsulates UI elements into clean, reusable component modules under `components/campus/` 
 *      (`HeaderBar`, `StatCard`, `ScheduleItem`, `AnnouncementCard`).
 */
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Bar with Long Translated Title & Action Buttons */}
        <HeaderBar
          title="Hệ Thống Quản Lý & Cổng Thông Tin Học Đường Thông Minh SmartCampus"
          onSearchPress={() => alert('Mở công cụ tìm kiếm thông tin sinh viên!')}
          onNotificationPress={() => alert('Mở danh sách thông báo sinh viên!')}
          unreadNotificationsCount={3}
        />

        {/* Top Metric Stat Cards Row (3 Cards with Long Translated Strings & Auto Wrapping) */}
        <View style={styles.statsRow}>
          <StatCard
            label="Điểm trung bình tích lũy học tập (GPA)"
            badgeText="8.5/10.0"
            value="8.5"
            subtext="Học kỳ 1 năm học hiện tại"
          />
          <StatCard
            label="Tổng số tín chỉ học phần đã tích lũy"
            badgeText="45 TCHPh"
            value="45"
            subtext="Tích lũy từ đầu khóa học"
          />
          <StatCard
            label="Số lượng thông báo mới chưa xử lý"
            badgeText="3 Tin mới"
            value="3"
            subtext="Chưa đọc hoặc cần giải quyết"
          />
        </View>

        {/* Section 1: Today's Schedule Card Section with Extended Text */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitleText}>
              Danh sách lịch học & Lịch trình giảng dạy chi tiết hôm nay
            </ThemedText>
            <View style={styles.dayBadge}>
              <ThemedText style={styles.dayBadgeText}>Thứ 2 - Tuần 12 (Học kỳ 1)</ThemedText>
            </View>
          </View>

          {/* Schedule Item List */}
          <View style={styles.scheduleList}>
            <ScheduleItem
              startTime="08:00"
              endTime="09:30"
              subjectName="Môn học: Toán cao cấp & Đại số tuyến tính nâng cao"
              roomInfo="Địa điểm: Phòng học 204"
              teacherInfo="TS. Nguyễn Văn A"
              roomBadge="Phòng 204"
            />

            <ScheduleItem
              startTime="10:00"
              endTime="11:30"
              subjectName="Môn học: Cơ sở dữ liệu & Hệ quản trị CSDL quan hệ"
              roomInfo="Địa điểm: Phòng máy 312"
              teacherInfo="ThS. Trần Thị B"
              roomBadge="Phòng 312"
            />

            <ScheduleItem
              startTime="13:30"
              endTime="15:00"
              subjectName="Môn học: Thiết kế Giao diện & Trải nghiệm Người dùng UX/UI"
              roomInfo="Địa điểm: Phòng hội trường 105"
              teacherInfo="TS. Lê Văn C"
              roomBadge="Phòng 105"
            />
          </View>
        </View>

        {/* Section 2: Detailed Announcement Notice Card with Full Paragraph Text */}
        <AnnouncementCard
          sectionTitle="Thông tin chi tiết & Cổng thông báo học tập quan trọng"
          sectionBadgeText="Thông báo mới nhất"
          announcementTitle="Thông báo Lịch thi giữa kỳ chính thức - Khoa Công nghệ Thông tin"
          description="Thông báo lịch thi giữa kỳ chi tiết dành cho tất cả sinh viên các lớp học phần thuộc Khoa Công nghệ Thông tin. Sinh viên vui lòng kiểm tra chính xác phòng thi, danh sách số báo danh và thời gian có mặt trên hệ thống trước ngày thi tối thiểu 1 ngày."
          dateTag="Ngày thi: 18/10/2026"
          timeTag="Thời gian có mặt: 08:00 sáng"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Main Viewport Container: Soft blue-gray dashboard background matching mockup image
  container: {
    flex: 1,
    backgroundColor: '#F2F5FF',
  },
  // Scroll View Content: Dynamic padding without fixed height constraints
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 16,
  },
  // Stats Row: Row flex layout distributing 3 metric cards evenly with flex stretch
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginVertical: 4,
  },
  // Section Card: White rounded card with dynamic height auto-expansion and overflow protection
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 14,
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
  // Section Header Row: Title on top, day badge pill below with clean vertical alignment
  sectionHeaderRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  // Section Title Text: Enlarged 20px bold font with multi-line auto wrapping
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
  },
  dayBadge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  dayBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  // Schedule List Container: vertical stack of schedule items
  scheduleList: {
    gap: 10,
  },
});
