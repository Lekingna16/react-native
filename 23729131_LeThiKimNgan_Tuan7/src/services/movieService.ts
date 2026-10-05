import type { Movie } from '../types/movie';

const MOVIES_API_URL =
  'https://69f9e1b2c509a40d3aa37925.mockapi.io/Resource';

export const MOVIES_PAGE_SIZE = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toFiniteNumber(value: unknown, fallback = 0): number {
  const numberValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizePosterUrl(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  const url = value.trim();
  const isHttpUrl = /^https?:\/\//i.test(url);
  const isExampleUrl = /^https?:\/\/(?:www\.)?example\.com(?:\/|$)/i.test(url);

  return isHttpUrl && !isExampleUrl ? url : '';
}

function normalizeMovie(value: unknown, index: number): Movie | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = typeof value.title === 'string' ? value.title.trim() : '';
  if (!title) {
    return null;
  }

  return {
    id: String(value.id ?? index),
    title,
    rating: Math.min(10, Math.max(0, toFiniteNumber(value.rating))),
    year: Math.max(0, Math.trunc(toFiniteNumber(value.year))),
    isWatching: value.isWatching === true || value.isWatching === 'true',
    genre:
      typeof value.genre === 'string' && value.genre.trim()
        ? value.genre.trim()
        : 'Chưa phân loại',
    // MockAPI currently returns example.com placeholders for every poster.
    // Skip those URLs so the UI does not make 47 guaranteed-to-fail requests.
    poster: normalizePosterUrl(value.poster),
  };
}

export async function getMovies(
  page: number,
  limit = MOVIES_PAGE_SIZE,
  signal?: AbortSignal,
): Promise<Movie[]> {
  const query = `?page=${page}&limit=${limit}`;
  const response = await fetch(`${MOVIES_API_URL}${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Máy chủ phản hồi lỗi ${response.status}.`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Dữ liệu phim không đúng định dạng.');
  }

  return data
    .map(normalizeMovie)
    .filter((movie): movie is Movie => movie !== null);
}
