import type { DependingOn } from "./DependingOn.js"

export class DependencyInjectionContainer {
  registry: Map<string, any>

  constructor() {
    this.registry = new Map()
  }

  register(id: string, component: any): void {
    if (this.registry.has(id)) {
      throw new Error(
        `There is already a component registered with the id "${id}".`,
      )
    }

    this.registry.set(id, component)
  }

  instantiate<T extends DependingOn>(component: { new (): T }): T {
    const dependencyIds = (component as any).getDependencies()
    for (const dependencyId of dependencyIds) {
      if (!this.registry.has(dependencyId)) {
        throw new Error(
          `No component has been registered with the id "${dependencyId}".`,
        )
      }
    }

    const instance = new (component as any)() as any
    for (const dependencyId of dependencyIds) {
      const dependency = this.registry.get(dependencyId)
      instance[dependencyId] = dependency
    }

    return instance
  }
}
