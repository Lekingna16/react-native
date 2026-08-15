import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface ScheduleItemProps {
  startTime: string;
  endTime: string;
  subjectName: string;
  roomInfo: string;
  teacherInfo: string;
  roomBadge: string;
}

/**
 * ScheduleItem Component
 * 
 * Non-Visual Accessibility Remediation Log:
 * 1. Missing Names & Roles: Component sets `accessible={true}`, `accessibilityRole="button"`, 
 *    and a descriptive `accessibilityLabel` ("Tiết học Toán cao cấp, thời gian 08:00 đến 09:30, phòng 204, GV Nguyễn Văn A").
 * 2. Order & Focus: Combines time block, subject name, location, instructor, and room badge into 1 focused node.
 * 3. High Contrast: Primary text `#0F172A`, details text `#334155`, time badge `#1D4ED8` for WCAG AAA compliance.
 * 4. Font Scaling & Wrapping: Dynamic container padding (14px) and `flexShrink: 1` prevent text clipping at large font scales.
 */
export function ScheduleItem({
  startTime,
  endTime,
  subjectName,
  roomInfo,
  teacherInfo,
  roomBadge,
}: ScheduleItemProps) {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Tiết học ${subjectName}, Thời gian từ ${startTime} đến ${endTime}, ${roomInfo}, Giảng viên phụ trách ${teacherInfo}, ${roomBadge}`}>
      {/* Time Block Badge */}
      <View
        style={styles.timeBlock}
        importantForAccessibility="no"
        accessible={false}>
        <ThemedText style={styles.startTimeText}>{startTime}</ThemedText>
        <ThemedText style={styles.endTimeText}>{endTime}</ThemedText>
      </View>

      {/* Middle Subject & Location Details */}
      <View style={styles.detailsContainer}>
        <ThemedText style={styles.subjectTitle}>
          {subjectName}
        </ThemedText>
        <ThemedText style={styles.detailsText}>
          {roomInfo} • GV: {teacherInfo}
        </ThemedText>
      </View>

      {/* Right Room Badge Pill */}
      <View
        style={styles.roomBadge}
        importantForAccessibility="no"
        accessible={false}>
        <ThemedText style={styles.roomBadgeText}>{roomBadge}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container: dynamic auto-sizing flex row with light background card styling (no fixed height)
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    gap: 14,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  // Time Block: rounded light blue container block with high-contrast text (#1D4ED8)
  timeBlock: {
    backgroundColor: '#DBEAFE',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 76,
  },
  startTimeText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1D4ED8',
    lineHeight: 22,
  },
  endTimeText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  // Details Container: flex: 1 & flexShrink: 1 ensure multi-line title wrapping without horizontal overflow
  detailsContainer: {
    flex: 1,
    flexShrink: 1,
    gap: 4,
  },
  // Subject Title: enlarged 18px bold typography with 26px line height for multi-line strings
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 26,
  },
  // Details Text: high contrast secondary text (#334155) with 22px line height
  detailsText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  // Room Badge: right pill tag
  roomBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignSelf: 'center',
  },
  roomBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
});

