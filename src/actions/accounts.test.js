import {
  loadAccountsSuccess,
  saveAccountRequest,
  saveAccountFailure,
  removeAccountRequest,
  changeBalanceRequest
} from './accounts'

it('creates load success action', () => {
  expect(loadAccountsSuccess()).toEqual({
    type: 'LOAD_ACCOUNTS_SUCCESS'
  })
})

it('creates save request action', () => {
  expect(saveAccountRequest('foo')).toEqual({
    type: 'SAVE_ACCOUNT_REQUEST',
    payload: 'foo'
  })
})

it('creates save failrue action', () => {
  expect(saveAccountFailure('foo')).toEqual({
    type: 'SAVE_ACCOUNT_FAILURE',
    payload: 'foo'
  })
})

it('creates remove request action', () => {
  expect(removeAccountRequest('foo_id')).toEqual({
    type: 'REMOVE_ACCOUNT_REQUEST',
    payload: 'foo_id'
  })
})

it('creates change balance request action', () => {
  expect(changeBalanceRequest('foo_id', 'USD', 199)).toEqual({
    type: 'CHANGE_BALANCE_REQUEST',
    payload: { id: 'foo_id', currency: 'USD', amount: 199 }
  })
})
