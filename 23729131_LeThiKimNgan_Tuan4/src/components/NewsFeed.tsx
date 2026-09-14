import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Post } from '../types/post';
import { NewsItem } from './NewsItem';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const NewsFeed: React.FC = () => {
  // State quản lý danh sách bài viết/todos có kiểu là mảng Post[]
  const [posts, setPosts] = useState<Post[]>([]);
  // State quản lý trạng thái đang tải ban đầu
  const [loading, setLoading] = useState<boolean>(true);
  // State quản lý trạng thái làm mới (pull to refresh)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // State quản lý lỗi nếu API gặp sự cố
  const [error, setError] = useState<string | null>(null);

  /**
   * Hàm gọi API bằng `fetch` và ép kiểu TypeScript
   */
  const fetchNewsFeed = useCallback(async (isPullToRefresh = false) => {
    try {
      if (isPullToRefresh) {
        setRefreshing(true);
        console.log('[NewsFeed LOG] 🔄 Bắt đầu kéo làm mới (Pull-to-refresh)...');
      } else {
        setLoading(true);
        console.log('[NewsFeed LOG] 🚀 Khởi tạo fetching dữ liệu...');
      }

      setError(null);

      // Bước 1: Dùng fetch() gửi request HTTP GET tới API
      console.log(`[NewsFeed LOG] 🌐 Bước 1: Gửi HTTP GET request tới endpoint -> ${API_URL}`);
      const response = await fetch(API_URL);

      // Ghi log kiểm tra trạng thái HTTP response
      console.log(
        `[NewsFeed LOG] 📥 Bước 2: Nhận response từ server với HTTP Status: ${response.status} (${response.statusText})`
      );

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
      }

      // Bước 3: Parse dữ liệu từ body dạng JSON
      console.log('[NewsFeed LOG] ⚙️ Bước 3: Đang phân tích (parse) body của response thành đối tượng JSON...');
      const rawJson = await response.json();

      // Bước 4: Ép kiểu dữ liệu API với cú pháp TypeScript `(rawJson as Post[])` theo yêu cầu
      console.log(
        '[NewsFeed LOG] 🏷️ Bước 4: Ép kiểu (Type Assertion) TypeScript: gán kiểu `data as Post[]`. ' +
        'Điều này giúp trình biên dịch TypeScript và IDE hiểu chính xác các trường dữ liệu (id, title, completed, userId).'
      );
      const data = rawJson as Post[];

      console.log(`[NewsFeed LOG] ✅ Bước 5: Ép kiểu thành công! Tổng số bản ghi nhận được: ${data.length}`);
      console.log('[NewsFeed LOG] 📋 Dữ liệu bản ghi mẫu đầu tiên [0]:', JSON.stringify(data[0], null, 2));

      // Bước 6: Cập nhật state danh sách
      setPosts(data);
      console.log('[NewsFeed LOG] 💾 Bước 6: Đã lưu dữ liệu vào state `posts`, FlatList sẽ render các tiêu đề.');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi không xác định xảy ra';
      console.error('[NewsFeed LOG] ❌ Lỗi khi tải dữ liệu từ API:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
      console.log('[NewsFeed LOG] 🏁 Hoàn tất chu trình gọi API.');
    }
  }, []);

  // Gọi API khi component mount lần đầu
  useEffect(() => {
    console.log('[NewsFeed LOG] 📌 Component NewsFeed đã được mount vào giao diện.');
    fetchNewsFeed();
  }, [fetchNewsFeed]);

  // Xử lý sự kiện khi bấm vào từng item tin tức
  const handleItemPress = useCallback((post: Post) => {
    console.log(`[NewsFeed LOG] 👆 Người dùng nhấn vào bài viết: "${post.title}"`);
    Alert.alert(
      'Tiêu đề bài viết',
      post.title,
      [{ text: 'Đóng', style: 'cancel' }]
    );
  }, []);

  // Render header cho danh sách
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Bản tin bài viết</Text>
      <Text style={styles.headerSubtitle}>
        Dữ liệu từ JSONPlaceholder • {posts.length} bài viết
      </Text>
    </View>
  );

  // Render khi danh sách trống
  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không tìm thấy bài viết nào.</Text>
      </View>
    );
  };

  // Trạng thái đang tải lần đầu
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Đang tải danh sách bài viết...</Text>
      </View>
    );
  }

  // Trạng thái gặp lỗi khi gọi API
  if (error && posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Không thể tải dữ liệu</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchNewsFeed()}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.id.toString()}
        renderItem={({ item, index }) => (
          <NewsItem item={item} index={index} onPress={handleItemPress} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchNewsFeed(true)}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
        contentContainerStyle={styles.listContent}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
  },
});
