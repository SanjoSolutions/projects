import { describe, it } from '@jest/globals';
import { DependencyInjectionContainer } from './DependencyInjectionContainer.js';
describe('DependencyInjectionContainer', () => {
    it('can instantiate a component with dependencies', () => {
        const container = new DependencyInjectionContainer();
        class DatabaseA {
        }
        const database = new DatabaseA();
        container.register('database', database);
        class ComponentB {
            database;
            static getDependencies() {
                return ['database'];
            }
        }
        const componentB = container.instantiate(ComponentB);
        expect(componentB.database).toBeInstanceOf(DatabaseA);
    });
});
//# sourceMappingURL=DependencyInjectionContainer.spec.js.map