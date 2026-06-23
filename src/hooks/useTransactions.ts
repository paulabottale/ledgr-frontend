import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { transactionService } from '../services/transaction'
import type { TransactionFilters } from '../types/transaction'

export const transactionKeys = {
    all: ['transactions'] as const,
    list: (filters?: TransactionFilters) =>
    [...transactionKeys.all, 'list', filters ?? {}] as const, 
    detail: (id:string) => [transactionKeys.all, 'detail', id] as const,
}

export const useTransactions = (filters?: TransactionFilters) => {
    const {token} = useAuth()


return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => transactionService.getAll(token!, filters),
    enabled: !!token,
})
}