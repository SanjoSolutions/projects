import { describe, expect, it } from "@jest/globals";
import { packageNameToFolderName } from "./packageNameToFolderName.js";
describe("packageNameToFolderName", () => {
    it('"@sanjo/create-package" to "create-package"', () => {
        expect(packageNameToFolderName("@sanjo/create-package")).toEqual("create-package");
    });
    it('"create-package" to "create-package"', () => {
        expect(packageNameToFolderName("create-package")).toEqual("create-package");
    });
});
//# sourceMappingURL=packageNameToFolderName.spec.js.map