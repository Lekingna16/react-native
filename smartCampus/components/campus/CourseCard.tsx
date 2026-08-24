import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, ImageSource } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export interface CourseCardProps {
  title: string;
  instructor: string;
  room: string;
  schedule: string;
  /**
   * Image Source: Can be a local asset `require(...)`, a remote URL string, or undefined.
   */
  imageSource?: string | ImageSource | number;
  /**
   * Image Accessibility Type:
   * - 'informative': Contains meaningful visual context. Screen readers announce imageAlt/title.
   * - 'decorative': Purely visual decoration. Screen readers bypass the image.
   * @default 'informative'
   */
  imageType?: 'informative' | 'decorative';
  /**
   * Alternative text description for screen readers when imageType is 'informative'.
   */
  imageAlt?: string;
  /**
   * Force simulated loading state (useful for demonstrating loading indicator).
   */
  forceLoading?: boolean;
  /**
   * Optional click press callback.
   */
  onPress?: () => void;
}

/**
 * CourseCard Component
 * 
 * Image Handling Strategy & Accessibility Decisions:
 * 1. Local Image Case: Renders local require(...) asset seamlessly via `expo-image`.
 * 2. Remote Image Case: Renders remote http(s) URL with contentFit contain/cover.
 * 3. Loading State Case: Displays a centered ActivityIndicator while remote image is fetching.
 * 4. Failed Image Case: Renders a resilient fallback academic icon box when network loading fails (`hasError === true`).
 * 5. Informative Image Case: Attaches `accessibilityLabel` & `accessibilityRole="image"` for screen readers.
 * 6. Decorative Image Case: Sets `accessible={false}` and `importantForAccessibility="no"` to skip screen reader audio.
 * 7. Task Completion Independence: Title, instructor, room badge, schedule, and press callbacks function 100% 
 *    independently of whether the image is missing, loading, failed, or hidden.
 */
export function CourseCard({
  title,
  instructor,
  room,
  schedule,
  imageSource,
  imageType = 'informative',
  imageAlt,
  forceLoading = false,
  onPress,
}: CourseCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const isDecorative = imageType === 'decorative';

  // Determine whether to show fallback icon
  const showFallback = !imageSource || hasError;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Môn học ${title}, Giảng viên ${instructor}, Phòng ${room}`}>
      {/* Left Thumbnail Area supporting all 6 Image Cases */}
      <View
        style={styles.thumbnailWrapper}
        accessible={!isDecorative && !showFallback}
        accessibilityRole={!isDecorative && !showFallback ? 'image' : undefined}
        accessibilityLabel={!isDecorative && !showFallback ? imageAlt || `Ảnh minh họa môn học ${title}` : undefined}
        importantForAccessibility={isDecorative ? 'no' : 'auto'}
        accessibilityElementsHidden={isDecorative}>
        {showFallback ? (
          /* Case 4: Failed or Missing Image Fallback State */
          <View style={styles.fallbackBox}>
            <IconSymbol name="graduationcap.fill" size={24} color="#2563EB" />
          </View>
        ) : (
          /* Cases 1 & 2: Local Asset or Remote Image */
          <View style={styles.imageContainer}>
            <Image
              source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
              style={styles.image}
              contentFit="cover"
              onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
            {/* Case 3: Loading Indicator Overlay */}
            {(isLoading || forceLoading) && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="small" color="#2563EB" />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Main Course Details Section - Functions 100% Independently of Image */}
      <View style={styles.contentContainer}>
        <ThemedText style={styles.titleText}>
          {title}
        </ThemedText>

        <ThemedText style={styles.instructorText}>
          GV: {instructor}
        </ThemedText>

        <View style={styles.footerRow}>
          <ThemedText style={styles.scheduleText}>
            {schedule}
          </ThemedText>
          <View style={styles.roomBadge}>
            <ThemedText style={styles.roomBadgeText}>{room}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Main Container: flexible auto-sizing card with soft shadow
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  // Thumbnail Wrapper: rounded left square (64x64)
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Fallback Box: fallback icon wrapper when image loading fails
  fallbackBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Image Container: relative box for image + loading overlay
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // Loading Overlay: centered spinner
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 246, 255, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Content Container: flex: 1 & flexShrink: 1 for text auto wrapping
  contentContainer: {
    flex: 1,
    flexShrink: 1,
    gap: 4,
  },
  titleText: {
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
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 2,
  },
  scheduleText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  roomBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  roomBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
});
