import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Collapsible Component
 * 
 * Layout Decisions & Wrapping Fixes:
 * 1. Text Wrapping: Heading row uses `flexDirection: 'row'` with `alignItems: 'flex-start'`.
 *    The title text container specifies `flex: 1` and `flexShrink: 1` so that long, multi-line 
 *    translated titles wrap fluidly without pushing the chevron icon outside the viewport.
 * 2. Dynamic Heights: No fixed height is applied to the heading container or expanded area, 
 *    allowing the component to grow naturally depending on children content volume.
 */
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={20}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={[styles.icon, { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}
        />
        <ThemedText type="defaultSemiBold" style={styles.titleText}>
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Container: dynamic auto-sizing with vertical gap spacing
  container: {
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  // Heading: Row flex layout aligned to start to accommodate multi-line title wrapping gracefully
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  // Chevron Icon: fixed offset adjustment when title wraps into multiple lines
  icon: {
    marginTop: 4,
  },
  // Title Text: flex: 1 & flexShrink: 1 guarantee multi-line text wrapping without truncation or overflow
  titleText: {
    flex: 1,
    flexShrink: 1,
  },
  // Expanded Content: Indented left margin with dynamic vertical padding
  content: {
    marginTop: 8,
    marginLeft: 30,
    gap: 12,
  },
});

