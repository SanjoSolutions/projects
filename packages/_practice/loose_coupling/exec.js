import child_process from 'child_process';
export async function exec(command, options) {
    return new Promise((resolve, reject) => {
        const server = child_process.exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else if (stderr) {
                reject(new Error(stderr));
            }
        });
        resolve(server);
    });
}
//# sourceMappingURL=exec.js.map