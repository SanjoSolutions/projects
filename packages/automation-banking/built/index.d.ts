export interface BankCredentials {
    branch: string;
    account: string;
    pin: string;
}
export interface AccountBalance {
    balance: string;
    time: Date;
}
export declare function fetchAccountBalance({ branch, account, pin }: BankCredentials): Promise<AccountBalance>;
//# sourceMappingURL=index.d.ts.map