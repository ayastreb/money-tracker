import {
  changeTransactionKind,
  changeAccount,
  changeLinkedAccount,
  changeAmount,
  changeLinkedAmount,
  changeCurrency,
  changeLinkedCurrency,
  changeDate,
  addExpenseTag,
  addIncomeTag,
  changeExpenseTags,
  changeIncomeTags,
  changeNote
} from './transactionForm'

it('creates CHANGE_TRANSACTION_KIND action', () => {
  expect(changeTransactionKind('transfer')).toEqual({
    type: 'CHANGE_TRANSACTION_KIND',
    payload: 'transfer'
  })
})

it('creates CHANGE_ACCOUNT action', () => {
  expect(changeAccount('A12345')).toEqual({
    type: 'CHANGE_ACCOUNT',
    payload: 'A12345'
  })
})

it('creates CHANGE_AMOUNT action', () => {
  expect(changeAmount(123)).toEqual({
    type: 'CHANGE_AMOUNT',
    payload: 123
  })
})

it('creates CHANGE_CURRENCY action', () => {
  expect(changeCurrency('EUR')).toEqual({
    type: 'CHANGE_CURRENCY',
    payload: 'EUR'
  })
})

it('creates CHANGE_LINKED_ACCOUNT action', () => {
  expect(changeLinkedAccount('A12345')).toEqual({
    type: 'CHANGE_LINKED_ACCOUNT',
    payload: 'A12345'
  })
})

it('creates CHANGE_LINKED_AMOUNT action', () => {
  expect(changeLinkedAmount(123)).toEqual({
    type: 'CHANGE_LINKED_AMOUNT',
    payload: 123
  })
})

it('creates CHANGE_LINKED_CURRENCY action', () => {
  expect(changeLinkedCurrency('EUR')).toEqual({
    type: 'CHANGE_LINKED_CURRENCY',
    payload: 'EUR'
  })
})

it('creates CHANGE_DATE action', () => {
  expect(changeDate('2017-06-21')).toEqual({
    type: 'CHANGE_DATE',
    payload: '2017-06-21'
  })
})

it('creates ADD_EXPENSE_TAG action', () => {
  expect(addExpenseTag('food')).toEqual({
    type: 'ADD_EXPENSE_TAG',
    payload: 'food'
  })
})

it('creates ADD_INCOME_TAG action', () => {
  expect(addIncomeTag('salary')).toEqual({
    type: 'ADD_INCOME_TAG',
    payload: 'salary'
  })
})

it('creates CHANGE_EXPENSE_TAGS action', () => {
  expect(changeExpenseTags(['food'])).toEqual({
    type: 'CHANGE_EXPENSE_TAGS',
    payload: ['food']
  })
})

it('creates CHANGE_INCOME_TAGS action', () => {
  expect(changeIncomeTags(['salary'])).toEqual({
    type: 'CHANGE_INCOME_TAGS',
    payload: ['salary']
  })
})

it('creates CHANGE_NOTE action', () => {
  expect(changeNote('foo')).toEqual({
    type: 'CHANGE_NOTE',
    payload: 'foo'
  })
})
