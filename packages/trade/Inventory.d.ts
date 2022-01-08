export interface IInventory {
    putOut(indexes: number[]): any[];
    putIn(items: any[]): void;
}
export declare class Inventory implements IInventory {
    items: any[];
    constructor();
    putOut(indexes: number[]): any;
    putIn(items: any[]): void;
}
//# sourceMappingURL=Inventory.d.ts.map