import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ApiResponse } from '../types/api';
import { Product } from '../types/product';

const PAGE_SIZE = 6;

/**
 * Hàm gọi API và gán kiểu Generic ApiResponse<Product>
 */
export const fetchProductsPage = async (page: number): Promise<ApiResponse<Product>> => {
  const skip = (page - 1) * PAGE_SIZE;
  const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`Lỗi kết nối API: ${response.status}`);
  }

  const json = await response.json();

  const result: ApiResponse<Product> = {
    data: json.products as Product[],
    total: json.total,
    page: page,
  };

  return result;
};

export const PaginatedProductList: React.FC = () => {
  const [apiData, setApiData] = useState<ApiResponse<Product> | null>(null);
  const [page, setPage] = useState<number>(1);

  // Đồng bộ 2 trạng thái: loading ban đầu và refreshing khi kéo xuống
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Hàm load dữ liệu phân biệt giữa tải lần đầu / đổi trang và kéo để làm mới (refreshing)
  const loadData = useCallback(async (currentPage: number, isPullToRefresh = false) => {
    if (isPullToRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await fetchProductsPage(currentPage);
      // Cập nhật lại mảng dữ liệu mới từ API
      setApiData(res);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu sản phẩm:', err);
    } finally {
      // Đồng bộ tắt cả loading và refreshing khi API hoàn tất
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Gọi tải dữ liệu khi trang thay đổi
  useEffect(() => {
    loadData(page, false);
  }, [page, loadData]);

  // Xử lý sự kiện kéo xuống để làm mới (Pull-to-refresh)
  const handleRefresh = useCallback(() => {
    loadData(page, true);
  }, [loadData, page]);

  const totalPages = apiData ? Math.ceil(apiData.total / PAGE_SIZE) : 1;

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  // Hiển thị loading trung tâm chỉ khi đang tải lần đầu và chưa có dữ liệu
  if (loading && !refreshing && !apiData) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Đang tải trang {page}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Thông tin phân trang */}
      <View style={styles.pageBar}>
        <Text style={styles.pageInfo}>
          Trang {apiData?.page ?? 1} / {totalPages} (Tổng {apiData?.total ?? 0} sản phẩm)
        </Text>
      </View>

      {/* Danh sách sản phẩm tích hợp RefreshControl */}
      <FlatList
        data={apiData?.data ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
      />

      {/* Thanh điều hướng chuyển trang */}
      <View style={styles.paginationControls}>
        <TouchableOpacity
          style={[styles.pageButton, (page <= 1 || loading || refreshing) && styles.disabledButton]}
          onPress={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page <= 1 || loading || refreshing}
        >
          <Text
            style={[
              styles.pageButtonText,
              (page <= 1 || loading || refreshing) && styles.disabledButtonText,
            ]}
          >
            ← Trang trước
          </Text>
        </TouchableOpacity>

        <Text style={styles.currentBadge}>{page}</Text>

        <TouchableOpacity
          style={[
            styles.pageButton,
            (page >= totalPages || loading || refreshing) && styles.disabledButton,
          ]}
          onPress={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages || loading || refreshing}
        >
          <Text
            style={[
              styles.pageButtonText,
              (page >= totalPages || loading || refreshing) && styles.disabledButtonText,
            ]}
          >
            Trang sau →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  pageBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  pageInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
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
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  pageButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  disabledButtonText: {
    color: '#94a3b8',
  },
  currentBadge: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: '#64748b',
  },
});
