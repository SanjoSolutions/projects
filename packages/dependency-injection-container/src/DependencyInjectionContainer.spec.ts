import { describe, expect, it } from '@jest/globals'
import { DependencyInjectionContainer } from './DependencyInjectionContainer.js'
import { DependingOn } from './DependingOn.js'

describe('DependencyInjectionContainer', () => {
  it('can instantiate a component with dependencies', () => {
    const container = new DependencyInjectionContainer()

    class DatabaseA {}

    const database = new DatabaseA()
    container.register('database', database)

    class ComponentB implements DependingOn {
      database: any

      static getDependencies() {
        return ['database']
      }
    }

    const componentB = container.instantiate<ComponentB>(ComponentB)

    expect(componentB.database).toBeInstanceOf(DatabaseA)
  })
})
