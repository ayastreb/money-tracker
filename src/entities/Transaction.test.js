import Transaction, { EXPENSE, TRANSFER, INCOME } from './Transaction'

it('has default kind', () => {
  expect(Transaction.defaultKind).toEqual(EXPENSE)
})

it('has default recent transactions list limit', () => {
  expect(Transaction.recentListLimit).toEqual(5)
})

it('defaults id to current timestamp if not present in form', () => {
  const form = {
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD',
    tags: ['food']
  }
  Date.now = jest.fn(() => '1234')
  expect(Transaction.fromForm(form)).toEqual({
    id: 'T1234',
    accountId: 'A12345',
    amount: 995,
    currency: 'USD',
    tags: ['food']
  })
})

it('converts transaction amount to currency subunit', () => {
  const form = {
    kind: INCOME,
    id: 'T12345',
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD'
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: INCOME,
    id: 'T12345',
    accountId: 'A12345',
    amount: 995,
    currency: 'USD',
    tags: []
  })
})

it('converts linked amount for transfer transaction to currency subunit', () => {
  const form = {
    kind: TRANSFER,
    id: 'T12345',
    accountId: 'A12345',
    amount: 1000,
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: 9.09,
    linkedCurrency: 'USD'
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: TRANSFER,
    id: 'T12345',
    accountId: 'A12345',
    amount: 1000,
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: 909,
    linkedCurrency: 'USD',
    tags: []
  })
})

it('changes amount sign to negative for expense transactio', () => {
  const form = {
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD'
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: []
  })
})

it('changes amount back to float and reverses negative sign for expense', () => {
  const data = {
    id: 'T12345',
    accountId: 'A12345',
    amount: -990,
    currency: 'USD',
    tags: []
  }
  expect(Transaction.toForm(data)).toEqual({
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: '9.90',
    currency: 'USD',
    tags: []
  })
})

it('changes amount back to float for transfer transaction', () => {
  const data = {
    id: 'T12345',
    accountId: 'A12345',
    amount: 1000,
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: 909,
    linkedCurrency: 'USD',
    tags: []
  }
  expect(Transaction.toForm(data)).toEqual({
    kind: TRANSFER,
    id: 'T12345',
    accountId: 'A12345',
    amount: '1,000',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '9.09',
    linkedCurrency: 'USD',
    tags: []
  })
})

it('converts id, filters out unrelated fields from storage', () => {
  const doc = {
    _id: 'T12345',
    _rev: '1-abcd',
    _conflicts: [],
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: []
  }
  expect(Transaction.fromStorage(doc)).toEqual({
    id: 'T12345',
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: []
  })
})

it('skips id from data when write to storage', () => {
  const data = {
    kind: INCOME,
    id: 'T12345',
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    tags: []
  }
  expect(Transaction.toStorage(data)).toEqual({
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    tags: []
  })
})

it('stores linked account only for transfer transaction', () => {
  const data = {
    kind: TRANSFER,
    id: 'T12345',
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    linkedAccountId: 'A12346',
    linkedAmount: 10000,
    linkedCurrency: 'JPY',
    tags: []
  }
  expect(Transaction.toStorage(data)).toEqual({
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    linkedAccountId: 'A12346',
    linkedAmount: 10000,
    linkedCurrency: 'JPY',
    tags: []
  })
})
