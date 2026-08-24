import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Course, courses } from './src/data/courses';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen />
    </SafeAreaView>
  );
}

const PAGE_SIZE = 4;
const categories = ['Tất cả', ...Array.from(new Set(courses.map((c) => c.category)))];

interface CourseRowProps {
  course: Course;
  onPress: (course: Course) => void;
}

function CourseRow({ course, onPress }: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}
    >
      <View>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.instructor} numberOfLines={1}>
          {course.instructor}
        </Text>
      </View>

      <View style={styles.courseFooter}>
        <Text style={styles.studentCount}>
          👥 {course.students} SV
        </Text>
      </View>
    </Pressable>
  );
}

type SortOption = 'default' | 'students-desc' | 'students-asc';

function CourseListScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Tối ưu hóa filteredCourses bằng useMemo
  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi');

    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || course.category === selectedCategory;
      const matchesQuery = `${course.title} ${course.instructor} ${course.category}`
        .toLocaleLowerCase('vi')
        .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  // Tối ưu hóa sortedCourses bằng useMemo
  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      if (sortOption === 'students-desc') return b.students - a.students;
      if (sortOption === 'students-asc') return a.students - b.students;
      return 0;
    });
  }, [filteredCourses, sortOption]);

  // Tối ưu hóa paginatedCourses bằng useMemo
  const paginatedCourses = useMemo(() => {
    return sortedCourses.slice(0, page * PAGE_SIZE);
  }, [sortedCourses, page]);

  // Reset trang về 1 khi thay đổi điều kiện tìm kiếm/lọc/sắp xếp
  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory, sortOption]);

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`,
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setRefreshing(false);
    }, 1000);
  };

  const handleEndReached = () => {
    if (loadingMore || paginatedCourses.length >= sortedCourses.length) {
      return;
    }
    setLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <FlatList
      key="grid_2"
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      data={paginatedCourses}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Course Catalog</Text>
          <Text style={styles.subtitle}>
            Khám phá các khóa học đang mở
          </Text>

          <View style={styles.searchContainer}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm theo tên, giảng viên hoặc danh mục"
              placeholderTextColor="#8A8F98"
              returnKeyType="search"
              style={styles.searchInput}
            />
            {query.length > 0 && (
              <Pressable
                onPress={() => setQuery('')}
                style={styles.clearButton}
                hitSlop={8}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryFilterContainer}
            contentContainerStyle={styles.categoryFilterContent}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sắp xếp SV:</Text>
            <Pressable
              onPress={() => setSortOption('default')}
              style={[
                styles.sortButton,
                sortOption === 'default' && styles.sortButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'default' && styles.sortButtonTextActive,
                ]}
              >
                Mặc định
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSortOption('students-desc')}
              style={[
                styles.sortButton,
                sortOption === 'students-desc' && styles.sortButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'students-desc' && styles.sortButtonTextActive,
                ]}
              >
                ↓ Nhiều nhất
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSortOption('students-asc')}
              style={[
                styles.sortButton,
                sortOption === 'students-asc' && styles.sortButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'students-asc' && styles.sortButtonTextActive,
                ]}
              >
                ↑ Ít nhất
              </Text>
            </Pressable>
          </View>

          <Text style={styles.resultText}>
            Tìm thấy {sortedCourses.length} khóa học (Hiển thị {paginatedCourses.length}/{sortedCourses.length})
          </Text>
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footerLoading}>
            <ActivityIndicator size="small" color="#3157A4" />
            <Text style={styles.footerLoadingText}>Đang tải thêm...</Text>
          </View>
        ) : paginatedCourses.length > 0 && paginatedCourses.length === sortedCourses.length ? (
          <View style={styles.footerEnd}>
            <Text style={styles.footerEndText}>✓ Đã hiển thị tất cả khóa học</Text>
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Không tìm thấy khóa học
          </Text>

          <Text style={styles.emptyText}>
            Hãy thử tìm kiếm bằng một từ khóa khác.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <CourseRow
          course={item}
          onPress={openCourse}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
  },
  columnWrapper: {
    gap: 12,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    color: '#182035',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#697080',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    minHeight: 52,
    color: '#182035',
    fontSize: 16,
  },
  clearButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#8A8F98',
    fontSize: 16,
    fontWeight: '700',
  },
  categoryFilterContainer: {
    marginTop: 12,
    marginHorizontal: -20,
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
  },
  filterChipActive: {
    backgroundColor: '#182035',
    borderColor: '#182035',
  },
  filterChipText: {
    color: '#596171',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  sortLabel: {
    color: '#697080',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 2,
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
  },
  sortButtonActive: {
    backgroundColor: '#3157A4',
    borderColor: '#3157A4',
  },
  sortButtonText: {
    color: '#596171',
    fontSize: 12,
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  courseCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E1E5EC',
    justifyContent: 'space-between',
    minHeight: 155,
  },
  courseCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  courseTitle: {
    color: '#182035',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  instructor: {
    color: '#686F7D',
    fontSize: 12,
    marginTop: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  category: {
    overflow: 'hidden',
    color: '#3157A4',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#E8F0FF',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  studentCount: {
    color: '#596171',
    fontSize: 12,
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#182035',
    fontSize: 19,
    fontWeight: '700',
  },
  emptyText: {
    color: '#747B88',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  footerLoading: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  footerLoadingText: {
    color: '#697080',
    fontSize: 13,
    fontWeight: '500',
  },
  footerEnd: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerEndText: {
    color: '#8A8F98',
    fontSize: 13,
    fontWeight: '500',
  },
});

