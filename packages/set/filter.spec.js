import { describe, expect, it } from "@jest/globals";
import { filter } from "./filter.js";
describe("filter", () => {
    it("filters a set", () => {
        expect(filter(new Set([1, 2, 3]), (element) => element >= 2)).toEqual(new Set([2, 3]));
    });
});
//# sourceMappingURL=filter.spec.js.map