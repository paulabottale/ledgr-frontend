import type {
    Transaction,
    CreateTransactionData,
    UpdateTransactionData,
    TransactionFilters,
} from '../types/transaction'

const API_URL = import.meta.env.VITE_API_URL

const buildHeaders = (token:string) => ({
    'Content-Type': 'aplication/json',
    Authorization: `Bearer ${token}`,
})

const handleResponse = async<T>(response:Response): Promise<T> => {
    if(!response.ok) {
        const error = await response.json().catch(() => ({message: 'Request failed'}))
        throw new Error(error.message || 'Request failed')
    }
    return response.json()
}

export const transactionService = {
  async getAll(token: string, filters?: TransactionFilters): Promise<Transaction[]> {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.category) params.append('category', filters.category)

    const queryString = params.toString()
    const url = `${API_URL}/api/transactions${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      headers: buildHeaders(token),
    })

    const data = await handleResponse<{ transactions: Transaction[] }>(response)
    return data.transactions
  },

  async getById(token: string, id: string): Promise<Transaction> {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      headers: buildHeaders(token),
    })

    const data = await handleResponse<{ transaction: Transaction }>(response)
    return data.transaction
  },

  async create(token: string, payload: CreateTransactionData): Promise<Transaction> {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    })

    const data = await handleResponse<{ transaction: Transaction }>(response)
    return data.transaction
  },

  async update(token: string, id: string, payload: UpdateTransactionData): Promise<Transaction> {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'PUT',
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    })

    const data = await handleResponse<{ transaction: Transaction }>(response)
    return data.transaction
  },

  async delete(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'DELETE',
      headers: buildHeaders(token),
    })

    await handleResponse(response)
  },
}