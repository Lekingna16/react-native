import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Product, ProductsResponse } from '../types/product';

/**
 * Hàm gọi API tìm kiếm sản phẩm theo keyword và limit
 * Endpoint: https://dummyjson.com/products/search?q={keyword}&limit={limit}
 */
export const fetchProducts = async (keyword: string, limit: number): Promise<Product[]> => {
  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Lỗi kết nối API! Mã trạng thái: ${response.status}`);
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products;
};

export const ProductList: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('phone');
  const [limit, setLimit] = useState<number>(10);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(keyword, limit);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.row}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm và giới hạn số lượng */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa (keyword)..."
          placeholderTextColor="#94a3b8"
          value={keyword}
          onChangeText={setKeyword}
        />
        <TextInput
          style={styles.limitInput}
          placeholder="Limit"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={limit.toString()}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            setLimit(isNaN(num) ? 0 : num);
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị trạng thái đang tải hoặc lỗi */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}

      {error && !loading && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Danh sách kết quả sản phẩm */}
      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#0f172a',
  },
  limitInput: {
    width: 60,
    height: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    color: '#0f172a',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  center: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
  },
});
