export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            Ledgr<span className="text-indigo-400">.</span>
          </h1>
          <button className="text-slate-400 hover:text-white text-sm">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-slate-400 mb-8">Welcome back. Here's your financial overview.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400">Total balance</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400">Transactions this month</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-sm text-slate-400">Active wallets</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
          <p className="text-slate-400">
            Dashboard coming soon — transaction management, AI financial agent and Stripe integration
            in development.
          </p>
        </div>
      </main>
    </div>
  );
};