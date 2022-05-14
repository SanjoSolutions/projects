import { NodePath } from "@babel/traverse";
import { arrayPattern, arrowFunctionExpression, blockStatement, callExpression, classBody, classDeclaration, exportAllDeclaration, exportNamedDeclaration, exportNamespaceSpecifier, exportSpecifier, expressionStatement, functionDeclaration, identifier, objectPattern, objectProperty, restElement, stringLiteral, variableDeclaration, variableDeclarator, } from "@babel/types";
import { describe, expect, it, test } from "@jest/globals";
import { readFile } from "@sanjo/read-file";
import path from "path";
import { convertToAbsolutePath, createExportsForExportNamedDeclaration, createNamedExport, isClassDeclarationThatIsExportingName, isExportingName, isExportingNameDirectly, isFunctionDeclarationThatIsExportingName, isSpecifierExportingName, isVariableDeclarationThatIsExportingName, OutputFileType, removeExportsWhichAreOnlyImportedByTests2, seemsToBeEmptyDescribeBlockForSymbol, } from "./removeExportsWhichAreOnlyImportedByTests.js";
describe("removeExportsWhichAreOnlyImportedByTests2", () => {
    it("works", async () => {
        const test = "1";
        const file1Path = "1.js";
        const file1SpecPath = "1.spec.js";
        const files = await Promise.all([
            readFixtureFile(test, file1Path),
            readFixtureFile(test, file1SpecPath),
        ]);
        const updatedFiles = removeExportsWhichAreOnlyImportedByTests2(files);
        expect(updatedFiles).toEqual([
            {
                type: OutputFileType.Delete,
                path: generateInputFixtureFilePath(test, file1Path),
            },
            {
                type: OutputFileType.Delete,
                path: generateInputFixtureFilePath(test, file1SpecPath),
            },
        ]);
    });
    describe("only part of the spec can be removed", () => {
        it("only removes part of the spec", async () => {
            const test = "2";
            const file1Path = "1.js";
            const file1SpecPath = "1.spec.js";
            const file2Path = "2.js";
            const files = await Promise.all([
                readFixtureFile(test, file1Path),
                readFixtureFile(test, file1SpecPath),
                readFixtureFile(test, file2Path),
            ]);
            const updatedFiles = removeExportsWhichAreOnlyImportedByTests2(files);
            expect(updatedFiles).toEqual([
                await readExpectedOutputFile(test, "1.js"),
                await readExpectedOutputFile(test, "1.spec.js"),
            ]);
        });
    });
});
async function readFixtureFile(test, path) {
    const filePath = generateInputFixtureFilePath(test, path);
    return {
        path: filePath,
        content: await readFile(filePath),
    };
}
async function readExpectedOutputFile(test, path) {
    const inputFilePath = generateInputFixtureFilePath(test, path);
    const expectedOutputFilePath = generateExpectedOutputFilePath(test, path);
    return {
        type: OutputFileType.Write,
        path: inputFilePath,
        content: await readFile(expectedOutputFilePath),
    };
}
function generateInputFixtureFilePath(test, path2) {
    return path.resolve(__dirname, `fixtures/${test}/input/${path2}`);
}
function generateExpectedOutputFilePath(test, path2) {
    return path.resolve(__dirname, `fixtures/${test}/expectedOutput/${path2}`);
}
describe("isExportingName", () => {
    test('`export { exportedThing }` exports "exportedThing"', () => {
        const exportedThingName = "exportedThing";
        const anExport = exportNamedDeclaration(null, [
            exportSpecifier(identifier(exportedThingName), identifier(exportedThingName)),
        ]);
        const name = exportedThingName;
        expect(isExportingName(anExport, name)).toEqual(true);
    });
});
describe("isVariableDeclarationThatIsExportingName", () => {
    test('`export const exportedConst = null` exports "exportedConst"', () => {
        const exportedConstName = "exportedConst";
        const anExport = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(identifier(exportedConstName)),
        ]));
        const name = exportedConstName;
        expect(isVariableDeclarationThatIsExportingName(anExport, name)).toEqual(true);
    });
});
describe("isFunctionDeclarationThatIsExportingName", () => {
    test('`export function exportedFunction() {}` exports "exportedFunction"', () => {
        const exportedFunctionName = "exportedFunction";
        const anExport = exportNamedDeclaration(functionDeclaration(identifier(exportedFunctionName), [], blockStatement([])));
        const name = exportedFunctionName;
        expect(isFunctionDeclarationThatIsExportingName(anExport, name)).toEqual(true);
    });
});
describe("isClassDeclarationThatIsExportingName", () => {
    test('`export class ExportedClass {}` exports "ExportedClass"', () => {
        const exportedClassName = "ExportedClass";
        const anExport = exportNamedDeclaration(classDeclaration(identifier(exportedClassName), null, classBody([])));
        const name = exportedClassName;
        expect(isClassDeclarationThatIsExportingName(anExport, name));
    });
});
describe("isExportingNameDirectly", () => {
    test('`export { exportedThing }` exports "exportedThing"', () => {
        const exportedThingName = "exportedThing";
        const anExport = exportNamedDeclaration(null, [
            exportSpecifier(identifier(exportedThingName), identifier(exportedThingName)),
        ]);
        const name = exportedThingName;
        expect(isExportingNameDirectly(anExport, name)).toEqual(true);
    });
});
describe("isSpecifierExportingName", () => {
    it("works for exported being a string literal", () => {
        const name = "name";
        const ast = exportSpecifier(identifier(name), stringLiteral(name));
        expect(isSpecifierExportingName(name, ast)).toEqual(true);
    });
});
describe("convertToAbsolutePath", () => {
    if (process.platform === "win32") {
        describe("on Windows", () => {
            it("converts a relative path to an absolute path", () => {
                const filePath = "C:\\Users\\test\\test.spec.js";
                const relativeImportPath = "./test.js";
                expect(convertToAbsolutePath(filePath, relativeImportPath)).toEqual("C:\\Users\\test\\test.js");
            });
            it("keeps an absolute path an absolute path", () => {
                const filePath = "C:\\Users\\test\\test.spec.js";
                const absolutePath = "C:\\Users\\test\\test.js";
                expect(convertToAbsolutePath(filePath, absolutePath)).toEqual(absolutePath);
            });
        });
    }
    else {
        describe("on other platforms than Windows", () => {
            it("converts a relative file path to an absolute path", () => {
                const filePath = "/home/test/file.js";
                const relativeImportPath = "./file2.js";
                expect(convertToAbsolutePath(filePath, relativeImportPath)).toEqual("/home/test/file2.js");
            });
            it("keeps an absolute path an absolute path", () => {
                const filePath = "/home/test/file.js";
                const absolutePath = "/home/test2/file2.js";
                expect(convertToAbsolutePath(filePath, absolutePath)).toEqual(absolutePath);
            });
        });
    }
});
describe("seemsToBeEmptyDescribeBlockForSymbol", () => {
    test("", () => {
        const path = new NodePath({}, {});
        const name = "test";
        path.node = expressionStatement(callExpression(identifier("describe"), [
            stringLiteral(name),
            arrowFunctionExpression([], blockStatement([])),
        ]));
        expect(seemsToBeEmptyDescribeBlockForSymbol(path, name)).toEqual(true);
    });
});
describe("createExportsForExportNamedDeclaration", () => {
    // TODO: Maybe add test for `export default function () {}`
    // TODO: Maybe add tests for default export constructs
    // // Default exports
    // export default expression;
    // export default function (…) { … } // also class, function*
    // export default function name1(…) { … } // also class, function*
    // export { name1 as default, … };
    test("`export const export1, export2`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(identifier(export1Name)),
            variableDeclarator(identifier(export2Name)),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    test("`export const export3`", () => {
        const filePath = "";
        const export1Name = "export3";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(identifier(export1Name)),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
        ]);
    });
    // TODO: Handle other things which can be exported (i.e. class)
    test("`export function export1() {}`", () => {
        const filePath = "";
        const export1Name = "export1";
        const statement = exportNamedDeclaration(functionDeclaration(identifier(export1Name), [], blockStatement([])));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
        ]);
    });
    test("`export { export1, export2 }`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(null, [
            exportSpecifier(identifier(export1Name), identifier(export1Name)),
            exportSpecifier(identifier(export2Name), identifier(export2Name)),
        ]);
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    test("`export { constant1 as export1, constant2 as export2 }`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(null, [
            exportSpecifier(identifier("constant1"), identifier(export1Name)),
            exportSpecifier(identifier("constant2"), identifier(export2Name)),
        ]);
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    // TODO: Correctly determine if something exported is used even when the export is renamed somewhere in the export chain.
    test("`export const { export1, property2: export2 } = object`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(objectPattern([
                objectProperty(identifier(export1Name), identifier(export1Name), false, true),
                objectProperty(identifier("property2"), identifier(export2Name), false, true),
            ]), identifier("object")),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    // TODO: Correctly determine if an export is used which is reexported with this the rest construct
    test("`export const { export1, ...rest } = object`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "rest";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(objectPattern([
                objectProperty(identifier(export1Name), identifier(export1Name), false, true),
                restElement(identifier("rest")),
            ]), identifier("object")),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    test("`export const { property1: [export1, export2] } = object`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(objectPattern([
                objectProperty(identifier("property1"), arrayPattern([identifier(export1Name), identifier(export2Name)]), false, true),
            ]), identifier("object")),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    test("`export const [ export1, export2 ] = array`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(variableDeclaration("const", [
            variableDeclarator(arrayPattern([identifier(export1Name), identifier(export2Name)]), identifier("array")),
        ]));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    describe("`export * from './test.js'`", () => {
        it("exports all named exports from 'test.js'", () => {
            const filePath = "";
            const export1Name = "export1";
            const export2Name = "export2";
            // TODO: Define that test.js exports "export1" and "export2"
            const statement = exportAllDeclaration(stringLiteral("./test.js"));
            const result = createExportsForExportNamedDeclaration(filePath, statement);
            expect(result).toEqual([
                createNamedExport(filePath, export1Name, statement),
                createNamedExport(filePath, export2Name, statement),
            ]);
        });
    });
    describe("`export * as exports from './test.js'`", () => {
        // TODO: Correctly determine if an export is used which is reexported with this construct
        it("exports all named exports from 'test.js' as object 'exports'", () => {
            const filePath = "";
            const export1Name = "export1";
            const export2Name = "export2";
            // TODO: Define that test.js exports "export1" and "export2"
            const statement = exportNamedDeclaration(null, [exportNamespaceSpecifier(identifier("exports"))], stringLiteral("./test.js"));
            const result = createExportsForExportNamedDeclaration(filePath, statement);
            expect(result).toEqual([
                createNamedExport(filePath, "exports", statement),
            ]);
        });
    });
    test("`export { export1, export2 } from './test.js'`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(null, [
            exportSpecifier(identifier(export1Name), identifier(export1Name)),
            exportSpecifier(identifier(export2Name), identifier(export2Name)),
        ], stringLiteral("./test.js"));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
    test("`export { a as export1, b as export2 } from './test.js'`", () => {
        const filePath = "";
        const export1Name = "export1";
        const export2Name = "export2";
        const statement = exportNamedDeclaration(null, [
            exportSpecifier(identifier("a"), identifier(export1Name)),
            exportSpecifier(identifier("b"), identifier(export2Name)),
        ], stringLiteral("./test.js"));
        const result = createExportsForExportNamedDeclaration(filePath, statement);
        expect(result).toEqual([
            createNamedExport(filePath, export1Name, statement),
            createNamedExport(filePath, export2Name, statement),
        ]);
    });
});
//# sourceMappingURL=removeExportsWhichAreOnlyImportedByTests.spec.js.map