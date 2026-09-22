import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface CategoryChipsWrapProps {
  onSelectCategory?: (category: string) => void;
  alignContentMode?: 'flex-start' | 'stretch';
}

const CATEGORIES = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
  'Kỹ năng sống',
  'Khoa học',
];

/**
 * Bài tập 1 (Giờ 2): Danh sách danh mục dạng chip (Category Chips)
 * Container: flexDirection: 'row', flexWrap: 'wrap', gap: 8
 * So sánh khi có alignContent: 'flex-start' và khi không có
 */
export const CategoryChipsWrap: React.FC<CategoryChipsWrapProps> = ({
  onSelectCategory,
  alignContentMode = 'flex-start',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Văn học');

  const handlePress = (category: string) => {
    setSelectedCategory(category);
    console.log(`[LOG] Đã chọn danh mục (Wrap): "${category}"`);
    onSelectCategory?.(category);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerTitle}>Category Chips (Dạng Wrap)</Text>

      {/* Khung viền nét đứt minh họa giống hình đề bài */}
      <View
        style={[
          styles.container,
          alignContentMode === 'flex-start' ? { alignContent: 'flex-start' } : {},
        ]}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  // Yêu cầu kỹ thuật:
  // • Container: flexDirection: 'row', flexWrap: 'wrap', gap: 8.
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    minHeight: 140, // Để quan sát rõ alignContent
  },
  // • Mỗi chip: paddingHorizontal, paddingVertical, borderRadius lớn (pill), border 1px indigo
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  chipSelected: {
    backgroundColor: '#4F46E5',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4F46E5',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CategoryChipsWrap;
