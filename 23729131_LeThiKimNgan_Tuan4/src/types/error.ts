/**
 * Định nghĩa cấu trúc lỗi tùy biến CustomError
 */
export interface CustomError {
  message: string;
  statusCode?: number;
  details?: string;
}
