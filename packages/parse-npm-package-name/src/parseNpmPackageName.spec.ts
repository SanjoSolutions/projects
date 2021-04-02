import { parseNpmPackageName } from "./parseNpmPackageName";

describe.skip("parseNpmPackageName", () => {
  it("parses npm package names with scope", () => {
    const result = parseNpmPackageName("@example/test-package");
    expect(result).toEqual({ scope: "@example", name: "test-package" });
  });

  it("parses npm package names without scope", () => {
    const result = parseNpmPackageName("test-package");
    expect(result).toEqual({ scope: null, name: "test-package" });
  });
});
