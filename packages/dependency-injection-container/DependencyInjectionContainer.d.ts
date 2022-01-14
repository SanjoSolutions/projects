import { DependingOn } from './DependingOn.js';
export declare class DependencyInjectionContainer {
    registry: Map<string, any>;
    constructor();
    register(id: string, component: any): void;
    instantiate<T extends DependingOn>(component: {
        new (): T;
    }): T;
}
//# sourceMappingURL=DependencyInjectionContainer.d.ts.map