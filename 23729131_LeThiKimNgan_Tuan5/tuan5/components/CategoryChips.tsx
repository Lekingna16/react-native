import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';

interface CategoryChipsProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = [
  'Tất cả',
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
  'Kỹ năng sống',
  'Khoa học',
  'Tâm lý học',
  'Công nghệ',
];

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const handlePress = (category: string) => {
    setSelectedCategory(category);
    console.log(`[LOG] Đã chọn danh mục: "${category}"`);
    onSelectCategory?.(category);
  };

  return (
    <View style={styles.wrapper}>
      {/* ScrollView ngang: cho phép lướt qua các danh mục mượt mà */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => handlePress(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  // Container cuộn ngang với khoảng cách giữa các chip
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'center',
  },
  // Mỗi chip dạng viên thuốc (pill), viền màu indigo
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#1A237E', // Màu Navy / Indigo
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#1A237E', // Khi được chọn sẽ tô nền Navy
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A237E',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CategoryChips;
