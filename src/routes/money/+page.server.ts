import type { PageServerLoad} from "./$types";
import repository from "$lib/repository/money/MoneyRepository";

export const load : PageServerLoad = async () => {
    const accounts = await repository.getAllAccounts();
    return {
        balance: await repository.getCurrentBalance(),
        accounts: accounts,
        transactions: await repository.getPaginatedTransactions(0, 10),
        accountBalances: await repository.getAccountBalances()
    };
};