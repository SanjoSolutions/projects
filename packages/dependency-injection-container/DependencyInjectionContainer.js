export class DependencyInjectionContainer {
    registry;
    constructor() {
        this.registry = new Map();
    }
    register(id, component) {
        if (this.registry.has(id)) {
            throw new Error(`There is already a component registered with the id "${id}".`);
        }
        this.registry.set(id, component);
    }
    instantiate(component) {
        const dependencyIds = component.getDependencies();
        for (const dependencyId of dependencyIds) {
            if (!this.registry.has(dependencyId)) {
                throw new Error(`No component has been registered with the id "${dependencyId}".`);
            }
        }
        const instance = new component();
        for (const dependencyId of dependencyIds) {
            const dependency = this.registry.get(dependencyId);
            instance[dependencyId] = dependency;
        }
        return instance;
    }
}
//# sourceMappingURL=DependencyInjectionContainer.js.map