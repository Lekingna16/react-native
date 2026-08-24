import React, { ComponentProps, useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';

type IconName = ComponentProps<typeof IconSymbol>['name'];

export interface BaseButtonProps {
  title?: string;
  iconName?: IconName;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  /**
   * Force simulated focused state for demonstration purposes.
   */
  isFocusedDemo?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

/**
 * PrimaryButton Component
 * 
 * Target Size & State Decisions:
 * 1. Target Size Preservation: Fixed minimum height of 48px (`minHeight: 48`) and dynamic padding (`paddingHorizontal: 20`) 
 *    ensuring the touch target size never reduces during pressed, focused, disabled, or loading states.
 * 2. Pressed State: Renders a smooth background opacity overlay without changing padding or border dimensions.
 * 3. Focused State: Displays a high-contrast focus ring (`borderWidth: 2`, `borderColor: '#1D4ED8'`) for web/accessibility focus.
 * 4. Disabled State: Mutes background to `#E2E8F0` and locks interactions (`disabled={true}`).
 * 5. Loading State: Replaces title with a white ActivityIndicator spinner while preserving button bounds.
 */
export function PrimaryButton({
  title,
  iconName,
  onPress,
  disabled = false,
  loading = false,
  isFocusedDemo = false,
  accessibilityLabel,
  accessibilityHint,
}: BaseButtonProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.baseButton,
        styles.primaryButton,
        disabled && styles.disabledPrimaryButton,
        (isFocused || isFocusedDemo) && styles.focusedRingPrimary,
        pressed && isInteractive && styles.pressedState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <View style={styles.contentRow}>
          {iconName && <IconSymbol name={iconName} size={20} color="#FFFFFF" />}
          {title && <Text style={[styles.buttonText, styles.primaryText]}>{title}</Text>}
        </View>
      )}
    </Pressable>
  );
}

/**
 * SecondaryButton Component
 * 
 * Target Size & State Decisions:
 * 1. Target Size Preservation: Maintains identical 48px minimum target height without collapsing.
 * 2. Pressed State: Applies soft background tint (`#DBEAFE`) without reducing target size.
 * 3. Focused State: Displays focus ring (`borderColor: '#2563EB'`).
 * 4. Disabled State: Muted border and text color.
 * 5. Loading State: Replaces content with primary blue ActivityIndicator spinner.
 */
export function SecondaryButton({
  title,
  iconName,
  onPress,
  disabled = false,
  loading = false,
  isFocusedDemo = false,
  accessibilityLabel,
  accessibilityHint,
}: BaseButtonProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.baseButton,
        styles.secondaryButton,
        disabled && styles.disabledSecondaryButton,
        (isFocused || isFocusedDemo) && styles.focusedRingSecondary,
        pressed && isInteractive && styles.pressedSecondaryState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : (
        <View style={styles.contentRow}>
          {iconName && (
            <IconSymbol
              name={iconName}
              size={20}
              color={disabled ? '#94A3B8' : '#2563EB'}
            />
          )}
          {title && (
            <Text
              style={[
                styles.buttonText,
                styles.secondaryText,
                disabled && styles.disabledText,
              ]}>
              {title}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

/**
 * IconButton Component
 * 
 * Target Size & State Decisions:
 * 1. Target Size Preservation: Fixed square bounds (`width: 48`, `height: 48`, `minHeight: 48`, `minWidth: 48`) 
 *    guaranteeing standard minimum touch target guidelines in all states.
 * 2. Pressed State: Applies subtle circular background tint without size distortion.
 * 3. Focused State: Renders a distinct outer focus outline ring.
 * 4. Disabled State: Muted icon color `#94A3B8`.
 * 5. Loading State: Replaces icon with blue ActivityIndicator spinner.
 */
export function IconButton({
  iconName = 'house.fill',
  onPress,
  disabled = false,
  loading = false,
  isFocusedDemo = false,
  accessibilityLabel,
  accessibilityHint,
}: BaseButtonProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      accessibilityLabel={accessibilityLabel || 'Nút biểu tượng'}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.iconButtonBase,
        disabled && styles.disabledIconButton,
        (isFocused || isFocusedDemo) && styles.focusedRingSecondary,
        pressed && isInteractive && styles.pressedSecondaryState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#2563EB" />
      ) : (
        <IconSymbol
          name={iconName}
          size={22}
          color={disabled ? '#94A3B8' : '#2563EB'}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Base Button Layout: Guaranteed 48px minimum height touch target
  baseButton: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Primary Button Styles
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  disabledPrimaryButton: {
    backgroundColor: '#CBD5E1',
  },
  focusedRingPrimary: {
    borderColor: '#1E3A8A',
  },
  pressedState: {
    opacity: 0.82,
    backgroundColor: '#1D4ED8',
  },

  // Secondary Button Styles
  secondaryButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  secondaryText: {
    color: '#2563EB',
  },
  disabledSecondaryButton: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  disabledText: {
    color: '#94A3B8',
  },
  focusedRingSecondary: {
    borderColor: '#2563EB',
  },
  pressedSecondaryState: {
    backgroundColor: '#DBEAFE',
  },

  // Icon Button Base: Guaranteed 48x48px touch target size
  iconButtonBase: {
    width: 48,
    height: 48,
    minWidth: 48,
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  disabledIconButton: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
});
