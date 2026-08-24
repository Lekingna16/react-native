import React, { useState } from 'react';
import {
  ListRenderItem,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { AnnouncementCard } from '@/components/campus/AnnouncementCard';
import { HeaderBar } from '@/components/campus/HeaderBar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

/**
 * Announcement Item Interface
 */
export interface AnnouncementItemData {
  id: string;
  sectionTitle: string;
  sectionBadgeText: string;
  announcementTitle: string;
  description: string;
  dateTag: string;
  timeTag: string;
}

/**
 * Grouped Section Interface
 */
export interface AnnouncementSection {
  title: string;
  data: AnnouncementItemData[];
}

/**
 * Grouped Announcement Mock Data (Today, This Week, Earlier)
 */
const GROUPED_ANNOUNCEMENTS: AnnouncementSection[] = [
  {
    title: 'Hôm nay (Today)',
    data: [
      {
        id: 'ann-1',
        sectionTitle: 'Thông tin chi tiết & Lịch thi',
        sectionBadgeText: 'Hôm nay',
        announcementTitle: 'Thông báo Lịch thi giữa kỳ chính thức - Khoa Công nghệ Thông tin',
        description: 'Thông báo lịch thi giữa kỳ chi tiết dành cho tất cả sinh viên các lớp học phần thuộc Khoa Công nghệ Thông tin. Sinh viên kiểm tra chính xác phòng thi và SBD.',
        dateTag: 'Ngày thi: 18/10/2026',
        timeTag: '08:00 sáng',
      },
      {
        id: 'ann-2',
        sectionTitle: 'Phòng Đào tạo',
        sectionBadgeText: 'Hạn chót',
        announcementTitle: 'Hạn cuối xác nhận đăng ký học phần bổ sung Học kỳ 1',
        description: 'Sinh viên hoàn tất kiểm tra danh sách môn học và hoàn thành lệ phí trước 17:00 chiều nay.',
        dateTag: 'Hôm nay',
        timeTag: '17:00',
      },
    ],
  },
  {
    title: 'Tuần này (This Week)',
    data: [
      {
        id: 'ann-3',
        sectionTitle: 'Hoạt động sinh viên',
        sectionBadgeText: 'Sự kiện tuần',
        announcementTitle: 'Hội thảo Định hướng NGHỀ NGHIỆP IT & Công nghệ 2026',
        description: 'Tham gia hội thảo hướng nghiệp kết nối doanh nghiệp công nghệ hàng đầu. Đăng ký tham dự trực tuyến ngay trên ứng dụng SmartCampus.',
        dateTag: 'Thứ 6 • 22/10',
        timeTag: '14:00',
      },
      {
        id: 'ann-4',
        sectionTitle: 'Thư viện trung tâm',
        sectionBadgeText: 'Tài nguyên',
        announcementTitle: 'Mở rộng giờ phục vụ Phòng đọc & Thư viện số',
        description: 'Thư viện tăng cường mở cửa phục vụ sinh viên đến 22:00 hàng ngày nhằm hỗ trợ ôn thi giữa kỳ.',
        dateTag: 'Trong tuần',
        timeTag: '22:00',
      },
    ],
  },
  {
    title: 'Trước đó (Earlier)',
    data: [
      {
        id: 'ann-5',
        sectionTitle: 'Y tế & Sức khỏe',
        sectionBadgeText: 'Lưu trữ',
        announcementTitle: 'Kế hoạch khám sức khỏe định kỳ đầu khóa năm học 2026',
        description: 'Sinh viên toàn trường thực hiện khám sức khỏe bắt buộc theo lịch phân bổ từng lớp tại Trạm Y tế cơ sở 1.',
        dateTag: '05/10/2026',
        timeTag: 'Đã hoàn thành',
      },
    ],
  },
];

/**
 * NotificationsScreen Component (Refactored to SectionList grouped by Today, This Week, Earlier)
 * 
 * Sticky Section Header Analysis under Narrow Width & Large Text Conditions:
 * -------------------------------------------------------------------------
 * Question: Do sticky section headers improve the screen at narrow width and large text?
 * Answer & UX Breakdown:
 * 1. Narrow Screen Width (~320px - 360px): At small viewports, sticky headers (`stickySectionHeadersEnabled={true}`)
 *    pin at the top of the list while scrolling. When font sizes are enlarged for accessibility (large text mode),
 *    the sticky header text wraps into 2-3 vertical lines, creating a tall pinned header box (80px - 120px height).
 * 2. Letterbox Effect: A 100px pinned sticky header consumes 15% - 20% of the visible vertical reading space.
 *    On narrow mobile screens, this starves the viewport and forces the user to read announcement content through 
 *    a constricted "letterbox" scrolling area.
 * 3. Accessibility Recommendation: Setting `stickySectionHeadersEnabled={false}` (allowing section headers to scroll
 *    naturally with list items) liberates vertical screen real estate, eliminates letterbox choking, and delivers 
 *    a vastly superior reading experience when combined with large text and narrow screen bounds.
 */
export default function NotificationsScreen() {
  const [sections, setSections] = useState<AnnouncementSection[]>(GROUPED_ANNOUNCEMENTS);
  const [isStickyEnabled, setIsStickyEnabled] = useState<boolean>(false);

  const toggleEmptyState = () => {
    setSections((prev) => (prev.length > 0 ? [] : GROUPED_ANNOUNCEMENTS));
  };

  const toggleStickyMode = () => {
    setIsStickyEnabled((prev) => !prev);
  };

  /**
   * Typed renderItem Callback
   */
  const renderAnnouncementItem: ListRenderItem<AnnouncementItemData> = ({ item }) => (
    <AnnouncementCard
      sectionTitle={item.sectionTitle}
      sectionBadgeText={item.sectionBadgeText}
      announcementTitle={item.announcementTitle}
      description={item.description}
      dateTag={item.dateTag}
      timeTag={item.timeTag}
    />
  );

  /**
   * Typed renderSectionHeader Callback
   */
  const renderSectionHeader = ({ section: { title } }: { section: AnnouncementSection }) => (
    <View style={styles.sectionHeaderBox}>
      <ThemedText style={styles.sectionHeaderText}>{title}</ThemedText>
    </View>
  );

  /**
   * Typed keyExtractor Function
   */
  const keyExtractor = (item: AnnouncementItemData): string => item.id;

  /**
   * Item Separator
   */
  const renderSeparator = () => <View style={styles.separator} />;

  /**
   * List Header Component
   */
  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      <HeaderBar title="Thông báo SmartCampus" />

      <View style={styles.sectionHeaderColumn}>
        <ThemedText style={styles.mainTitleText}>
          Cổng thông báo tin tức phân nhóm ({sections.reduce((acc, s) => acc + s.data.length, 0)})
        </ThemedText>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleStickyMode}
            activeOpacity={0.8}>
            <ThemedText style={styles.actionButtonText}>
              {isStickyEnabled ? 'Sticky Header: Bật (Pha trộn)' : 'Sticky Header: Tắt (Tối ưu)'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.toggleEmptyButton]}
            onPress={toggleEmptyState}
            activeOpacity={0.8}>
            <ThemedText style={styles.actionButtonText}>
              {sections.length > 0 ? 'Thử danh sách rỗng' : 'Tải lại danh sách'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  /**
   * List Footer Component
   */
  const renderListFooter = () => {
    if (sections.length === 0) return null;
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerBadge}>
          <ThemedText style={styles.footerBadgeText}>
            Đã hiển thị tất cả thông báo phân nhóm theo mốc thời gian
          </ThemedText>
        </View>
      </View>
    );
  };

  /**
   * List Empty Component
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBadge}>
        <IconSymbol name="bell.fill" size={32} color="#94A3B8" />
      </View>
      <ThemedText style={styles.emptyTitle}>Chưa có thông báo phân nhóm nào</ThemedText>
      <ThemedText style={styles.emptyDescription}>
        Hiện tại không có thông báo mới nào từ hệ thống. Bạn vui lòng quay lại sau.
      </ThemedText>
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={toggleEmptyState}
        activeOpacity={0.8}>
        <ThemedText style={styles.reloadButtonText}>Tải lại thông báo</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderAnnouncementItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={isStickyEnabled}
        SectionSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FF',
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 12,
    gap: 8,
  },
  sectionHeaderColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: 4,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  toggleEmptyButton: {
    backgroundColor: '#E2E8F0',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  // Section Header Box: sticky/non-sticky section header bar styling
  sectionHeaderBox: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  separator: {
    height: 6,
  },
  footerContainer: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  footerBadge: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  footerBadgeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12,
    overflow: 'hidden',
  },
  emptyIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  reloadButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  reloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
