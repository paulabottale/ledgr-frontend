export type TransactionType = 'income' | 'expense'

export interface Transaction {
    _id: string
    amount: number
    type: TransactionType
    category: string
    description?: string
    date: string
    organizationId: string
    createdBy: string
    createdAt: string
    updatedAt: string
}

export interface CreateTransactionData {
    amount: number
    type: TransactionType
    category: string
    description?: string
    date?: string
}

export interface UpdateTransactionData {
    amount?: number
    type?: TransactionType
    category?: string
    description?: string
    date?: string
}

export interface TransactionFilters {
    type?: TransactionType
    category?: string
}