import type { Transaction } from '../../types/transaction'

interface TransactionItemProps {
    transaction: Transaction
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
    const isIncome = transaction.type === 'income'
    const sign = isIncome ? '+' : '-'
    const amountColor = isIncome ? 'text-emerald-400' : 'text-rose-400'

const formattedDate = new Date(transaction.date).toLocaleDateString('es-AR',{
    day: '2-digit',
    month: 'short',
    year: 'numeric'
})

const formattedAmount = new Intl.NumberFormat('es-AR',{
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
}).format(transaction.amount)

return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center justify-between hover:border-slate-600 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {transaction.category}
          </span>
          <span className="text-xs text-slate-500">{formattedDate}</span>
        </div>
        {transaction.description && (
          <p className="text-white truncate">{transaction.description}</p>
        )}
      </div>

      <div className={`text-xl font-bold ${amountColor} ml-4 whitespace-nowrap`}>
        {sign}{formattedAmount}
      </div>
    </div>
  )
}

