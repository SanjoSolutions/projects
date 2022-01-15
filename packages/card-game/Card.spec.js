import { describe, expect } from '@jest/globals';
import { Card } from './Card.js';
describe('Card', () => {
    test('constructing a card', () => {
        const card = new Card();
        expect(card).toBeInstanceOf(Card);
    });
});
//# sourceMappingURL=Card.spec.js.map