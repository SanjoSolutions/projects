"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariable = void 0;
function getEnvironmentVariable(environmentVariableName) {
    const environmentVariable = process.env[environmentVariableName];
    if (environmentVariable) {
        return environmentVariable;
    }
    else {
        throw new Error(`Environment variable "${environmentVariableName}" not set.`);
    }
}
exports.getEnvironmentVariable = getEnvironmentVariable;
//# sourceMappingURL=getEnvironmentVariable.js.map