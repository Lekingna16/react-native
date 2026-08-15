import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export interface GridCourseItemData {
  id: string;
  title: string;
  instructor: string;
  room: string;
  schedule: string;
}

const MOCK_GRID_COURSES: GridCourseItemData[] = [
  {
    id: 'c1',
    title: 'Lập trình React Native & Expo SDK 54',
    instructor: 'TS. Nguyễn Văn A',
    room: 'Phòng 204',
    schedule: '08:00 - 09:30',
  },
  {
    id: 'c2',
    title: 'Cơ sở dữ liệu & SQL nâng cao',
    instructor: 'ThS. Trần Thị B',
    room: 'Phòng 312',
    schedule: '10:00 - 11:30',
  },
  {
    id: 'c3',
    title: 'Thiết kế Giao diện UX/UI Mobile App',
    instructor: 'TS. Lê Văn C',
    room: 'Phòng 105',
    schedule: '13:30 - 15:00',
  },
  {
    id: 'c4',
    title: 'Trí tuệ nhân tạo & Khai phá dữ liệu',
    instructor: 'GS. Phạm Hoàng D',
    room: 'Lab 402',
    schedule: '15:15 - 17:00',
  },
];

interface ResponsiveCourseGridProps {
  courses?: GridCourseItemData[];
  onCoursePress?: (course: GridCourseItemData) => void;
}

/**
 * ResponsiveCourseGrid Component
 * 
 * Pure Flexbox Grid Layout & Technical Comparison:
 * ------------------------------------------------
 * Flexbox Properties Used:
 * - `flexWrap: 'wrap'`: Enables multi-column row wrapping across viewports.
 * - `flexBasis: '45%'`: Provides target base width for each grid item before flex distribution.
 * - `minWidth: 150`: Enforces minimum width floor so cards never shrink tightly on small phones.
 * - `maxWidth: 360`: Enforces maximum width ceiling so cards never stretch excessively on tablets.
 * - `flexGrow: 1`: Fluidly distributes remaining row space evenly among cards.
 * 
 * Technical Comparison vs Manual Width Arithmetic (`Dimensions.get('window').width`):
 * 1. Maintainability & Simplicity: Manual arithmetic requires `const cardWidth = (width - padding*2 - gap)/2` 
 *    which breaks when changing column counts or card margins. Pure Flexbox is purely declarative.
 * 2. Orientation & Screen Resizing: Manual width snapshot calculated at mount breaks during device rotation, 
 *    foldable screen unfolding, or split-screen multitasking unless expensive JS `useWindowDimensions()` 
 *    event listeners re-render the tree. Pure Flexbox is hardware-accelerated by the native Yoga layout engine 
 *    and adapts instantly without JS re-render overhead.
 * 3. Fluid Gap Fill: `flexGrow: 1` ensures odd-numbered cards seamlessly fill empty row space.
 */
export function ResponsiveCourseGrid({
  courses = MOCK_GRID_COURSES,
  onCoursePress,
}: ResponsiveCourseGridProps) {
  return (
    <View style={styles.gridContainer}>
      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.gridCard}
          onPress={() => onCoursePress?.(course)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`Khóa học ${course.title}, Giảng viên ${course.instructor}`}>
          {/* Top Academic Icon Badge */}
          <View style={styles.cardIconHeader}>
            <View style={styles.iconCircle}>
              <IconSymbol name="graduationcap.fill" size={20} color="#2563EB" />
            </View>
            <View style={styles.roomPill}>
              <ThemedText style={styles.roomPillText}>{course.room}</ThemedText>
            </View>
          </View>

          {/* Course Details */}
          <View style={styles.cardContent}>
            <ThemedText style={styles.courseTitle}>
              {course.title}
            </ThemedText>

            <ThemedText style={styles.instructorText}>
              GV: {course.instructor}
            </ThemedText>

            <View style={styles.scheduleRow}>
              <IconSymbol name="calendar" size={14} color="#2563EB" />
              <ThemedText style={styles.scheduleText}>
                {course.schedule}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Grid Container: flex row container with wrapping enabled and 12px gap
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 6,
  },
  // Responsive Grid Card: pure flexbox grid item combining flexBasis, minWidth, maxWidth, flexGrow, and wrap
  gridCard: {
    flexBasis: '45%',
    minWidth: 150,
    maxWidth: 360,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  cardIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  roomPillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  cardContent: {
    gap: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 22,
  },
  instructorText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 19,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  scheduleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
});
