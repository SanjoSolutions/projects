import { describe, expect, it, jest } from "@jest/globals";
import { promises as fs } from "fs";
import path from "path";
import { traverseDirectory } from "./traverseDirectory.js";
describe("traverseDirectory", () => {
    it("traverses a directory recursively", async () => {
        jest.spyOn(path, "resolve").mockReturnValue("/test");
        jest.spyOn(fs, "readdir").mockImplementation((directoryPath) => {
            let directoryEntries;
            if (directoryPath === "/test") {
                directoryEntries = [
                    {
                        name: "1.js",
                        isSymbolicLink() {
                            return false;
                        },
                        isFile() {
                            return true;
                        },
                    },
                    {
                        name: "2.js",
                        isSymbolicLink() {
                            return false;
                        },
                        isFile() {
                            return true;
                        },
                    },
                    {
                        name: "folder1",
                        isSymbolicLink() {
                            return false;
                        },
                        isFile() {
                            return false;
                        },
                        isDirectory() {
                            return true;
                        },
                    },
                ];
            }
            else if (directoryPath === "/test/folder1") {
                directoryEntries = [
                    {
                        name: "3.js",
                        isSymbolicLink() {
                            return false;
                        },
                        isFile() {
                            return true;
                        },
                    },
                ];
            }
            else {
                directoryEntries = [];
            }
            return Promise.resolve(directoryEntries);
        });
        const processFile = jest.fn().mockResolvedValue();
        const directoryPath = "test";
        await traverseDirectory(directoryPath, processFile);
        expect(processFile).toHaveBeenCalledTimes(3);
        expect(processFile).toHaveBeenNthCalledWith(1, "/test/1.js");
        expect(processFile).toHaveBeenNthCalledWith(2, "/test/2.js");
        expect(processFile).toHaveBeenNthCalledWith(3, "/test/folder1/3.js");
    });
});
//# sourceMappingURL=traverseDirectory.spec.js.map