<div class="grid grid-cols-2">
    <div class="grid">
        <p>Test</p>
    </div>
    <div class="grid">
        <h1 class="header">{new Date().toLocaleDateString()}</h1>
        <div class="dashboard-item">
            <h2 class="header">Mood</h2>
            <p>1.3</p>
        </div>
        <div class="dashboard-item">
            <h2 class="header">Weight</h2>
            <p>120.0</p>
        </div>
        <div class="dashboard-item">
            <h2 class="header">Running</h2>
            <p>true</p>
        </div>
        <div class="dashboard-item">
            <h2 class="header">Working Out</h2>
            <p>true</p>
        </div>
        <div class="dashboard-item">
            <h2 class="header">Brush Teeth</h2>
            <p>true</p>
        </div>
        <div class="dashboard-item">
            <h2 class="header">Shower</h2>
            <p>true</p>
        </div>
    </div>
</div>

<style>
    .dashboard-item{
        @apply bg-slate-500 rounded-xl p-4 m-1 grid justify-center;
    }

    .dashboard-item > * {
        @apply text-center;
    }
</style>