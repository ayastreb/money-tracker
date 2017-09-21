import reducer from './transaction'
import {
  fillInTransactionForm,
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeTags,
  changeDate,
  changeNote
} from '../../../actions/ui/form/transaction'
import Transaction, { EXPENSE, INCOME } from '../../../entities/Transaction.js'
import format from 'date-fns/format'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    kind: Transaction.defaultKind,
    isModalOpen: false
  })
})

it('fills form with given data', () => {
  expect(
    reducer(
      { kind: EXPENSE },
      fillInTransactionForm({
        kind: INCOME,
        accountId: 'A12345',
        amount: 100,
        currency: 'USD'
      })
    )
  ).toEqual({
    kind: INCOME,
    accountId: 'A12345',
    amount: 100,
    currency: 'USD'
  })
})

it('changes transaction type', () => {
  expect(reducer({ kind: EXPENSE }, changeKind(INCOME))).toEqual({
    kind: INCOME
  })
})

it('changes account id, new account has current currency', () => {
  expect(
    reducer(
      { currency: 'USD', accountId: 'A12345' },
      changeAccount({ accountId: 'A12346', currency: ['USD'] })
    )
  ).toEqual({
    currency: 'USD',
    accountId: 'A12346'
  })
})

it('changes account id, new account does not have current currency', () => {
  expect(
    reducer(
      { currency: 'EUR', accountId: 'A12345' },
      changeAccount({ accountId: 'A12346', currency: ['JPY'] })
    )
  ).toEqual({
    currency: 'JPY',
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

it('changes linked account id, new account has current currency', () => {
  expect(
    reducer(
      { linkedCurrency: 'USD', linkedAccountId: 'A12345' },
      changeLinkedAccount({ accountId: 'A12346', currency: ['USD'] })
    )
  ).toEqual({ linkedCurrency: 'USD', linkedAccountId: 'A12346' })
})

it('changes linked account id, new account does not have current currency', () => {
  expect(
    reducer(
      { linkedCurrency: 'EUR', linkedAccountId: 'A12345' },
      changeLinkedAccount({ accountId: 'A12346', currency: ['JPY'] })
    )
  ).toEqual({ linkedCurrency: 'JPY', linkedAccountId: 'A12346' })
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
      { kind: EXPENSE, tags: { [EXPENSE]: ['food'] } },
      changeTags(['food', 'beer'])
    )
  ).toEqual({ kind: EXPENSE, tags: { [EXPENSE]: ['food', 'beer'] } })
})

it('changes income tags', () => {
  expect(
    reducer(
      { kind: INCOME, tags: { [INCOME]: ['salary'] } },
      changeTags(['salary', 'dividends'])
    )
  ).toEqual({ kind: INCOME, tags: { [INCOME]: ['salary', 'dividends'] } })
})

it('changes note', () => {
  expect(reducer({ note: 'foo' }, changeNote('bar'))).toEqual({
    note: 'bar'
  })
})
