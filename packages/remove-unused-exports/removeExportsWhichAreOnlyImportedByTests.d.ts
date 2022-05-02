import { NodePath } from "@babel/traverse";
import type { ExportAllDeclaration, ExportDeclaration, ExportDefaultDeclaration, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExportSpecifier, ExpressionStatement, ImportDeclaration } from "@babel/types";
export declare function removeExportsWhichAreOnlyImportedByTests(): Promise<void>;
export interface File {
    path: string;
    content: string;
}
export declare enum OutputFileType {
    Delete = 0,
    Write = 1
}
export declare type OutputFile = FileToDelete | FileToWrite;
interface BaseOutputFile {
    type: OutputFileType;
    path: string;
}
interface FileToDelete extends BaseOutputFile {
    type: OutputFileType.Delete;
}
export interface FileToWrite extends BaseOutputFile {
    type: OutputFileType.Write;
    content: string;
}
export declare function removeExportsWhichAreOnlyImportedByTests2(files: File[]): OutputFile[];
declare type FilePath = string;
declare enum ImportOrExportType {
    Import = 0,
    Export = 1
}
interface Import {
    type: ImportOrExportType.Import;
    filePath: FilePath;
    statement: ImportDeclaration;
}
declare type Export = DefaultExport | NamedExport;
interface BaseExport {
    type: ImportOrExportType.Export;
    filePath: FilePath;
    statement: ExportDeclaration;
    isDefaultExport: boolean;
    usedBy: Import[];
}
interface DefaultExport extends BaseExport {
    statement: ExportDefaultDeclaration;
    isDefaultExport: true;
}
interface NamedExport extends BaseExport {
    statement: ExportNamedDeclaration | ExportAllDeclaration;
    isDefaultExport: false;
    name: string;
}
export declare function createExportsForExportNamedDeclaration(filePath: FilePath, statement: ExportNamedDeclaration | ExportAllDeclaration): Export[];
export declare function createNamedExport(filePath: FilePath, name: string, statement: ExportNamedDeclaration | ExportAllDeclaration): NamedExport;
export declare function convertToAbsolutePath(filePath: FilePath, importPath: FilePath): FilePath;
export declare function isExportingName(anExport: ExportDeclaration, name: string): boolean;
export declare function isVariableDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean;
export declare function isFunctionDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean;
export declare function isClassDeclarationThatIsExportingName(anExport: ExportDeclaration, name: string): boolean;
export declare function isExportingNameDirectly(anExport: ExportDeclaration, name: string): boolean;
export declare function isSpecifierExportingName(name: string, specifier: ExportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier): boolean;
export declare function seemsToBeEmptyDescribeBlockForSymbol(path: NodePath<ExpressionStatement>, name: string): boolean;
export {};
//# sourceMappingURL=removeExportsWhichAreOnlyImportedByTests.d.ts.map