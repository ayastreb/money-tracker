import getAccountsMutations from './AccountMutations'
import { EXPENSE, TRANSFER, INCOME } from '../Transaction'

describe('create new transaction', () => {
  it('decreases amount for new expense', () => {
    const prev = undefined
    const next = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      }
    ])
  })

  it('increases amount for new income', () => {
    const prev = undefined
    const next = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 101,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 101,
        currency: 'USD'
      }
    ])
  })

  it('decreases amount for new transfer source, increases for target', () => {
    const prev = undefined
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1070,
        currency: 'JPY'
      }
    ])
  })

  it('does not mutate when new transfer source and target are the same', () => {
    const prev = undefined
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12345',
      linkedAmount: 100,
      linkedCurrency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([])
  })
})

describe('remove transaction', () => {
  it('increases amount for expense', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const next = undefined
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      }
    ])
  })

  it('decreases amount for income', () => {
    const prev = {
      kind: INCOME,
      accountId: 'A12345',
      amount: 101,
      currency: 'USD'
    }
    const next = undefined
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: -101,
        currency: 'USD'
      }
    ])
  })

  it('increases amount for transfer source, decreases for target', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const next = undefined
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      }
    ])
  })
})

describe('update transaction', () => {
  it('removes expense, creates expense', () => {
    const prev = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -100,
      currency: 'USD'
    }
    const next = {
      kind: EXPENSE,
      accountId: 'A12345',
      amount: -150,
      currency: 'USD'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12345',
        amount: -150,
        currency: 'USD'
      }
    ])
  })

  it('removes transfer, creates transfer', () => {
    const prev = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 100,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1070,
      linkedCurrency: 'JPY'
    }
    const next = {
      kind: TRANSFER,
      accountId: 'A12345',
      amount: 150,
      currency: 'USD',
      linkedAccountId: 'A12346',
      linkedAmount: 1500,
      linkedCurrency: 'JPY'
    }
    expect(getAccountsMutations(prev, next)).toEqual([
      {
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: -1070,
        currency: 'JPY'
      },
      {
        accountId: 'A12345',
        amount: -150,
        currency: 'USD'
      },
      {
        accountId: 'A12346',
        amount: 1500,
        currency: 'JPY'
      }
    ])
  })
})
