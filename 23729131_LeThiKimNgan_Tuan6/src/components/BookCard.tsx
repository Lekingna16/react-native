import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Book } from '../data/books';
import { useWishlist } from '../hooks/useWishlist';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(book.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: book.coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        {/* Wishlist Heart Icon */}
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => toggleWishlist(book.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#ff3b30' : '#888888'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{book.category}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#f5a623" />
          <Text style={styles.ratingText}>{book.rating}</Text>
          <Text style={styles.reviewsText}>({book.reviewsCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            {book.price.toLocaleString('vi-VN')} đ
          </Text>
          {Boolean(book.originalPrice && book.originalPrice > book.price) && (
            <Text style={styles.originalPriceText}>
              {book.originalPrice?.toLocaleString('vi-VN')} đ
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  imageWrapper: {
    position: 'relative',
  },
  coverImage: {
    width: 85,
    height: 120,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6f4ea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#1e7e34',
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 20,
  },
  author: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#d32f2f',
  },
  originalPriceText: {
    fontSize: 12,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
