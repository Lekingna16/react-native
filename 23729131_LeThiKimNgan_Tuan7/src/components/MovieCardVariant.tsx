import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Movie } from '../types/movie';

export type MovieCardVariantProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (movie: Movie) => void;
};

function MoviePoster({ movie, isRowLayout }: { movie: Movie; isRowLayout: boolean }) {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [movie.poster]);

  const posterStyle = isRowLayout ? styles.posterRow : styles.posterTile;

  if (!movie.poster || hasImageError) {
    return (
      <View style={[posterStyle, styles.posterFallback]}>
        <Text style={styles.posterInitial}>{movie.title.charAt(0).toUpperCase()}</Text>
        <Text style={styles.posterFallbackText}>Poster chưa khả dụng</Text>
      </View>
    );
  }

  return (
    <Image
      accessibilityLabel={`Áp phích phim ${movie.title}`}
      source={{ uri: movie.poster }}
      style={posterStyle}
      resizeMode="cover"
      onError={() => setHasImageError(true)}
    />
  );
}

function MovieCardVariant({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardVariantProps) {
  const isRowLayout = layout === 'row';
  const yearLabel = movie.year || 'Chưa rõ';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${movie.title}, ${movie.genre}, ${movie.rating.toFixed(1)} điểm`}
      onPress={() => onSelect(movie)}
      style={({ pressed }) => [
        styles.card,
        isRowLayout ? styles.rowCard : styles.tileCard,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={!isRowLayout ? styles.posterWrapTile : undefined}>
        <MoviePoster movie={movie} isRowLayout={isRowLayout} />

        {!isRowLayout ? (
          <Text style={styles.ratingBadge}>★ {movie.rating.toFixed(1)}</Text>
        ) : null}
      </View>

      {isRowLayout ? (
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            Thể loại: {movie.genre}
          </Text>
          <Text style={styles.meta}>Năm: {yearLabel}</Text>
          <Text style={styles.rating}>★ {movie.rating.toFixed(1)}</Text>
          <Text style={[styles.status, movie.isWatching ? styles.active : styles.inactive]}>
            {movie.isWatching ? 'Đang xem' : 'Chưa xem'}
          </Text>
        </View>
      ) : (
        <View style={styles.tileFooter}>
          <Text style={styles.tileTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.tileMeta} numberOfLines={1}>
            {movie.genre} • {yearLabel}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default React.memo(MovieCardVariant);

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#dbe4ee',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  rowCard: {
    minHeight: 112,
    flexDirection: 'row',
  },
  tileCard: {
    flex: 1,
    maxWidth: '48.5%',
  },
  posterWrapTile: {
    position: 'relative',
  },
  posterRow: {
    width: 82,
    height: 112,
    backgroundColor: '#e2e8f0',
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#e2e8f0',
  },
  posterFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  posterInitial: {
    marginBottom: 5,
    color: '#2563eb',
    fontSize: 28,
    fontWeight: '800',
  },
  posterFallbackText: {
    color: '#64748b',
    fontSize: 10,
    textAlign: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    color: '#fef08a',
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
    gap: 3,
  },
  tileFooter: {
    minHeight: 65,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  tileTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  meta: {
    color: '#64748b',
    fontSize: 12,
  },
  tileMeta: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 11,
  },
  rating: {
    color: '#b45309',
    fontSize: 12,
    fontWeight: '700',
  },
  status: {
    alignSelf: 'flex-start',
    marginTop: 3,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
  },
  active: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  inactive: {
    backgroundColor: '#e2e8f0',
    color: '#475569',
  },
});
