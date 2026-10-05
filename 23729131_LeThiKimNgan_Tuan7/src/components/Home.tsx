import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

type HomeProps = {
  isGrid: boolean;
  onLayoutChange: (isGrid: boolean) => void;
};

function Home({ isGrid, onLayoutChange }: HomeProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>KHÁM PHÁ</Text>
        <Text style={styles.title}>Movie App</Text>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Dạng lưới</Text>
        <Switch
          accessibilityLabel="Hiển thị phim dạng lưới"
          value={isGrid}
          onValueChange={onLayoutChange}
          trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
          thumbColor={isGrid ? '#2563eb' : '#ffffff'}
        />
      </View>
    </View>
  );
}

export default React.memo(Home);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eyebrow: {
    color: '#2563eb',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    marginTop: 2,
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '800',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
});
