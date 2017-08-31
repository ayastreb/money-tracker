import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  removeAccount,
  changeBalance
} from './accounts'

it('creates load success action', () => {
  expect(loadAccountsSuccess()).toEqual({
    type: 'LOAD_ACCOUNTS_SUCCESS'
  })
})

it('creates save action', () => {
  expect(saveAccount('foo')).toEqual({
    type: 'SAVE_ACCOUNT',
    payload: 'foo'
  })
})

it('creates save failrue action', () => {
  expect(saveAccountFailure('foo')).toEqual({
    type: 'SAVE_ACCOUNT_FAILURE',
    payload: 'foo'
  })
})

it('creates remove  action', () => {
  expect(removeAccount('foo_id')).toEqual({
    type: 'REMOVE_ACCOUNT',
    payload: 'foo_id'
  })
})

it('creates change balance action', () => {
  expect(
    changeBalance({ id: 'foo_id', currency: 'USD', amount: 199 })
  ).toEqual({
    type: 'CHANGE_BALANCE',
    payload: { id: 'foo_id', currency: 'USD', amount: 199 }
  })
})
