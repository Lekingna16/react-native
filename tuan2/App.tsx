import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native'
import { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Course, courses } from './src/data/courses'
import { TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen />
    </SafeAreaView>
  )
}

export default App

function CourseListScreen() {

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giang vien: ${course.instructor} \nSo sinh vien: ${course.students}`
    )
  }
  const [query, setQuery] = useState('')
  const [value, setValue] = useState<string | null>(null)
  const categories = Array.from(new Set(courses.map((item) => item.category))).map(
    (cate) => ({ label: cate, value: cate })
  )
  const normalizedQuery = query.trim().toLocaleLowerCase('vi')
  const filteredCourses = courses.filter((course) => {
    const matchesQuery = `${course.title} ${course.instructor} ${course.category}`
      .toLocaleLowerCase('vi')
      .includes(normalizedQuery)
    const matchesCategory = value ? course.category == value : true
    return matchesQuery && matchesCategory
  }
  )



  return (
    <View>
      <FlatList
        data={filteredCourses} // du lieu dau vao
        keyExtractor={(item) => item.id} // phai co id
        renderItem={({ item }) => (
          <CourseRow course={item} onPress={openCourse} />  // danh sach phai co kieu render cho tung item
        )}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Course Catalog</Text>
            <Text style={styles.subtitle}>
              Khám phá các khóa học đang mở
            </Text>

            <View
              style={styles.searchContainer}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm theo tên, giảng viên hoặc danh mục"
                placeholderTextColor="#8A8F98"
                returnKeyType="search"
                style={styles.searchInputInside}
              />
              {query.length > 0 && <Pressable style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>}

            </View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={categories}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder='--chon khoa hoc--'
              value={value}
              onChange={item => { setValue(item.value) }}
            />

            <Text style={styles.resultText}>
              Tìm thấy {filteredCourses.length} khóa học
            </Text>
          </View>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Khong tim thay khoa hoc nao</Text>
            <Text style={styles.emptyText}>Hay thu tim kiem bang mot tu khoa khac</Text>
          </View>
        }
        ItemSeparatorComponent={
          <View style={styles.separator} />
        }
      />
    </View>

  )
}

interface CourseRowProps {
  course: Course,
  onPress: (course: Course) => void
}

function CourseRow({ course, onPress }: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [styles.courseCard, pressed && styles.courseCardPressed]}
    >
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>Giang vien: {course.instructor}</Text>
      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>{course.students}</Text>
      </View>
    </Pressable>
  )
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
  searchInput: {
    minHeight: 52,
    color: '#182035',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E1E5EC',
  },
  courseCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  courseTitle: {
    color: '#182035',
    fontSize: 18,
    fontWeight: '700',
  },
  instructor: {
    color: '#686F7D',
    fontSize: 14,
    marginTop: 7,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  category: {
    overflow: 'hidden',
    color: '#3157A4',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#E8F0FF',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  studentCount: {
    color: '#596171',
    fontSize: 13,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  searchInputInside: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1A1D1E',
  },
  clearButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#8A8F98',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 48,
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: { fontSize: 16, color: '#8A8F98' },
  selectedTextStyle: { fontSize: 16, color: '#1A1D1E' },
});
