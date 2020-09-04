"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccountBalance = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const read_file_1 = __importDefault(require("@sanjo/read-file"));
const write_file_1 = __importDefault(require("@sanjo/write-file"));
// - Kontostand abfragen (Echtzeit-Kontostand)
// - Kontostand Historie als Linechart
//   - Kontostände als Timesequence abspeichern (für Linechart)
// Kontostand === account balance
const accountBalancesFilePath = './public/account_balances.json';
async function fetchAccountBalance({ branch, account, pin }) {
    const browser = await puppeteer_1.default.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://meine.norisbank.de/trxm/noris/');
    await page.type('#branch', branch);
    await page.type('#account', account);
    await page.type('#pin', pin);
    await page.select('#proxyLogins', 'DisplayTransactions');
    await Promise.all([
        page.waitForNavigation(),
        page.click('#action input'),
    ]);
    const balanceCredits = await page.$$('.balance.credit');
    const lastBalanceCredit = last(balanceCredits);
    const balance = parseCurrency(await lastBalanceCredit.evaluate((element) => element.innerText));
    await browser.close();
    return { balance, time: new Date() };
}
exports.fetchAccountBalance = fetchAccountBalance;
function last(items) {
    return items[items.length - 1];
}
function parseCurrency(currency) {
    return currency.replace(/\./g, '').replace(',', '.');
}
async function saveAccountBalances(accountBalances) {
    await write_file_1.default(accountBalancesFilePath, JSON.stringify(accountBalances));
}
async function loadAccountBalances() {
    const accountBalances = JSON.parse(await read_file_1.default(accountBalancesFilePath));
    return accountBalances;
}
function runFetchAccountBalanceBot() {
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
        setInterval(() => fetchAndSaveAccountBalance({ branch, account, pin }), 1 * 60 * 60 * 1000);
    }
}
async function fetchAndSaveAccountBalance({ branch, account, pin }) {
    const accountBalance = await fetchAccountBalance({ branch, account, pin });
    const accountBalances = await loadAccountBalances();
    accountBalances.push(accountBalance);
    await saveAccountBalances(accountBalances);
}
//# sourceMappingURL=index.js.map