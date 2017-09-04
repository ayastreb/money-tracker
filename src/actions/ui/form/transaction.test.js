import {
  fillInTransactionForm,
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  addTag,
  changeTags,
  changeNote
} from './transaction'

it('creates FILL_IN_TRANSACTION_FORM action', () => {
  expect(fillInTransactionForm({ foo: 'bar' })).toEqual({
    type: 'FILL_IN_TRANSACTION_FORM',
    payload: { foo: 'bar' }
  })
})

it('creates CHANGE_KIND action', () => {
  expect(changeKind('transfer')).toEqual({
    type: 'CHANGE_KIND',
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

it('creates ADD_TAG action', () => {
  expect(addTag('foo')).toEqual({
    type: 'ADD_TAG',
    payload: 'foo'
  })
})

it('creates CHANGE_TAGS action', () => {
  expect(changeTags(['foo'])).toEqual({
    type: 'CHANGE_TAGS',
    payload: ['foo']
  })
})

it('creates CHANGE_NOTE action', () => {
  expect(changeNote('foo')).toEqual({
    type: 'CHANGE_NOTE',
    payload: 'foo'
  })
})
