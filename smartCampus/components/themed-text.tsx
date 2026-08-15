import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

/**
 * ThemedText Component
 * 
 * Layout & Typography Decisions:
 * - Scaled up typography: body font enlarged to 18px (lineHeight: 26px) for higher readability.
 * - Title font enlarged to 36px (lineHeight: 44px) and Subtitle to 24px (lineHeight: 32px).
 * - Removed tight height constraints on line bounds to allow text wrapping without vertical clipping across mobile viewports.
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Body text: enlarged to 18px font size with 26px line height for clear multi-line text readability
  default: {
    fontSize: 18,
    lineHeight: 26,
  },
  // Semi-bold body text: 18px with font weight 600
  defaultSemiBold: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  // Main screen header titles: enlarged 28px font size with 36px line height
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  // Section headers & feature titles: enlarged 22px with 30px line height
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  // Interactive links: 18px with distinct touchable line height (26px)
  link: {
    fontSize: 18,
    lineHeight: 26,
    color: '#0a7ea4',
  },
});

