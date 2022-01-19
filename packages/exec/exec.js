import child_process from 'child_process';
export function exec(command, options = {}) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ stdout, stderr });
            }
        });
    });
}
//# sourceMappingURL=exec.js.map