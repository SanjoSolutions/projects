export interface SearchResult<T> {
  index: number // -1 when not found
  value: T | null // null when not found
}
