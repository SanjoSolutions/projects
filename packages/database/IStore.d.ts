export interface IStore {
    contains(path: string): Promise<boolean>;
    getContent(path: string): Promise<string | null>;
    store(path: string, content: string): Promise<void>;
}
//# sourceMappingURL=IStore.d.ts.map