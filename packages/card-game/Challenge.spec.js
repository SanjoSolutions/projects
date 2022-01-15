import { Challenge } from './Challenge.js';
import { Option } from './Option.js';
describe('Challenge', () => {
    it('can be solved', () => {
        const challenge = new Challenge();
        const option = new Option();
        const isSolutionAccepted = challenge.solve(option);
        expect(typeof isSolutionAccepted).toEqual('boolean');
    });
});
//# sourceMappingURL=Challenge.spec.js.map