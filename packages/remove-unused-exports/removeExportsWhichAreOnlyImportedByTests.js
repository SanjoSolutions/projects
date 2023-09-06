import traverse from "@babel/traverse";
import { isArrayPattern, isArrowFunctionExpression, isBlockStatement, isCallExpression, isClassDeclaration, isExportAllDeclaration, isExportDeclaration, isExportDefaultDeclaration, isExportNamedDeclaration, isExportNamespaceSpecifier, isExportSpecifier, isExpressionStatement, isFunctionDeclaration, isFunctionExpression, isIdentifier, isImportDeclaration, isImportDefaultSpecifier, isImportNamespaceSpecifier, isImportSpecifier, isObjectPattern, isObjectProperty, isRestElement, isStringLiteral, isVariableDeclaration, } from "@babel/types";
import { ensureEntryInMap } from "@sanjo/ensure-entry-in-map";
import { removeFile } from "@sanjo/fs";
import { readFile as readFileBase } from "@sanjo/read-file";
import { groupByToMap, isSubset, union } from "@sanjo/set";
import { writeFile as writeFileBase } from "@sanjo/write-file";
import globWithCallback from "glob";
import lodash from "lodash";
import path from "path";
import { parse, print } from "recast";
import babelOptions from "recast/parsers/_babel_options.js";
import { parser as baseParser } from "recast/parsers/babel.js";
import { promisify } from "util";
const { partial } = lodash;
let getBabelOptions;
if (typeof babelOptions === "function") {
    getBabelOptions = babelOptions;
}
else {
    getBabelOptions = babelOptions.default;
}
const glob = promisify(globWithCallback);
// TODO: Export all declaration
export async function removeExportsWhichAreOnlyImportedByTests() {
    const filePaths = await glob("**/*.{spec,test}.{js,jsx,ts,tsx}", {
        ignore: "**/node_modules/**/*",
    });
    const files = await readFiles(filePaths);
    const updatedFiles = removeExportsWhichAreOnlyImportedByTests2(files);
    await persistFiles(updatedFiles);
}
async function readFiles(filePaths) {
    return await Promise.all(filePaths.map(readFile));
}
async function readFile(filePath) {
    return {
        path: filePath,
        content: await readFileBase(filePath),
    };
}
async function persistFiles(files) {
    await Promise.all(files.map(persistFile));
}
async function persistFile(file) {
    if (isFileToDelete(file)) {
        await deleteFile(file);
    }
    else if (isFileToWrite(file)) {
        await writeFile(file);
    }
}
async function deleteFile(file) {
    await removeFile(file.path);
}
async function writeFile(file) {
    await writeFileBase(file.path, file.content);
}
function isFileToDelete(file) {
    return file.type === OutputFileType.Delete;
}
function isFileToWrite(file) {
    return file.type === OutputFileType.Write;
}
export var OutputFileType;
(function (OutputFileType) {
    OutputFileType["Delete"] = "delete";
    OutputFileType["Write"] = "write";
})(OutputFileType || (OutputFileType = {}));
export function removeExportsWhichAreOnlyImportedByTests2(files) {
    const parsedFiles = parseFiles(files);
    const importsAndExports = findImportsAndExportsOfFiles(parsedFiles);
    const exportsWhichAreOnlyImportedByTests = findExportsWhichAreOnlyImportedByTests(importsAndExports);
    const updatedFiles = removeExports(parsedFiles, exportsWhichAreOnlyImportedByTests);
    return updatedFiles;
}
var ImportOrExportType;
(function (ImportOrExportType) {
    ImportOrExportType[ImportOrExportType["Import"] = 0] = "Import";
    ImportOrExportType[ImportOrExportType["Export"] = 1] = "Export";
})(ImportOrExportType || (ImportOrExportType = {}));
function parseFiles(files) {
    return files.map(parseFile);
}
const parser = {
    parse(source, options) {
        const babelOptions = getBabelOptions(options);
        babelOptions.plugins.push("typescript");
        babelOptions.plugins.push("jsx");
        return baseParser.parse(source, babelOptions);
    },
};
function parseFile(file) {
    try {
        const ast = parse(file.content, {
            parser,
        });
        return {
            path: file.path,
            ast,
        };
    }
    catch (error) {
        console.error("Error while trying to parse file: " + file.path);
        throw error;
    }
}
function findImportsAndExportsOfFiles(parsedFiles) {
    const importsAndExports = parsedFiles.map(findImportsAndExports);
    return {
        imports: importsAndExports.flatMap(({ imports }) => imports),
        exports: importsAndExports.flatMap(({ exports }) => exports),
    };
}
function findImportsAndExports(parsedFile) {
    return {
        imports: findImports(parsedFile),
        exports: findExports(parsedFile),
    };
}
function findImports(parsedFile) {
    // TODO: dynamic imports (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)
    const importDeclarations = retrieveBody(parsedFile).filter((statement) => isImportDeclaration(statement));
    return importDeclarations.map(partial(createImport, parsedFile.path));
}
function createImport(filePath, statement) {
    return {
        type: ImportOrExportType.Import,
        filePath,
        statement,
    };
}
function findExports(parsedFile) {
    const exportDeclarations = retrieveBody(parsedFile).filter(isExportNamedDeclarationOrExportDefaultDeclaration);
    return exportDeclarations.flatMap(partial(createExports, parsedFile.path));
}
function isExportNamedDeclarationOrExportDefaultDeclaration(statement) {
    return (isExportNamedDeclaration(statement) || isExportDefaultDeclaration(statement));
}
function createExports(filePath, statement) {
    if (isExportDefaultDeclaration(statement)) {
        return createExportsForExportDefaultDeclaration(filePath, statement);
    }
    else if (isExportNamedDeclaration(statement)) {
        return createExportsForExportNamedDeclaration(filePath, statement);
    }
    else {
        throw new Error("Unexpected case");
    }
}
function createExportsForExportDefaultDeclaration(filePath, statement) {
    return [createDefaultExport(filePath, statement)];
}
function createDefaultExport(filePath, statement) {
    return {
        type: ImportOrExportType.Export,
        filePath,
        statement,
        usedBy: [],
        isDefaultExport: true,
    };
}
export function createExportsForExportNamedDeclaration(filePath, statement) {
    const result = [
        createNamedExport(filePath, "export1", statement),
        createNamedExport(filePath, "export2", statement),
    ];
    if (isReExport(statement)) {
        if (isExportAllDeclaration(statement)) {
            return result;
        }
        else if (isExportNamedDeclaration(statement)) {
            const result = [];
            for (const specifier of statement.specifiers) {
                if (isExportNamespaceSpecifier(specifier)) {
                    return [createNamedExport(filePath, "exports", statement)];
                }
                else if (isExportSpecifier(specifier)) {
                    result.push(createNamedExport(filePath, retrieveName(specifier.exported), statement));
                }
            }
            return result;
        }
        else {
            throw new Error("Unhandled case");
        }
    }
    else {
        if (isExportNamedDeclaration(statement)) {
            if (statement.declaration) {
                if (isVariableDeclaration(statement.declaration)) {
                    return statement.declaration.declarations
                        .flatMap((declarator) => {
                        if (isIdentifier(declarator.id)) {
                            return createNamedExport(filePath, declarator.id.name, statement);
                        }
                        else if (isObjectPattern(declarator.id)) {
                            return declarator.id.properties.flatMap((property) => {
                                if (isObjectProperty(property)) {
                                    if (isIdentifier(property.value)) {
                                        return createNamedExport(filePath, property.value.name, statement);
                                    }
                                    else if (isArrayPattern(property.value)) {
                                        return property.value.elements.map((element) => {
                                            if (isIdentifier(element)) {
                                                return createNamedExport(filePath, element.name, statement);
                                            }
                                            else {
                                                // TODO: Handle other types that element can have.
                                                return null;
                                            }
                                        });
                                    }
                                }
                                else if (isRestElement(property)) {
                                    if (isIdentifier(property.argument)) {
                                        return createNamedExport(filePath, property.argument.name, statement);
                                    }
                                    else {
                                        // TODO: Handle other types of LVal
                                    }
                                }
                                else {
                                    return null;
                                }
                            });
                        }
                        else if (isArrayPattern(declarator.id)) {
                            // TODO: Handle other cases of PatternLike
                            return declarator.id.elements
                                .filter((element) => element && isIdentifier(element))
                                .map((element) => createNamedExport(filePath, element.name, statement));
                        }
                        else {
                            return [];
                        }
                    })
                        .filter((value) => Boolean(value));
                }
                else if (isFunctionDeclaration(statement.declaration)) {
                    if (isIdentifier(statement.declaration.id)) {
                        return [
                            createNamedExport(filePath, statement.declaration.id.name, statement),
                        ];
                    }
                    else {
                        return [];
                    }
                }
            }
        }
        return [
            createNamedExport(filePath, "export1", statement),
            createNamedExport(filePath, "export2", statement),
        ];
    }
    return [];
}
function isReExport(statement) {
    return (isExportAllDeclaration(statement) ||
        (isExportNamedDeclaration(statement) && statement.source !== null));
}
export function createNamedExport(filePath, name, statement) {
    return {
        type: ImportOrExportType.Export,
        filePath,
        statement,
        isDefaultExport: false,
        usedBy: [],
        name,
    };
}
function retrieveBody(parsedFile) {
    return parsedFile.ast.program.body;
}
function findExportsWhichAreOnlyImportedByTests(importsAndExports) {
    const { imports, exports } = importsAndExports;
    const testImports = new Set(findTestImports(imports));
    const exportsWhichAreOnlyImportedByTestsWithImports = [];
    for (const anExport of exports) {
        const importsOfExport = findImportsOfExport(imports, anExport);
        if (areAllImportsTestImports(importsOfExport, testImports)) {
            exportsWhichAreOnlyImportedByTestsWithImports.push(createExportWithUsedBy(anExport, importsOfExport));
        }
    }
    return exportsWhichAreOnlyImportedByTestsWithImports;
}
function findTestImports(imports) {
    return imports.filter(isTestImport);
}
const testFilePathRegExp = /\.(?:spec|test)\.[jt]sx?$/;
function isTestImport(anImport) {
    const { filePath } = anImport;
    return testFilePathRegExp.test(filePath);
}
function findImportsOfExport(imports, anExport) {
    return imports.filter(partial(isImportingExport, anExport));
}
function areAllImportsTestImports(imports, testImports) {
    return areAllInSet(imports, testImports);
}
function areAllInSet(importsOfExport, testImports) {
    return isSubset(importsOfExport, testImports);
}
function createExportWithUsedBy(anExport, importsOfExport) {
    return {
        ...anExport,
        usedBy: importsOfExport,
    };
}
function isImportingExport(anExport, anImport) {
    return (isImportingDefaultExport(anExport, anImport) ||
        isImportingNamedExport(anExport, anImport));
}
function isImportingDefaultExport(anExport, anImport) {
    return (isExportDefaultDeclaration(anExport.statement) &&
        anImport.statement.specifiers.some((specifier) => isImportDefaultSpecifier(specifier) ||
            isImportNamespaceSpecifier(specifier)) &&
        convertToAbsolutePath(anImport.filePath, anImport.statement.source.value) === anExport.filePath);
}
function isImportingNamedExport(anExport, anImport) {
    return (anImport.statement.specifiers.some((specifier) => isImportSpecifier(specifier) &&
        isExportingName(anExport.statement, retrieveName(specifier.imported))) &&
        convertToAbsolutePath(anImport.filePath, anImport.statement.source.value) === anExport.filePath);
}
export function convertToAbsolutePath(filePath, importPath) {
    return path.resolve(path.dirname(filePath), importPath);
}
export function isExportingName(anExport, name) {
    return (isVariableDeclarationThatIsExportingName(anExport, name) ||
        isFunctionDeclarationThatIsExportingName(anExport, name) ||
        isClassDeclarationThatIsExportingName(anExport, name) ||
        isExportingNameDirectly(anExport, name));
}
export function isVariableDeclarationThatIsExportingName(anExport, name) {
    return (isExportNamedDeclaration(anExport) &&
        isVariableDeclaration(anExport.declaration) &&
        anExport.declaration.declarations.some((declarator) => isIdentifier(declarator.id) && declarator.id.name === name));
}
export function isFunctionDeclarationThatIsExportingName(anExport, name) {
    return (isExportNamedDeclaration(anExport) &&
        isFunctionDeclaration(anExport.declaration) &&
        anExport.declaration.id?.name === name);
}
export function isClassDeclarationThatIsExportingName(anExport, name) {
    return (isExportNamedDeclaration(anExport) &&
        isClassDeclaration(anExport.declaration) &&
        anExport.declaration.id?.name === name);
}
// TODO: Case: reexporting
export function isExportingNameDirectly(anExport, name) {
    return (isExportNamedDeclaration(anExport) &&
        anExport?.specifiers.some(partial(isSpecifierExportingName, name)));
}
export function isSpecifierExportingName(name, specifier) {
    if (isExportSpecifier(specifier)) {
        const { exported } = specifier;
        return retrieveName(exported) === name;
    }
    return false;
}
function retrieveName(node) {
    if (isIdentifier(node)) {
        return node.name;
    }
    else if (isStringLiteral(node)) {
        return node.value;
    }
    else {
        throw new Error("Unexpected node");
    }
}
function removeExports(parsedFiles, exportsToRemove) {
    const parsedFilesLookup = generateParsedFilesLookup(parsedFiles);
    const exportsToRemoveGroupedByFile = groupExportsToRemoveByFile(exportsToRemove);
    const importsToRemove = exportsToRemove.flatMap((anExport) => anExport.usedBy.map((anImport) => {
        return {
            ...anImport,
            name: findLocalNameOfImport(anImport, anExport),
            isImportingTheDefaultImport: anExport.isDefaultExport,
        };
    }));
    const importsToRemoveGroupedByFile = groupImportsToRemoveByFile(importsToRemove);
    const thingsToRemoveGroupedByFile = mergeMaps(exportsToRemoveGroupedByFile, importsToRemoveGroupedByFile);
    const jobs = Array.from(thingsToRemoveGroupedByFile.entries()).map(([filePath, thingsToRemove]) => {
        return createThingsToRemoveInFileJob(filePath, thingsToRemove, parsedFilesLookup.get(filePath).ast);
    });
    return Array.from(removeThingsInFiles(jobs));
}
function findLocalNameOfImport(anImport, anExport) {
    const specifierOfImport = anImport.statement.specifiers.find((specifier) => {
        if (isImportNamespaceSpecifier(specifier)) {
            return true;
        }
        else {
            if (anExport.isDefaultExport) {
                if (isImportDefaultSpecifier(specifier)) {
                    return true;
                }
            }
            else if (isImportSpecifier(specifier)) {
                return retrieveName(specifier.imported) === anExport.name;
            }
        }
    });
    if (specifierOfImport) {
        const localName = specifierOfImport.local.name;
        return localName;
    }
    else {
        throw new Error("Couldn't find specifier for import of export.");
    }
}
function createThingsToRemoveInFileJob(path, thingsToRemove, ast) {
    return {
        path,
        thingsToRemove,
        ast,
    };
}
function mergeMaps(...maps) {
    const result = new Map();
    for (const map of maps) {
        for (const [key, value] of map) {
            ensureEntryInMap(result, key, () => new Set());
            const set = result.get(key);
            result.set(key, union(set, value));
        }
    }
    return result;
}
function* removeThingsInFiles(thingsToRemoveInFileJobs) {
    for (const job of thingsToRemoveInFileJobs) {
        yield removeThingsInFile(job);
    }
}
function removeThingsInFile(job) {
    const { path: filePath, thingsToRemove, ast } = job;
    const importsToRemove = Array.from(thingsToRemove).filter(isImportWithWhatSymbolIsImported);
    const localNamesThatAreRemoved = importsToRemove.flatMap((importToRemove) => {
        return importToRemove.name;
    });
    traverse(ast, {
        ExpressionStatement(path) {
            if (seemsToBeTestForSomeOfTheSymbols(localNamesThatAreRemoved, path)) {
                path.remove();
            }
        },
    });
    traverse(ast, {
        ExpressionStatement(path) {
            if (seemsToBeEmptyDescribeBlockForSomeTheSymbols(localNamesThatAreRemoved, path)) {
                path.remove();
            }
        },
    });
    updateImportAndExportStatements(ast, thingsToRemove);
    const content = print(ast, {
        lineTerminator: "\n",
    }).code;
    let file;
    if (content.trim() === "") {
        file = {
            type: OutputFileType.Delete,
            path: filePath,
        };
    }
    else {
        file = {
            type: OutputFileType.Write,
            path: filePath,
            content,
        };
    }
    return file;
}
function updateImportAndExportStatements(ast, thingToRemove) {
    const thingsToRemoveArray = Array.from(thingToRemove);
    const updatedStatements = [];
    for (const statement of ast.program.body) {
        const relevantThingsToRemove = thingsToRemoveArray.filter((thingsToRemove) => thingsToRemove.statement === statement);
        if (isExportDeclaration(statement)) {
            const exportsToRemove = relevantThingsToRemove.filter((thingsToRemove) => isExport(thingsToRemove));
            if (isExportNamedDeclaration(statement)) {
                function isNamedExportToRemove(name) {
                    return exportsToRemove.some((anExport) => !anExport.isDefaultExport && name === anExport.name);
                }
                if (isVariableDeclaration(statement.declaration)) {
                    statement.declaration.declarations = statement.declaration.declarations.filter((declarator) => {
                        if (isIdentifier(declarator.id)) {
                            return isNamedExportToRemove(declarator.id.name);
                        }
                        else {
                            throw new Error("Unhandled case");
                        }
                    });
                    if (statement.declaration.declarations.length >= 1) {
                        updatedStatements.push(statement);
                    }
                }
                else if (statement.declaration) {
                    const exportedName = (statement.declaration
                        ?.id).name;
                    if (exportedName && isNamedExportToRemove(exportedName)) {
                    }
                    else {
                        updatedStatements.push(statement);
                    }
                    console.log("");
                }
                else if (statement.specifiers?.length >= 1) {
                    statement.specifiers = statement.specifiers.filter((specifier) => isNamedExportToRemove(retrieveName(specifier.exported)));
                    if (statement.specifiers.length >= 1) {
                        updatedStatements.push(statement);
                    }
                }
                else {
                    throw new Error("Unhandled case");
                }
            }
            else if (isExportDefaultDeclaration(statement)) {
                if (none(exportsToRemove, (anExport) => anExport.isDefaultExport)) {
                    updatedStatements.push(statement);
                }
            }
            else if (isExportAllDeclaration(statement)) {
                // TODO
                throw new Error("Not implemented");
            }
            else {
                throw new Error("Unhandled case");
            }
        }
        else if (isImportDeclaration(statement)) {
            const importsToRemove = relevantThingsToRemove.filter((thingsToRemove) => isImportWithWhatSymbolIsImported(thingsToRemove));
            statement.specifiers = statement.specifiers.filter((specifier) => {
                if (isImportDefaultSpecifier(specifier)) {
                    return none(importsToRemove, (anImport) => specifier.local.name === anImport.name);
                }
                else if (isImportSpecifier(specifier)) {
                    return none(importsToRemove, (anImport) => specifier.local.name === anImport.name);
                }
                else if (isImportNamespaceSpecifier(specifier)) {
                    return none(importsToRemove, (anImport) => specifier.local.name === anImport.name);
                }
            });
            if (statement.specifiers.length >= 1) {
                updatedStatements.push(statement);
            }
        }
        else {
            updatedStatements.push(statement);
        }
    }
    ast.program.body = updatedStatements;
}
function none(array, predicate) {
    return !array.some(predicate);
}
function isImportWithWhatSymbolIsImported(thing) {
    return thing.type === ImportOrExportType.Import;
}
function isExport(thing) {
    return thing.type === ImportOrExportType.Export;
}
function seemsToBeTestForSomeOfTheSymbols(symbolNames, path) {
    return symbolNames.some(partial(seemsToBeTestForSymbol, path));
}
function seemsToBeTestForSymbol(path, name) {
    return ((isCallExpressionWithName(path.node, "it") ||
        isCallExpressionWithName(path.node, "test")) &&
        Boolean(path.findParent((path) => isExpressionStatement(path.node) &&
            seemsToBeDescribeBlockForSymbol(path, name))) &&
        doesExpressionStatementContainSymbolUsage(path, name));
}
function seemsToBeEmptyDescribeBlockForSomeTheSymbols(symbolNames, path) {
    return symbolNames.some(partial(seemsToBeEmptyDescribeBlockForSymbol, path));
}
export function seemsToBeEmptyDescribeBlockForSymbol(path, name) {
    const a = seemsToBeDescribeBlockForSymbol(path, name);
    const b = isEmptyFunction(path.node.expression.arguments[1]);
    if (a) {
        console.log("");
    }
    return a && b;
}
function isEmptyFunction(statement) {
    return ((isFunctionExpression(statement) || isArrowFunctionExpression(statement)) &&
        isBlockStatement(statement.body) &&
        statement.body.body.length === 0);
}
function seemsToBeDescribeBlockForSymbol(path, name) {
    return (isCallExpressionWithName(path.node, "describe") &&
        isArgumentWithString(path.node.expression.arguments[0], name));
}
function isArgumentWithString(argument, string) {
    return isStringLiteral(argument) && argument.value === string;
}
function isCallExpressionWithName(node, name) {
    return (isCallExpression(node.expression) &&
        isIdentifier(node.expression.callee) &&
        node.expression.callee.name === name);
}
function doesExpressionStatementContainSymbolUsage(path, name) {
    let doesContainSymbolUsage = false;
    path.traverse({
        Identifier(path) {
            if (name === path.node.name) {
                doesContainSymbolUsage = true;
                path.stop();
            }
        },
    });
    return doesContainSymbolUsage;
}
function generateParsedFilesLookup(parsedFiles) {
    return new Map(parsedFiles.map((parsedFile) => [parsedFile.path, parsedFile]));
}
function groupExportsToRemoveByFile(exportsToRemove) {
    return groupByToMap(new Set(exportsToRemove), retrieveFilePath);
}
function groupImportsToRemoveByFile(importsToRemove) {
    return groupByToMap(new Set(importsToRemove), retrieveFilePath);
}
function retrieveFilePath(thing) {
    return thing.filePath;
}
//# sourceMappingURL=removeExportsWhichAreOnlyImportedByTests.js.map