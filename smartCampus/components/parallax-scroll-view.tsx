import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

/**
 * ParallaxScrollView Component
 * 
 * Layout Decisions & Responsiveness:
 * 1. Scroll Container: `flex: 1` ensures the scroll view takes up full viewport height dynamically.
 * 2. Header Animation: Uses interpolating animated transforms (scale and translateY) without hardcoding 
 *    fixed pixel offsets for child elements, preserving fluid responsiveness on all display ratios.
 * 3. Content Padding: Increased padding to 24px and gap to 20px to support larger font sizes (18px+) 
 *    and ensure multi-line Vietnamese text sections have sufficient white space for visual clarity.
 */
export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      contentContainerStyle={styles.scrollContentContainer}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  // Flex container taking available parent viewport
  container: {
    flex: 1,
  },
  // Scroll Content Container: allows natural growth without fixed height clipping
  scrollContentContainer: {
    flexGrow: 1,
  },
  // Animated Header: predefined header height that scales dynamic parallax transforms cleanly
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  // Content View: dynamic padding and gap spacing for enhanced Vietnamese text readability
  content: {
    flex: 1,
    padding: 24,
    gap: 20,
    overflow: 'hidden',
  },
});

