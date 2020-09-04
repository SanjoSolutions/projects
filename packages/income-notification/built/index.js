"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const automation_banking_1 = require("@sanjo/automation-banking");
const node_notifier_1 = __importDefault(require("node-notifier"));
async function main() {
    const branch = process.env.NORIS_BANK_BRANCH;
    const account = process.env.NORIS_BANK_ACCOUNT;
    const pin = process.env.NORIS_BANK_PIN;
    if (!branch) {
        throw new Error('Missing environment variable "NORIS_BANK_BRANCH"!');
    }
    if (!account) {
        throw new Error('Missing environment variable "NORIS_BANK_ACCOUNT"!');
    }
    if (!pin) {
        throw new Error('Missing environment variable "NORIS_BANK_PIN"!');
    }
    if (branch && account && pin) {
        let lastAccountBalance = null;
        while (true) {
            const accountBalance = parseFloat((await automation_banking_1.fetchAccountBalance({
                branch,
                account,
                pin,
            })).balance);
            console.log((new Date()).toLocaleString(), 'account balance:', accountBalance, '€');
            if (lastAccountBalance !== null && accountBalance > lastAccountBalance) {
                await notify();
            }
            lastAccountBalance = accountBalance;
            await wait(hours(1));
        }
    }
}
/**
 * Hours to milliseconds.
 * @param value
 */
function hours(value) {
    return value * 60 * 60 * 1000;
}
function wait(timespan) {
    return new Promise(resolve => setTimeout(resolve, timespan));
}
async function notify() {
    node_notifier_1.default.notify({
        title: 'Income!',
        message: 'Income!',
        timeout: Number.MAX_SAFE_INTEGER,
    }, () => { });
}
main().catch(console.error);
//# sourceMappingURL=index.js.map