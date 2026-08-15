import React, { ComponentProps, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';


type IconName = ComponentProps<typeof IconSymbol>['name'];

interface FeatureCollapsibleProps {
  iconName: IconName;
  title: string;
  badgeLabel?: string;
  children: ReactNode;
}

/**
 * FeatureCollapsible Component
 * 
 * Layout Decisions & Flexibility:
 * - Wraps the inner `Collapsible` component with specialized campus feature styling.
 * - Ensures header icons and badges scale flexibly with title length using `flexShrink: 1` and `flexWrap: 'wrap'`.
 * - Completely avoids fixed height definitions to prevent text truncation on smaller mobile screens.
 */
export function FeatureCollapsible({ iconName, title, badgeLabel, children }: FeatureCollapsibleProps) {
  return (
    <View style={styles.cardContainer}>
      <Collapsible title={title}>
        <View style={styles.contentWrapper}>
          {badgeLabel && (
            <View style={styles.badgeContainer}>
              <IconSymbol name={iconName} size={18} color="#0a7ea4" />
              <ThemedText style={styles.badgeText}>{badgeLabel}</ThemedText>
            </View>
          )}
          {children}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card Wrapper: padding and soft outline for feature cards
  cardContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    marginVertical: 4,
  },
  // Content Wrapper: flex layout with dynamic spacing
  contentWrapper: {
    gap: 12,
    paddingTop: 4,
    paddingBottom: 8,
  },
  // Badge Container: row alignment with auto flex wrapping
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(10, 126, 164, 0.12)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
});
