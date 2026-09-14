import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { filterByName } from '../utils/filter';
import { User } from '../types/user';

// Một kiểu dữ liệu khác có trường name để kiểm tra tính tái sử dụng của Generic <T>
interface Category {
  id: number;
  name: string;
  count: number;
}

const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, name: 'Smartphones', count: 120 },
  { id: 2, name: 'Laptops & Computers', count: 85 },
  { id: 3, name: 'Audio & Headphones', count: 240 },
  { id: 4, name: 'Smart Watches', count: 45 },
  { id: 5, name: 'Gaming Gear', count: 60 },
];

export const FilterDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');

  // Tận dụng API User đã có từ bài trước
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch((err) => console.error('Lỗi tải danh sách users:', err))
      .finally(() => setLoading(false));
  }, []);

  // 1. Áp dụng Generic filterByName<User> cho danh sách User[]
  const filteredUsers = useMemo(() => {
    return filterByName<User>(users, keyword);
  }, [users, keyword]);

  // 2. Áp dụng Generic filterByName<Category> cho danh sách Category[]
  const filteredCategories = useMemo(() => {
    return filterByName<Category>(SAMPLE_CATEGORIES, keyword);
  }, [keyword]);

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm từ khóa */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa tìm kiếm theo name..."
          placeholderTextColor="#94a3b8"
          value={keyword}
          onChangeText={setKeyword}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <View style={styles.listsWrapper}>
          {/* Nhóm 1: Kết quả lọc danh sách User (Kiểu User) */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              1. Danh sách User (Tìm thấy {filteredUsers.length}/{users.length})
            </Text>
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSubText}>@{item.username} • {item.email}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Không tìm thấy User nào khớp với "{keyword}"</Text>
              }
            />
          </View>

          {/* Nhóm 2: Kết quả lọc danh mục (Kiểu Category) */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              2. Danh mục sản phẩm (Tìm thấy {filteredCategories.length}/{SAMPLE_CATEGORIES.length})
            </Text>
            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSubText}>{item.count} sản phẩm</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Không tìm thấy danh mục nào khớp với "{keyword}"</Text>
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchBox: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  keywordBadge: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748b',
  },
  keywordText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  listsWrapper: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  section: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 6,
  },
  itemCard: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemSubText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748b',
  },
});
