import { describe, expect, it } from "@jest/globals";
import { groupBy } from "./groupBy.js";
describe("groupBy", () => {
    it("groups", () => {
        expect(groupBy(new Set([1, 2, 3]), (element) => element % 2)).toEqual(new Set([new Set([1, 3]), new Set([2])]));
    });
});
//# sourceMappingURL=groupBy.spec.js.map