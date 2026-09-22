import { View, Text, SafeAreaView, Pressable, Alert, StatusBar, Platform, Button, ActivityIndicator } from 'react-native'
import { useMemo, useState } from 'react'
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

// hien thi du lieu bang FlatList 
function CourseListScreen() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("All")
  const [sort, setSort] = useState('Default')

  const [refresing, setRefshing] = useState(false)
  const PAGE_SIZE = 5;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)

  const onRefresh = () => {
    setRefshing(true)

    setTimeout(() => {
      setQuery("")
      setSelected("All")
      setVisibleCount(PAGE_SIZE)
      setRefshing(false)
    }, 2000)
  }




  const normalizeQuery = query.trim().toLocaleLowerCase('vi')

  const dropdownData = useMemo(() => {
    const uniqueCategories = Array.from(new Set(courses.map(item => item.category)))
    const formatted = uniqueCategories.map(cat => ({ label: cat, value: cat }))
    return [{ label: 'Tat ca danh muc', value: 'All' }, ...formatted]
  }, [])

  const filterSearch = useMemo(() => {
    return courses.filter((item) => {
      const matchesSearch = `${item.category} ${item.instructor} ${item.title}`
        .toLocaleLowerCase('vi')
        .includes(normalizeQuery)

      const matchesDropdown = selected === 'All' || item.category === selected;
      return matchesSearch && matchesDropdown
    })
  }, [query, selected])

  const sortValue = [{ label: 'Tang dan', value: 'Tang dan' }, { label: 'Giam dan', value: 'Giam dan' }]


  const sortData = useMemo(() => {
    if (sort === 'Default') return filterSearch
    return [...filterSearch].sort((a, b) => {
      if (sort === 'Tang dan') return a.students - b.students
      return b.students - a.students
    })
  }, [filterSearch, sort])

  const displayedData = sortData.slice(0, visibleCount)
  const handleLoadMore = () => {
    if (loadingMore || visibleCount >= sortData.length) return
    setLoadingMore(true)

    setTimeout(() => {
      setVisibleCount(preCount => preCount + PAGE_SIZE)
      setLoadingMore(false)
    }, 1000)
  }
  const renderFooter = () => {
    if (!loadingMore) return null
    return (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#3157a4" />
      </View>
    )
  }


  return (

    <FlatList
      data={displayedData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <CourseRow course={item} onPress={() => openCourse(item)} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={refresing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Course Catalog</Text>
          <Text style={styles.subtitle}>Kham pha cac khoa hoc dang mo</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder='Tim kiem ten, giang vien hoac danh muc'
              returnKeyType='search'
              style={styles.searchInput}
            />
            <Pressable style={{ backgroundColor: 'red', padding: 10, borderRadius: 20, margin: 10 }}
              onPress={() => query && setQuery('')}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </Pressable>
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.searchInputInside}
              data={dropdownData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder='Chon danh muc'
              searchPlaceholder='Tim danh muc'
              value={selected}
              onChange={(item) => setSelected(item.value)}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.searchInputInside}
              data={sortValue}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder='Chon kieu loc'
              searchPlaceholder='Tim danh muc'
              value={sort}
              onChange={(item) => setSort(item.value)}
            />
          </View>
          <Text style={styles.resultText}>Tim thay {filterSearch.length} khoa hoc</Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Khong tim thay khoa hoc</Text>
          <Text style={styles.emptyText}>Hay thu tim kiem bang mot tu khoa khac</Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View style={styles.separator}></View>
      )}
      keyboardShouldPersistTaps='handled'

    />
  )
}

// tinh component card row 
interface CourseRowProp {
  course: Course,
  onPress: (course: Course) => void
}

function CourseRow({ course, onPress }: CourseRowProp) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={(press) => [styles.courseCard, press && styles.courseCardPressed]}
    >
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>{course.students} students</Text>
      </View>

    </Pressable>
  )
}

const openCourse = (course: Course) => {
  Alert.alert(course.title, `Giang vien: ${course.instructor} \n Student number: ${course.students}`)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10
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
    flex: 1
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
  columnWrapper: {
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 12, // Thay thế cho ItemSeparatorComponent (vì separator không chạy ngang trong numColumns)
  },

});
