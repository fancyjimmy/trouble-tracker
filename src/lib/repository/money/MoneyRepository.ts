import type {MoneyTransaction, PrismaClient, Company, Account} from "@prisma/client";
import db from "$lib/db";

export interface MoneyRepository {
    getAllTransactions(): Promise<MoneyTransaction[]>;

    getAllTransactionsInMonth(month: number): Promise<MoneyTransaction[]>;

    getCurrentBalance(): Promise<number>;

    getCurrentBalanceFromAccount(name: string): Promise<number>;

    getTransactionsFromAccount(name: string): Promise<MoneyTransaction[]>;

    getTransactionsFromCategoryAndAccount(accountName: string, categoryName: string): Promise<MoneyTransaction[]>;

    getTransactionsFromCategory(name: string): Promise<MoneyTransaction[]>;

    getTransactionsBetween(startDate: Date, endDate: Date): Promise<MoneyTransaction[]>;

    getTransactionsBetweenFromAccount(startDate: Date, endDate: Date, accountName: string): Promise<MoneyTransaction[]>;


    getPaginatedTransactions(page: number, pageSize: number): Promise<MoneyTransaction[]>;

    createNewTransaction(transaction: MoneyTransaction): Promise<MoneyTransaction>;

    createNewCompany(company: Company): Promise<Company>;

    createNewAccount(account: Account): Promise<Account>;
}

export class MoneyRepositoryImpl implements MoneyRepository {
    constructor(
        public db: PrismaClient
    ) {
    }

    async createNewCompany(company: Company): Promise<Company> {
        return await this.db.company.create({
            data: company
        });
    }

    async getPaginatedTransactions(page: number, pageSize: number): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            skip: page * pageSize,
            take: pageSize
        });
    }

    async createNewAccount(account: Account): Promise<Account> {
        return await this.db.account.create({
            data: account
        });
    }

    async getAllTransactions(): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany();
    }

    async getAllTransactionsInMonth(month: number, year: number = new Date().getFullYear()): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                createdAt: {
                    gt: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                }
            }
        });
    }

    static getBalanceFromTransactions(transactions: MoneyTransaction[]): number {
        return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    }

    async getCurrentBalance(): Promise<number> {
        const transactions = await this.db.moneyTransaction.findMany();
        return MoneyRepositoryImpl.getBalanceFromTransactions(transactions);
    }

    async getCurrentBalanceFromAccount(name: string): Promise<number> {
        const transactions = await this.db.moneyTransaction.findMany({
            where: {
                account: {
                    name: name
                }
            }
        });
        return MoneyRepositoryImpl.getBalanceFromTransactions(transactions);
    }

    async getTransactionsFromAccount(name: string): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                account: {
                    name: name
                }
            }
        });
    }

    async getTransactionsFromCategoryAndAccount(accountName: string, categoryName: string): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                account: {
                    name: accountName
                },
                moneyCategory: {
                    name: categoryName
                }
            }
        });
    }

    async getTransactionsFromCategory(name: string): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                moneyCategory: {
                    name: name
                }
            }
        });
    }

    async getTransactionsBetween(startDate: Date, endDate: Date): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                createdAt: {
                    gt: startDate,
                    lt: endDate
                }
            }
        });
    }

    async getTransactionsBetweenFromAccount(startDate: Date, endDate: Date, accountName: string): Promise<MoneyTransaction[]> {
        return await this.db.moneyTransaction.findMany({
            where: {
                createdAt: {
                    gt: startDate,
                    lt: endDate
                },
                account: {
                    name: accountName
                }
            }
        });
    }

    async createNewTransaction(transaction: MoneyTransaction): Promise<MoneyTransaction> {
        return await this.db.moneyTransaction.create({
            data: transaction
        });
    }

    async getAllAccounts() {
        return await this.db.account.findMany();
    }

    async getAccountBalances() {
        return await this.db.moneyTransaction.groupBy({
            by: ['accountName'],
            _sum: {
                amount: true
            }
        });
    }
}

export default new

MoneyRepositoryImpl(db);