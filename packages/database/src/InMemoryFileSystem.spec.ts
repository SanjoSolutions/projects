import { InMemoryFileSystem } from "./InMemoryFileSystem";

describe("InMemoryFileSystem", () => {
  it("stores files", async () => {
    const fileSystem = new InMemoryFileSystem();
    const filePath = "index.html";
    const fileContent = "Welcome";
    await fileSystem.store(filePath, fileContent);
    expect(await fileSystem.contains(filePath)).toEqual(true);
    expect(await fileSystem.getContent(filePath)).toEqual(fileContent);
  });
});
