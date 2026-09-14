import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Post } from '../types/post';

interface NewsItemProps {
  item: Post;
  index: number;
  onPress?: (post: Post) => void;
}

/**
 * Component NewsItem:
 * - Chỉ hiển thị tiêu đề (tên) bài viết (item.title), không hiển thị các trạng thái khác
 */
export const NewsItem: React.FC<NewsItemProps> = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => onPress && onPress(item)}
    >
      <Text style={styles.title}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 22,
    textTransform: 'capitalize',
  },
});
