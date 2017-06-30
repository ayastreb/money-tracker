import reducer from './index'
import {
  CHANGE_TRANSACTION_KIND,
  CHANGE_ACCOUNT,
  CHANGE_AMOUNT,
  CHANGE_TRANSACTION_CURRENCY,
  CHANGE_EXPENSE_TAGS,
  CHANGE_INCOME_TAGS,
  CHANGE_DATE,
  CHANGE_NOTE,
  CHANGE_LINKED_ACCOUNT,
  CHANGE_LINKED_AMOUNT,
  CHANGE_LINKED_CURRENCY
} from '../../../actions/ui/transactionForm'
import { SAVE_TRANSACTION } from '../../../actions/transactions'
import {
  DEFAULT_TRANSACTION_KIND,
  EXPENSE,
  INCOME
} from '../../../constants/transaction'
import format from 'date-fns/format'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    kind: DEFAULT_TRANSACTION_KIND,
    accountId: null,
    amount: '',
    currency: null,
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tags: {
      [EXPENSE]: [],
      [INCOME]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  })
})

it('changes transaction type', () => {
  expect(
    reducer(
      { kind: EXPENSE },
      {
        type: CHANGE_TRANSACTION_KIND,
        kind: INCOME
      }
    )
  ).toEqual({ kind: INCOME })
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

it('changes expense tags', () => {
  expect(
    reducer(
      { tags: { [EXPENSE]: ['food'] } },
      { type: CHANGE_EXPENSE_TAGS, tags: ['food', 'beer'] }
    )
  ).toEqual({ tags: { [EXPENSE]: ['food', 'beer'] } })
})

it('changes income tags', () => {
  expect(
    reducer(
      { tags: { [INCOME]: ['salary'] } },
      { type: CHANGE_INCOME_TAGS, tags: ['salary', 'dividends'] }
    )
  ).toEqual({ tags: { [INCOME]: ['salary', 'dividends'] } })
})

it('changes note', () => {
  expect(reducer({ note: 'foo' }, { type: CHANGE_NOTE, note: 'bar' })).toEqual({
    note: 'bar'
  })
})

it('returns default state when create action succeed', () => {
  expect(reducer({}, { type: SAVE_TRANSACTION })).toEqual({
    kind: DEFAULT_TRANSACTION_KIND,
    accountId: null,
    amount: '',
    currency: null,
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tags: {
      [EXPENSE]: [],
      [INCOME]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  })
})
