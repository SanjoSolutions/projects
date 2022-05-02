import { isClassDeclaration, isDeclareClass, isDeclareFunction, isDeclareInterface, isDeclareOpaqueType, isDeclareTypeAlias, isDeclareVariable, isEnumDeclaration, isExportNamedDeclaration, isFunctionDeclaration, isIdentifier, isInterfaceDeclaration, isOpaqueType, isTSDeclareFunction, isTSEnumDeclaration, isTSInterfaceDeclaration, isTSTypeAliasDeclaration, isTypeAlias, isVariableDeclaration, } from "@babel/types";
import { readFile } from "@sanjo/read-file";
import { writeFile } from "@sanjo/write-file";
import lodash from "lodash";
import { parse, print } from "recast";
import babelOptions from "recast/parsers/_babel_options.js";
import { parser as baseParser } from "recast/parsers/babel.js";
import { getConfig } from "ts-prune/lib/configurator.js";
import { run } from "ts-prune/lib/runner.js";
const { groupBy } = lodash;
const { default: getBabelOptions } = babelOptions;
const parser = {
    parse(source, options) {
        const babelOptions = getBabelOptions(options);
        babelOptions.plugins.push("typescript");
        babelOptions.plugins.push("jsx");
        return baseParser.parse(source, babelOptions);
    },
};
export async function removeExports() {
    const config = getConfig();
    const output = [];
    function captureOutput(string) {
        output.push(string);
    }
    run(config, captureOutput);
    await removeExportsFromOutput(output);
}
async function removeExportsFromOutput(output) {
    // TODO: Also handle default exports
    const entries = parseOutput(output);
    const groups = groupByFilePath(entries);
    for (const [filePath, entries] of groups) {
        try {
            const ast = parse(await readFile(filePath), {
                parser,
            });
            const symbolNamesToRemove = entries.map(({ symbolName }) => symbolName);
            function isIdentifierWhichMatchesASymbolNameToRemove(identifier) {
                const symbolName = identifier.name;
                return Boolean(symbolName && symbolNamesToRemove.includes(symbolName));
            }
            for (const node of ast.program.body) {
                if (isExportNamedDeclaration(node)) {
                    if (node.declaration) {
                        const { declaration } = node;
                        if (isFunctionDeclaration(declaration) ||
                            isClassDeclaration(declaration) ||
                            isDeclareClass(declaration) ||
                            isDeclareFunction(declaration) ||
                            isDeclareInterface(declaration) ||
                            isDeclareTypeAlias(declaration) ||
                            isDeclareOpaqueType(declaration) ||
                            isDeclareVariable(declaration) ||
                            isInterfaceDeclaration(declaration) ||
                            isOpaqueType(declaration) ||
                            isTypeAlias(declaration) ||
                            isEnumDeclaration(declaration) ||
                            isTSDeclareFunction(declaration) ||
                            isTSInterfaceDeclaration(declaration) ||
                            isTSTypeAliasDeclaration(declaration) ||
                            isTSEnumDeclaration(declaration)) {
                            const identifier = declaration.id;
                            if (identifier &&
                                isIdentifierWhichMatchesASymbolNameToRemove(identifier)) {
                                remove(ast.program.body, node);
                            }
                        }
                        else if (isVariableDeclaration(declaration)) {
                            for (const declaration2 of declaration.declarations) {
                                if (isIdentifier(declaration2.id) &&
                                    isIdentifierWhichMatchesASymbolNameToRemove(declaration2.id)) {
                                    remove(declaration.declarations, declaration2);
                                }
                            }
                            if (declaration.declarations.length === 0) {
                                remove(ast.program.body, node);
                            }
                        }
                    }
                }
            }
            await writeFile(filePath, print(ast).code);
        }
        catch (error) {
            console.error("File path: " + filePath);
            throw error;
        }
    }
}
function remove(array, entry) {
    const index = array.indexOf(entry);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
function parseOutput(output) {
    return output.map(parseEntry);
}
const regExp = /(.+):(\d+) - (.+)(?: \(used in module\))?/;
function parseEntry(entry) {
    const match = regExp.exec(entry);
    if (match) {
        return {
            filePath: match[1],
            line: parseInt(match[2], 10),
            symbolName: match[3],
            isUsedInModule: Boolean(match[4]),
        };
    }
    else {
        throw new Error(`Error while parsing entry: "${entry}"`);
    }
}
function groupByFilePath(entries) {
    return new Map(Object.entries(groupBy(entries, "filePath")));
}
//# sourceMappingURL=index.js.map