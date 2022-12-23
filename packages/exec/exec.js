import child_process from "child_process";
export function exec(command, options = {}) {
    const execOptions = {
        encoding: "utf-8",
        ...options,
    };
    return new Promise((resolve, reject) => {
        child_process.exec(command, execOptions, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ stdout, stderr });
            }
        });
    });
}
export async function execWithBash(command, options = {}) {
    if (process.platform === "win32") {
        // @ts-ignore
        delete process.platform;
        // @ts-ignore
        process.platform = "linux";
        let env;
        if (options.env) {
            env = { ...options.env };
        }
        else {
            env = {};
        }
        const paths = "/c/Program Files/Git/usr/bin:/c/Program Files/Git/bin";
        if (env.PATH) {
            env.PATH += ":" + paths;
        }
        else {
            env.PATH = paths;
        }
        const result = await exec(command, {
            ...options,
            shell: "C:/Program Files/Git/usr/bin/bash.exe",
            env,
        });
        // @ts-ignore
        process.platform = "win32";
        return result;
    }
    else {
        return await exec(command, options);
    }
}
//# sourceMappingURL=exec.js.map