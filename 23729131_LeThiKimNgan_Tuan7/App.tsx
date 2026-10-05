import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Home from './src/components/Home';
import MovieCardVariant from './src/components/MovieCardVariant';
import { getMovies, MOVIES_PAGE_SIZE } from './src/services/movieService';
import type { Movie } from './src/types/movie';

type LoadMode = 'initial' | 'refresh' | 'loadMore';
type FailedRequest = {
  page: number;
  mode: LoadMode;
};

function getUniqueMovies(movies: Movie[]): Movie[] {
  return [...new Map(movies.map((movie) => [movie.id, movie])).values()];
}

function MovieScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedRequest, setFailedRequest] = useState<FailedRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isLoadingMoreRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const requestGenerationRef = useRef(0);

  const loadMovies = useCallback(
    async (page: number, mode: LoadMode, signal?: AbortSignal) => {
      let requestGeneration = requestGenerationRef.current;

      if (mode === 'initial') {
        setIsLoading(true);
      } else if (mode === 'refresh') {
        if (isRefreshingRef.current) {
          return;
        }

        isRefreshingRef.current = true;
        requestGeneration = requestGenerationRef.current + 1;
        requestGenerationRef.current = requestGeneration;
        hasMoreRef.current = true;
        setCurrentPage(1);
        setHasMore(true);
        setIsRefreshing(true);
      } else {
        if (
          isLoadingMoreRef.current ||
          isRefreshingRef.current ||
          !hasMoreRef.current
        ) {
          return;
        }

        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
      }

      setErrorMessage(null);
      setFailedRequest(null);

      try {
        const nextMovies = await getMovies(page, MOVIES_PAGE_SIZE, signal);

        if (requestGeneration !== requestGenerationRef.current) {
          return;
        }

        setMovies((currentMovies) => {
          if (mode !== 'loadMore') {
            return getUniqueMovies(nextMovies);
          }

          return getUniqueMovies([...currentMovies, ...nextMovies]);
        });
        setCurrentPage(page);
        hasMoreRef.current = nextMovies.length >= MOVIES_PAGE_SIZE;
        setHasMore(hasMoreRef.current);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        if (requestGeneration !== requestGenerationRef.current) {
          return;
        }

        setFailedRequest({ page, mode });
        setErrorMessage(
          error instanceof Error ? error.message : 'Không thể tải danh sách phim.',
        );
      } finally {
        if (!signal?.aborted) {
          if (mode === 'initial') {
            setIsLoading(false);
          } else if (mode === 'refresh') {
            isRefreshingRef.current = false;
            setIsRefreshing(false);
          } else {
            isLoadingMoreRef.current = false;
            setIsLoadingMore(false);
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadMovies(1, 'initial', controller.signal);

    return () => controller.abort();
  }, [loadMovies]);

  const handleRefresh = useCallback(() => {
    void loadMovies(1, 'refresh');
  }, [loadMovies]);

  const handleRetry = useCallback(() => {
    if (!failedRequest) {
      return;
    }

    void loadMovies(failedRequest.page, failedRequest.mode);
  }, [failedRequest, loadMovies]);

  const handleLoadMore = useCallback(() => {
    if (
      isLoading ||
      isRefreshing ||
      isLoadingMore ||
      isLoadingMoreRef.current ||
      isRefreshingRef.current ||
      !hasMoreRef.current ||
      failedRequest !== null ||
      !hasMore
    ) {
      return;
    }

    void loadMovies(currentPage + 1, 'loadMore');
  }, [
    currentPage,
    failedRequest,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadMovies,
  ]);

  const handleSelectMovie = useCallback((movie: Movie) => {
    const year = movie.year ? ` • ${movie.year}` : '';
    Alert.alert(movie.title, `${movie.genre}${year}\nĐiểm: ${movie.rating.toFixed(1)}/10`);
  }, []);

  const renderMovie = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCardVariant
        movie={item}
        layout={isGrid ? 'tile' : 'row'}
        onSelect={handleSelectMovie}
      />
    ),
    [handleSelectMovie, isGrid],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.stateText}>Đang tải danh sách phim...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMessage && movies.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Không tải được dữ liệu</Text>
          <Text style={styles.stateText}>{errorMessage}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadMovies(1, 'initial')}
            style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <Home isGrid={isGrid} onLayoutChange={setIsGrid} />

      {errorMessage ? (
        <View style={styles.warningBanner}>
          <Text style={styles.warningText}>{errorMessage}</Text>
        </View>
      ) : null}

      <FlatList
        key={isGrid ? 'grid' : 'list'}
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id}
        numColumns={isGrid ? 2 : 1}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        contentContainerStyle={[
          styles.listContent,
          movies.length === 0 && styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#2563eb"
            colors={['#2563eb']}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.listFooter}>
              <ActivityIndicator size="small" color="#2563eb" />
              <Text style={styles.footerText}>Đang tải thêm phim...</Text>
            </View>
          ) : failedRequest ? (
            <View style={styles.errorFooter}>
              <Text style={styles.errorFooterText}>Tải thất bại</Text>
              <Pressable
                accessibilityRole="button"
                onPress={handleRetry}
                style={({ pressed }) => [
                  styles.footerRetryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.footerRetryButtonText}>Thử lại</Text>
              </Pressable>
            </View>
          ) : !hasMore && movies.length > 0 ? (
            <Text style={styles.endOfListText}>— Đã hết danh sách —</Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.errorTitle}>Chưa có phim</Text>
            <Text style={styles.stateText}>Kéo xuống để tải lại danh sách.</Text>
          </View>
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MovieScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    flexGrow: 1,
    padding: 12,
    gap: 12,
  },
  emptyListContent: {
    justifyContent: 'center',
  },
  columnWrapper: {
    gap: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stateText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 18,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  warningBanner: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fbbf24',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  warningText: {
    color: '#92400e',
    fontSize: 13,
    textAlign: 'center',
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  footerText: {
    color: '#64748b',
    fontSize: 13,
  },
  errorFooter: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  errorFooterText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '700',
  },
  footerRetryButton: {
    borderRadius: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerRetryButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  endOfListText: {
    color: '#94a3b8',
    fontSize: 12,
    paddingVertical: 16,
    textAlign: 'center',
  },
});
