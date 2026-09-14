/**
 * Hàm lọc mảng các object bất kỳ theo trường `name` sử dụng Generic <T>
 * Ràng buộc: Kiểu T phải có trường `name: string` (T extends { name: string })
 *
 * @param items Danh sách các đối tượng kiểu T
 * @param keyword Từ khóa tìm kiếm
 * @returns Danh sách các đối tượng thỏa mãn điều kiện lọc
 */
export function filterByName<T extends { name: string }>(items: T[], keyword: string): T[] {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) {
    return items;
  }
  return items.filter((item) => item.name.toLowerCase().includes(normalizedKeyword));
}
