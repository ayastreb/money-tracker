import reducer from './index'
import {
  CHANGE_TRANSACTION_KIND,
  CHANGE_ACCOUNT,
  CHANGE_AMOUNT,
  CHANGE_TRANSACTION_CURRENCY,
  ADD_TAG,
  CHANGE_TAGS,
  CHANGE_DATE,
  CHANGE_NOTE,
  CHANGE_LINKED_ACCOUNT,
  CHANGE_LINKED_AMOUNT,
  CHANGE_LINKED_CURRENCY
} from '../../../actions/ui/transactionForm'
import { CREATE_TRANSACTION } from '../../../actions/transactions'
import {
  DEFAULT_TRANSACTION_KIND,
  EXPENSE_TRANSACTION,
  INCOME_TRANSACTION
} from '../../../constants/transaction'

it('returns default state for month before October', () => {
  const realTime = new Date().getTime()
  Date = jest.fn(() => ({
    getFullYear: () => 2017,
    getMonth: () => 5,
    getDate: () => 21,
    getTime: () => realTime
  }))

  expect(reducer(undefined, {})).toEqual({
    kind: DEFAULT_TRANSACTION_KIND,
    accountId: null,
    amount: '',
    currency: null,
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tagOptions: [],
    tags: [],
    date: '2017-06-21',
    note: ''
  })
})

it('returns default state for month after October', () => {
  const realTime = new Date().getTime()
  Date = jest.fn(() => ({
    getFullYear: () => 2017,
    getMonth: () => 9,
    getDate: () => 1,
    getTime: () => realTime
  }))

  expect(reducer(undefined, {})).toEqual({
    kind: DEFAULT_TRANSACTION_KIND,
    accountId: null,
    amount: '',
    currency: null,
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tagOptions: [],
    tags: [],
    date: '2017-10-01',
    note: ''
  })
})

it('changes transaction type', () => {
  expect(
    reducer(
      { kind: EXPENSE_TRANSACTION },
      {
        type: CHANGE_TRANSACTION_KIND,
        kind: INCOME_TRANSACTION
      }
    )
  ).toEqual({ kind: INCOME_TRANSACTION })
})

it('changes account id', () => {
  expect(
    reducer(
      { accountId: 'A12345' },
      { type: CHANGE_ACCOUNT, accountId: 'A12346' }
    )
  ).toEqual({ accountId: 'A12346' })
})

it('changes amount', () => {
  expect(
    reducer({ amount: 1234 }, { type: CHANGE_AMOUNT, amount: 456 })
  ).toEqual({ amount: 456 })
})

it('changes currency', () => {
  expect(
    reducer(
      { currency: 'USD' },
      { type: CHANGE_TRANSACTION_CURRENCY, currency: 'EUR' }
    )
  ).toEqual({ currency: 'EUR' })
})

it('changes linked account id', () => {
  expect(
    reducer(
      { linkedAccountId: 'A12345' },
      { type: CHANGE_LINKED_ACCOUNT, accountId: 'A12346' }
    )
  ).toEqual({ linkedAccountId: 'A12346' })
})

it('changes linked amount', () => {
  expect(
    reducer({ linkedAmount: 1234 }, { type: CHANGE_LINKED_AMOUNT, amount: 456 })
  ).toEqual({ linkedAmount: 456 })
})

it('changes linked currency', () => {
  expect(
    reducer(
      { linkedCurrency: 'USD' },
      { type: CHANGE_LINKED_CURRENCY, currency: 'EUR' }
    )
  ).toEqual({ linkedCurrency: 'EUR' })
})

it('changes date', () => {
  expect(
    reducer({ date: '2017-06-21' }, { type: CHANGE_DATE, date: '2017-07-01' })
  ).toEqual({ date: '2017-07-01' })
})

it('adds new tag', () => {
  expect(
    reducer({ tagOptions: ['food'] }, { type: ADD_TAG, tag: 'beer' })
  ).toEqual({
    tagOptions: ['food', 'beer']
  })
})

it('changes tags', () => {
  expect(
    reducer({ tags: ['food'] }, { type: CHANGE_TAGS, tags: ['food', 'beer'] })
  ).toEqual({ tags: ['food', 'beer'] })
})

it('changes note', () => {
  expect(reducer({ note: 'foo' }, { type: CHANGE_NOTE, note: 'bar' })).toEqual({
    note: 'bar'
  })
})

it('returns default state when create action succeed', () => {
  const realTime = new Date().getTime()
  Date = jest.fn(() => ({
    getFullYear: () => 2017,
    getMonth: () => 5,
    getDate: () => 21,
    getTime: () => realTime
  }))

  expect(reducer({}, { type: CREATE_TRANSACTION })).toEqual({
    kind: DEFAULT_TRANSACTION_KIND,
    accountId: null,
    amount: '',
    currency: null,
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tagOptions: [],
    tags: [],
    date: '2017-06-21',
    note: ''
  })
})
