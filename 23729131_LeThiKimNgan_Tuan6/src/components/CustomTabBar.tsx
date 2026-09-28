import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';

interface TabConfig {
  label: string;
  renderIcon: (color: string, focused: boolean) => React.ReactNode;
  badge?: number;
}

const TAB_CONFIGS: Record<string, TabConfig> = {
  Home: {
    label: 'Home',
    renderIcon: (color, focused) => (
      <Ionicons
        name={focused ? 'home' : 'home-outline'}
        size={24}
        color={color}
      />
    ),
  },
  Category: {
    label: 'Danh mục',
    renderIcon: (color, focused) => (
      <Ionicons
        name={focused ? 'grid' : 'grid-outline'}
        size={23}
        color={color}
      />
    ),
  },
  Cart: {
    label: 'Giỏ hàng',
    badge: 3,
    renderIcon: (color, focused) => (
      <Ionicons
        name={focused ? 'cart' : 'cart-outline'}
        size={25}
        color={color}
      />
    ),
  },
  Account: {
    label: 'Tài khoản',
    renderIcon: (color, focused) => (
      <MaterialCommunityIcons
        name={focused ? 'account-circle' : 'account-circle-outline'}
        size={25}
        color={color}
      />
    ),
  },
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { totalQuantity } = useCart();

  // Hide tab bar if screen specifies tabBarStyle: { display: 'none' } or on BookDetailScreen
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor?.options;

  const childRouteName = getFocusedRouteNameFromRoute(focusedRoute);
  if (childRouteName === 'BookDetailScreen' || childRouteName === 'CheckoutScreen') {
    return null;
  }

  const tabBarStyle = focusedOptions?.tabBarStyle as any;
  if (tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View
      style={[
        styles.tabBarContainer,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIGS[route.name] || {
          label: options.title ?? route.name,
          renderIcon: (color: string) => (
            <Ionicons name="ellipse" size={20} color={color} />
          ),
        };

        const badgeCount = route.name === 'Cart' ? totalQuantity : config.badge;

        const activeColor = '#007AFF';
        const inactiveColor = '#8E8E93';
        const currentColor = isFocused ? activeColor : inactiveColor;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            {/* Top Indicator bar for active tab */}
            <View
              style={[
                styles.activeIndicator,
                isFocused && styles.activeIndicatorVisible,
              ]}
            />

            {/* Tab Icon with optional badge */}
            <View style={styles.iconWrapper}>
              {config.renderIcon(currentColor, isFocused)}
              {typeof badgeCount === 'number' && badgeCount > 0 ? (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Tab Label */}
            <Text
              style={[
                styles.tabLabel,
                { color: currentColor },
                isFocused && styles.tabLabelFocused,
              ]}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  activeIndicatorVisible: {
    backgroundColor: '#007AFF',
  },
  iconWrapper: {
    position: 'relative',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -3,
    right: -10,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '500',
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});
