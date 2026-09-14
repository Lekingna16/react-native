/**
 * Generic Interface ApiResponse<T> cho cấu trúc dữ liệu API phân trang
 */
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}
