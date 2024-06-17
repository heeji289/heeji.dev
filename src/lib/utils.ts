export function convertToUniqArray<T>(array: T[]) {
  return Array.from(new Set(array));
}
