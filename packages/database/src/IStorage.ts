export interface IStorage {
  get(key: string): any | undefined
  set(key: string, value: any): void
}
