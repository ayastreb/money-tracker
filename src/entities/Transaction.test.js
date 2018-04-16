import Transaction, { EXPENSE, TRANSFER, INCOME } from './Transaction'

it('has default kind', () => {
  expect(Transaction.defaultKind).toEqual(EXPENSE)
})

it('has default recent transactions list limit', () => {
  expect(Transaction.recentListLimit).toEqual(5)
})

it('returns kind label', () => {
  expect(Transaction.kindLabel(EXPENSE)).toEqual('Expense')
  expect(Transaction.kindLabel(TRANSFER)).toEqual('Transfer')
  expect(Transaction.kindLabel(INCOME)).toEqual('Income')
})

it('converts transaction date to timestamp', () => {
  const form = {
    kind: EXPENSE,
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD',
    tags: { [EXPENSE]: ['food'] },
    date: '2017-09-20'
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: EXPENSE,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: ['food'],
    date: 1505865600000
  })
})

it('converts transaction date timestamp back to date in form', () => {
  const data = {
    id: 'T1505865600000-1234',
    kind: EXPENSE,
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: ['food'],
    date: 1505865600000
  }
  expect(Transaction.toForm(data)).toEqual({
    id: 'T1505865600000-1234',
    kind: EXPENSE,
    accountId: 'A12345',
    amount: '9.95',
    currency: 'USD',
    tags: { [EXPENSE]: ['food'], [INCOME]: [] },
    note: '',
    date: '2017-09-20'
  })
})

it('converts transaction amount to currency subunit', () => {
  const form = {
    kind: INCOME,
    id: 'T12345',
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD',
    tags: {},
    date: 1505865600000
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: INCOME,
    id: 'T12345',
    accountId: 'A12345',
    amount: 995,
    currency: 'USD',
    date: 1505865600000
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
    linkedCurrency: 'USD',
    tags: {},
    date: 1505865600000
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
    date: 1505865600000
  })
})

it('changes amount sign to negative for expense transaction', () => {
  const form = {
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: 9.95,
    currency: 'USD',
    tags: {},
    date: 1505865600000
  }
  expect(Transaction.fromForm(form)).toEqual({
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    date: 1505865600000
  })
})

it('changes amount back to float and reverses negative sign for expense', () => {
  const data = {
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: -990,
    currency: 'USD',
    tags: ['food']
  }
  expect(Transaction.toForm(data)).toEqual({
    kind: EXPENSE,
    id: 'T12345',
    accountId: 'A12345',
    amount: '9.9',
    currency: 'USD',
    note: '',
    tags: {
      [EXPENSE]: ['food'],
      [INCOME]: []
    }
  })
})

it('changes amount back to float for transfer transaction', () => {
  const data = {
    kind: TRANSFER,
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
    amount: '1000',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '9.09',
    linkedCurrency: 'USD',
    note: '',
    tags: {
      [EXPENSE]: [],
      [INCOME]: [],
      [TRANSFER]: []
    }
  })
})

it('converts id, filters out unrelated fields from storage', () => {
  const doc = {
    _id: 'T1505865600000-12345',
    _rev: '1-abcd',
    _conflicts: [],
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: []
  }
  expect(Transaction.fromStorage(doc)).toEqual({
    id: 'T1505865600000-12345',
    accountId: 'A12345',
    amount: -995,
    currency: 'USD',
    tags: [],
    date: 1505865600000
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
    kind: INCOME,
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
    kind: TRANSFER,
    accountId: 'A12345',
    amount: 990,
    currency: 'USD',
    linkedAccountId: 'A12346',
    linkedAmount: 10000,
    linkedCurrency: 'JPY',
    tags: []
  })
})
