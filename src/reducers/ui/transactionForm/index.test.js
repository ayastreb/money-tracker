import reducer from './index'
import {
  changeTransactionKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeExpenseTags,
  changeIncomeTags,
  changeDate,
  changeNote
} from '../../../actions/ui/transactionForm'
import { saveTransaction } from '../../../actions/transactions'
import Transaction, { EXPENSE, INCOME } from '../../../entities/Transaction.js'
import format from 'date-fns/format'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    kind: Transaction.defaultKind,
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
  expect(reducer({ kind: EXPENSE }, changeTransactionKind(INCOME))).toEqual({
    kind: INCOME
  })
})

it('changes account id', () => {
  expect(reducer({ accountId: 'A12345' }, changeAccount('A12346'))).toEqual({
    accountId: 'A12346'
  })
})

it('changes amount', () => {
  expect(
    reducer(
      {
        amount: 1234,
        currency: 'USD',
        linkedAmount: 100,
        linkedCurrency: 'EUR'
      },
      changeAmount(456)
    )
  ).toEqual({
    amount: 456,
    currency: 'USD',
    linkedAmount: 100,
    linkedCurrency: 'EUR'
  })
})

it('changes currency', () => {
  expect(reducer({ currency: 'USD' }, changeCurrency('EUR'))).toEqual({
    currency: 'EUR'
  })
})

it('changes linked account id', () => {
  expect(
    reducer({ linkedAccountId: 'A12345' }, changeLinkedAccount('A12346'))
  ).toEqual({ linkedAccountId: 'A12346' })
})

it('changes linked amount', () => {
  expect(
    reducer(
      {
        currency: 'USD',
        amount: 100,
        linkedCurrency: 'EUR',
        linkedAmount: 1234
      },
      changeLinkedAmount(456)
    )
  ).toEqual({
    currency: 'USD',
    amount: 100,
    linkedCurrency: 'EUR',
    linkedAmount: 456
  })
})

it('changes linked currency', () => {
  expect(
    reducer({ linkedCurrency: 'USD' }, changeLinkedCurrency('EUR'))
  ).toEqual({ linkedCurrency: 'EUR' })
})

it('changes date', () => {
  expect(reducer({ date: '2017-06-21' }, changeDate('2017-07-01'))).toEqual({
    date: '2017-07-01'
  })
})

it('changes expense tags', () => {
  expect(
    reducer(
      { tags: { [EXPENSE]: ['food'] } },
      changeExpenseTags(['food', 'beer'])
    )
  ).toEqual({ tags: { [EXPENSE]: ['food', 'beer'] } })
})

it('changes income tags', () => {
  expect(
    reducer(
      { tags: { [INCOME]: ['salary'] } },
      changeIncomeTags(['salary', 'dividends'])
    )
  ).toEqual({ tags: { [INCOME]: ['salary', 'dividends'] } })
})

it('changes note', () => {
  expect(reducer({ note: 'foo' }, changeNote('bar'))).toEqual({
    note: 'bar'
  })
})

it('returns default state when create action succeed', () => {
  expect(reducer({}, saveTransaction())).toEqual({
    kind: Transaction.defaultKind,
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
