import {
  loadAccounts,
  syncAccounts,
  saveAccount,
  removeAccount,
  changeBalance
} from './accounts'

jest.mock('../util/storage/accounts', () => ({
  loadAll: jest.fn().mockReturnValueOnce('load promise'),
  sync: jest.fn().mockReturnValueOnce('sync promise'),
  save: jest.fn().mockReturnValueOnce('save promise'),
  remove: jest.fn().mockReturnValueOnce('remove promise'),
  changeBalance: jest.fn().mockReturnValueOnce('change balance promise')
}))

it('creates load action', () => {
  expect(loadAccounts()).toEqual({
    type: 'LOAD_ACCOUNTS',
    payload: 'load promise'
  })
})

it('creates sync action', () => {
  expect(syncAccounts()).toEqual({
    type: 'SYNC_ACCOUNTS',
    payload: 'sync promise'
  })
})

it('creates save action', () => {
  expect(saveAccount('foo')).toEqual({
    type: 'SAVE_ACCOUNT',
    payload: 'save promise',
    meta: { account: 'foo' }
  })
})

it('creates remove action', () => {
  expect(removeAccount('foo_id')).toEqual({
    type: 'REMOVE_ACCOUNT',
    payload: 'remove promise',
    meta: { id: 'foo_id' }
  })
})

it('creates change balance action', () => {
  expect(changeBalance('foo_id', 'USD', 199)).toEqual({
    type: 'CHANGE_BALANCE',
    payload: 'change balance promise',
    meta: { id: 'foo_id', currency: 'USD', amount: 199 }
  })
})
