<script lang="ts">
    export let data;

    function formatMoney(cent: number) {
        return (cent / 100).toFixed(2) + "€";
    }

    console.log(data.accountBalances)

</script>
<div class="grid">
    <div class="grid items-center justify-center bg-slate-700 rounded-xl shadow p-4">
        <h2 class="header">Current Balance</h2>
        <p class="text-center">{formatMoney(data.balance)}</p>
        <h3 class="header">Account Balances</h3>
        <div class="grid">
            {#each data.accountBalances as accountBalance}
                <div class="bg-slate-500">
                    <h4 class="header">{accountBalance.accountName}</h4>
                    <p class="text-center">{formatMoney(accountBalance._sum.amount)}</p>
                </div>
            {/each}

        </div>
    </div>
    <div>
        <h2 class="header m-2">
            History
        </h2>
        <div>
            {#each data.transactions as item}
                <div class="flex items-center justify-between bg-slate-700 rounded-xl shadow p-4 m-2">
                    <p class="text-center">{item.name}</p>
                    <p class="text-center">{item.createdAt.toLocaleDateString()}</p>
                    <p class="text-center">{formatMoney(item.amount)}</p>
                </div>
            {/each}
        </div>
    </div>

</div>