import { useState, useMemo } from 'react'
import { Modal } from '../components/ui/Modal'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionItem } from '../components/transactions/TransactionItem'
import { TransactionFilters } from '../components/transactions/TransactionFilters'
import type { TransactionFilters as Filters } from '../types/transaction'

export const Transactions = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<Filters>({})
  const [isFormOpen, setIsFormOpen] = useState(false)

  const { data: transactions, isLoading, isError, error } = useTransactions(filters)
  const { data: allTransactions } = useTransactions()

  const availableCategories = useMemo(() => {
    if (!allTransactions) return []
    const categoriesSet = new Set(allTransactions.map((t) => t.category))
    return Array.from(categoriesSet).sort()
  }, [allTransactions])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            Ledgr<span className="text-indigo-400">.</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Transactions</h2>
                <p className="text-slate-400">Manage your income and expenses.</p>
            </div>
            <button
            onClick={() => setIsFormOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
            + Add transaction
            </button>
        </div>

        <TransactionFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableCategories={availableCategories}
        />

        {isLoading && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-slate-400">Loading transactions...</p>
          </div>
        )}

        {isError && (
          <div className="bg-rose-950 border border-rose-900 rounded-xl p-8 text-center">
            <p className="text-rose-300">
              {error instanceof Error ? error.message : 'Something went wrong'}
            </p>
          </div>
        )}

        {!isLoading && !isError && transactions && transactions.length === 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
            <p className="text-slate-400 mb-2">No transactions found</p>
            <p className="text-sm text-slate-500">
              {Object.keys(filters).length > 0
                ? 'Try adjusting your filters.'
                : 'Start tracking your income and expenses.'}
            </p>
          </div>
        )}

        {!isLoading && !isError && transactions && transactions.length > 0 && (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction._id} transaction={transaction} />
            ))}
          </div>
        )}

        <Modal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            title="New transaction"
        >
        <TransactionForm onSuccess={() => setIsFormOpen(false)} />
        </Modal>
      </main>
    </div>
  )
}