import { useState } from 'react'
import type { FormEvent } from 'react'
import { useCreateTransaction } from '../../hooks/useTransactions'
import type { TransactionType } from '../../types/transaction'

interface TransactionFormProps {
  onSuccess: () => void
}

export const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])

  const createMutation = useCreateTransaction()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      amount: Number(amount),
      type,
      category: category.trim(),
      description: description.trim() || undefined,
      date,
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        onSuccess()
      },
    })
  }

  const inputClass =
    'w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-4 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors'

  const labelClass = 'block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            type === 'expense'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
              : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            type === 'income'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-white'
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <label className={labelClass}>Amount</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. groceries, rent, salary"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description (optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a note"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {createMutation.isError && (
        <div className="bg-rose-950 border border-rose-900 rounded-lg p-3">
          <p className="text-rose-300 text-sm">
            {createMutation.error instanceof Error
              ? createMutation.error.message
              : 'Something went wrong'}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
      >
        {createMutation.isPending ? 'Saving...' : 'Save transaction'}
      </button>
    </form>
  )
}