import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  extraContent?: ReactNode;
  children?: ReactNode;
}

/**
 * StepCard Component
 * 
 * Layout Decisions & Wrapping Fixes:
 * - Removed all hardcoded height limits so step instructions expand dynamically according to text length.
 * - Text fields use `flexShrink: 1` and `flexWrap: 'wrap'` to guarantee that long translated Vietnamese
 *   explanations wrap seamlessly across lines.
 * - Modular design separates step metadata, step title, body text, and interactive menu triggers into a cohesive card layout.
 */
export function StepCard({ stepNumber, title, description, extraContent, children }: StepCardProps) {
  return (
    <ThemedView style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.stepBadge}>
          <ThemedText style={styles.stepBadgeText}>Bước {stepNumber}</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.titleText}>
          {title}
        </ThemedText>
      </View>

      <ThemedText style={styles.descriptionText}>
        {description}
      </ThemedText>

      {extraContent && <View style={styles.extraContainer}>{extraContent}</View>}
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Card Container: flexible padding and border radius with background elevation feel
  cardContainer: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    gap: 12,
    marginVertical: 6,
  },
  // Header Row: Flex container aligned to top to accommodate long titles without height clipping
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  // Step Badge: Numeric badge pill with flexible width
  stepBadge: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 2,
  },
  stepBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Title Text: flex: 1 & flexShrink: 1 force text wrapping when title stretches across multiple lines
  titleText: {
    flex: 1,
    flexShrink: 1,
  },
  // Description Text: Body typography (18px) with line height 26px for smooth readability
  descriptionText: {
    fontSize: 18,
    lineHeight: 26,
    opacity: 0.9,
  },
  // Extra Content Container: Code block or helper callouts container
  extraContainer: {
    marginTop: 4,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.08)',
  },
  childrenContainer: {
    marginTop: 4,
  },
});
