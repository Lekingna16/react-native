import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface HeaderBannerProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
}

/**
 * HeaderBanner Component
 * 
 * Layout Decisions & Flexibility:
 * - Removes fixed container height constraints to allow longer Vietnamese headers to fit seamlessly.
 * - Uses `flexDirection: 'row'` with `flexWrap: 'wrap'` and `flexShrink: 1` so title and wave icon 
 *   flow naturally without overlapping or being pushed off-screen.
 * - Adds dynamic padding and soft background badge styling for a modern campus aesthetic.
 */
export function HeaderBanner({ title, subtitle, badgeText }: HeaderBannerProps) {
  return (
    <ThemedView style={styles.container}>
      {badgeText && (
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{badgeText}</ThemedText>
        </View>
      )}
      <View style={styles.titleRow}>
        <ThemedText type="title" style={styles.titleText}>
          {title}
        </ThemedText>
        <HelloWave />
      </View>
      {subtitle && (
        <ThemedText style={styles.subtitleText}>
          {subtitle}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Container: dynamic height based on text content with flexible spacing
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 12,
    backgroundColor: 'rgba(10, 126, 164, 0.08)',
  },
  // Badge: soft rounded pill container auto-sized to text length
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0a7ea4',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Title Row: flexWrap allows title and wave icon to wrap nicely on narrow screens
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  // Title Text: flexShrink: 1 ensures long title string doesn't force overflowing width
  titleText: {
    flexShrink: 1,
  },
  // Subtitle Text: clear paragraph text with increased line height for long Vietnamese text
  subtitleText: {
    fontSize: 18,
    lineHeight: 26,
    opacity: 0.85,
  },
});
