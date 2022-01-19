import { describe, expect, it } from '@jest/globals';
import { parseNpmPackageName } from './parseNpmPackageName.js';
describe('parseNpmPackageName', () => {
    it('parses npm package names with scope', () => {
        const result = parseNpmPackageName('@example/test-package');
        expect(result).toEqual({ scope: '@example', name: 'test-package' });
    });
    it('parses npm package names without scope', () => {
        const result = parseNpmPackageName('test-package');
        expect(result).toEqual({ scope: null, name: 'test-package' });
    });
});
//# sourceMappingURL=parseNpmPackageName.spec.js.map