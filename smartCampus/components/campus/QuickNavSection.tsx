import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface QuickNavSectionProps {
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * QuickNavSection Component
 * 
 * Layout Decisions & Flexibility:
 * - Fluid card wrapper with no fixed height constraints.
 * - Flexbox layout ensuring action buttons/links wrap smoothly next to text descriptions.
 */
export function QuickNavSection({ title, description, children }: QuickNavSectionProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.description}>
        {description}
      </ThemedText>
      {children && <View style={styles.actionRow}>{children}</View>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(10, 126, 164, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
    gap: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    opacity: 0.9,
  },
  actionRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
});
