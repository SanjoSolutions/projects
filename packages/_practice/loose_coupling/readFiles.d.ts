import type { MIMEType } from './MIMEType.js';
export declare function readFiles(directoryToServeFrom: string): Promise<File[]>;
export interface File {
    pathname: string;
    contentType: MIMEType;
    content: string;
}
//# sourceMappingURL=readFiles.d.ts.map