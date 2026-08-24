import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface StatCardProps {
  label: string;
  badgeText: string;
  value: string | number;
  subtext: string;
}

/**
 * StatCard Component
 * 
 * Non-Visual Accessibility Remediation Log:
 * 1. Missing Names & Roles: Card wrapper sets `accessible={true}`, `accessibilityRole="summary"`, 
 *    and a combined single-read `accessibilityLabel` ("Thẻ chỉ số GPA, giá trị 8.5/10.0, học kỳ 1").
 * 2. Order & Focus: Combines label, badge, metric value, and subtext into 1 logical screen reader node.
 * 3. High Contrast: Label text `#334155`, subtext `#475569`, badge text `#1E40AF` for WCAG AAA compliance.
 * 4. Font Scaling & Wrapping: Vertical flex column with non-fixed container height prevents text clipping.
 */
export function StatCard({ label, badgeText, value, subtext }: StatCardProps) {
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`Thẻ chỉ số ${label}, Giá trị ${value}, Trạng thái ${badgeText}, Chi tiết ${subtext}`}>
      {/* Top Section: Vertical Column Layout */}
      <View style={styles.topRow}>
        <ThemedText style={styles.label}>
          {label}
        </ThemedText>
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{badgeText}</ThemedText>
        </View>
      </View>

      {/* Main Metric Value */}
      <ThemedText style={styles.valueText}>{value}</ThemedText>

      {/* Subtitle Text */}
      <ThemedText style={styles.subtext}>
        {subtext}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card Container: flexible grid item with dynamic height auto-expansion and overflow protection
  card: {
    flex: 1,
    minWidth: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  // Top Section: vertical column layout ensuring label and badge sit comfortably inside card padding
  topRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  },
  // Label Text: high-contrast typography color (#334155) with auto multi-line text wrapping
  label: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    lineHeight: 19,
  },
  // Badge Pill: light blue pill tag with high-contrast badge text (#1E40AF)
  badge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  // Metric Value Text: enlarged 32px bold numeric display
  valueText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 38,
    marginVertical: 2,
  },
  // Subtext: high contrast footnote text (#475569) with multi-line wrap
  subtext: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    lineHeight: 18,
  },
});
