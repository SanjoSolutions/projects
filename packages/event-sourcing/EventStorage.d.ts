export declare class EventStorage {
  events: any[]
  _fileName: string
  _hasBeenInitialized: boolean
  constructor(fileName: string)
  initialize(): Promise<void>
  store(event: any): Promise<void>
  retrieve(): any[]
  _verifyInitialized(callerName: string): void
  _persist(): Promise<void>
}
//# sourceMappingURL=EventStorage.d.ts.map
