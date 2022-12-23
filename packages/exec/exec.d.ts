/// <reference types="node" />
import type { ExecOptions } from "child_process";
export declare function exec(command: string, options?: ExecOptions): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare function execWithBash(command: string, options?: ExecOptions): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare function execSync(command: string): void;
export declare function execWithBashSync(command: string): void;
//# sourceMappingURL=exec.d.ts.map