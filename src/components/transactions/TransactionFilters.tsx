import type { TransactionFilters as Filters, TransactionType } from '../../types/transaction'

interface TransactionFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  availableCategories: string[]
}

export const TransactionFilters = ({
  filters,
  onFiltersChange,
  availableCategories,
}: TransactionFiltersProps) => {
  const handleTypeChange = (type: TransactionType | 'all') => {
    if (type === 'all') {
      const { type: _, ...rest } = filters
      onFiltersChange(rest)
    } else {
      onFiltersChange({ ...filters, type })
    }
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value === 'all') {
      const { category: _, ...rest } = filters
      onFiltersChange(rest)
    } else {
      onFiltersChange({ ...filters, category: value })
    }
  }

  const buttonClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? 'bg-indigo-500 text-white'
        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
    }`

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-center">
      <div className="flex gap-2">
        <button onClick={() => handleTypeChange('all')} className={buttonClass(!filters.type)}>
          All
        </button>
        <button
          onClick={() => handleTypeChange('income')}
          className={buttonClass(filters.type === 'income')}
        >
          Income
        </button>
        <button
          onClick={() => handleTypeChange('expense')}
          className={buttonClass(filters.type === 'expense')}
        >
          Expense
        </button>
      </div>

      <div className="sm:ml-auto">
        <select
          value={filters.category ?? 'all'}
          onChange={handleCategoryChange}
          className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All categories</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}