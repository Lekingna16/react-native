/**
 * Định nghĩa Type/Interface cho đối tượng dữ liệu trả về từ API
 * Cấu trúc JSON từ endpoint https://jsonplaceholder.typicode.com/todos:
 * {
 *   "userId": 1,
 *   "id": 1,
 *   "title": "delectus aut autem",
 *   "completed": false
 * }
 */
export interface Post {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
}
