import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Văn học kinh điển', count: 124, icon: 'book-outline', color: '#ff6b6b' },
  { id: '2', name: 'Kỹ năng sống', count: 88, icon: 'heart-outline', color: '#4ecdc4' },
  { id: '3', name: 'Phát triển bản thân', count: 95, icon: 'trending-up-outline', color: '#45b7d1' },
  { id: '4', name: 'Kinh tế & Đầu tư', count: 62, icon: 'bar-chart-outline', color: '#f7b731' },
  { id: '5', name: 'Công nghệ thông tin', count: 47, icon: 'laptop-outline', color: '#5f27cd' },
  { id: '6', name: 'Tâm lý học', count: 53, icon: 'bulb-outline', color: '#ff9f43' },
  { id: '7', name: 'Ngoại ngữ', count: 71, icon: 'globe-outline', color: '#10ac84' },
  { id: '8', name: 'Truyện tranh & Manga', count: 110, icon: 'color-palette-outline', color: '#ee5253' },
];

export const CategoryScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh mục sách</Text>
        <Text style={styles.headerSubtitle}>Khám phá các thể loại sách đa dạng</Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
            <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryCount}>{item.count} đầu sách</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 2,
  },
  listContent: {
    padding: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#888',
  },
});
