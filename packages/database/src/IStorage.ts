export interface IStorage {
  get(key: string): Promise<any | undefined>
  set(key: string, value: any): Promise<void>
}
