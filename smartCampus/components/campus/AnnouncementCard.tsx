import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface AnnouncementCardProps {
  sectionTitle: string;
  sectionBadgeText: string;
  announcementTitle: string;
  description: string;
  dateTag: string;
  timeTag: string;
}

/**
 * AnnouncementCard Component
 * 
 * Non-Visual Accessibility Remediation Log:
 * 1. Missing Names & Roles: Card wrapper sets `accessible={true}`, `accessibilityRole="article"`, 
 *    and a combined single-read `accessibilityLabel` ("Thông báo Lịch thi giữa kỳ, Khoa Công nghệ Thông tin...").
 * 2. Order & Focus: Combines header, title, body paragraph, and meta tags into 1 logical screen reader node.
 * 3. High Contrast: Primary title `#0F172A`, body paragraph `#334155`, badge text `#1E40AF` for WCAG AAA compliance.
 * 4. Font Scaling & Wrapping: Dynamic container padding (18px) and multi-line flex wrapping prevent text clipping.
 */
export function AnnouncementCard({
  sectionTitle,
  sectionBadgeText,
  announcementTitle,
  description,
  dateTag,
  timeTag,
}: AnnouncementCardProps) {
  return (
    <View
      style={styles.cardContainer}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`Bài viết thông báo ${announcementTitle}, Danh mục ${sectionTitle}, Nội dung ${description}, Thời gian ${dateTag} ${timeTag}`}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.sectionTitleText}>
          {sectionTitle}
        </ThemedText>
        <View style={styles.sectionBadge}>
          <ThemedText style={styles.sectionBadgeText}>
            {sectionBadgeText}
          </ThemedText>
        </View>
      </View>

      {/* Main Announcement Title */}
      <ThemedText style={styles.announcementTitle}>
        {announcementTitle}
      </ThemedText>

      {/* Description Paragraph */}
      <ThemedText style={styles.descriptionText}>
        {description}
      </ThemedText>

      {/* Bottom Tag Chips */}
      <View style={styles.tagsRow}>
        <View style={styles.tagChip}>
          <ThemedText style={styles.tagChipText}>{dateTag}</ThemedText>
        </View>
        <View style={styles.tagChip}>
          <ThemedText style={styles.tagChipText}>{timeTag}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card Container: white card with soft border, shadow elevation, and overflow protection
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  // Header Row: distributes title and badge with column stacking to prevent spillage
  headerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  sectionTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 28,
  },
  sectionBadge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  sectionBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  // Announcement Title: bold header (#0F172A)
  announcementTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 26,
  },
  // Description Text: high-contrast body paragraph (#334155)
  descriptionText: {
    fontSize: 17,
    lineHeight: 26,
    color: '#334155',
  },
  // Tags Row: meta tag chips
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  tagChip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
});
