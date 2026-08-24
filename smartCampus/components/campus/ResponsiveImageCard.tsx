import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

interface ResponsiveImageCardProps {
  source: ImageSource;
  aspectRatio?: number;
  caption?: string;
  maxHeight?: number;
}

/**
 * ResponsiveImageCard Component
 * 
 * Layout Decisions & Flexibility:
 * - Replaces rigid `width: 100, height: 100` fixed constraints with flexible `width: '100%'` 
 *   and `aspectRatio` scaling.
 * - Image automatically scales dynamically to the width of its parent container while maintaining 
 *   its native visual proportion without distortion or clipping.
 * - Caption text container supports full text wrapping with `flexShrink: 1`.
 */
export function ResponsiveImageCard({
  source,
  aspectRatio = 16 / 9,
  caption,
}: ResponsiveImageCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={source}
          style={[styles.image, { aspectRatio }]}
          contentFit="contain"
        />
      </View>
      {caption && (
        <ThemedText style={styles.captionText}>
          {caption}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container: auto-sizing wrapper centered horizontally
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  // Image Wrapper: flexible width taking max available width with rounded bounds
  imageWrapper: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    padding: 8,
  },
  // Image: width 100% with aspect ratio handling vertical height dynamically
  image: {
    width: '100%',
  },
  // Caption Text: centered, wrapped caption string
  captionText: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
});
