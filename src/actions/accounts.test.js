import {
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT,
  REMOVE_ACCOUNT_FAILURE,
  CHANGE_ACCOUNT_BALANCE,
  CHANGE_ACCOUNT_BALANCE_FAILURE,
  loadAccounts,
  createAccount,
  removeAccount,
  changeAccountBalance
} from './accounts'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as accounts from '../util/storage/accounts'

let store

beforeEach(() => (store = mockStore()))

describe('loading accounts', () => {
  it('creates LOAD_ACCOUNTS_SUCCESS action', () => {
    const expectedAccounts = [{ id: 'A12345' }, { id: 'A12346' }]
    accounts.retrieveAccounts = jest.fn(resolvePromise(expectedAccounts))

    return store.dispatch(loadAccounts()).then(() => {
      const action = store
        .getActions()
        .find(action => action.type === LOAD_ACCOUNTS_SUCCESS)
      expect(action.accounts).toEqual(expectedAccounts)
    })
  })

  it('creates LOAD_ACCOUNTS_FAILURE action when failed to load accounts', () => {
    const error = new Error()
    accounts.retrieveAccounts = jest.fn(rejectPromise(error))

    return store.dispatch(loadAccounts()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_ACCOUNTS_FAILURE, error }
      ])
    })
  })
})

describe('creating account', () => {
  it('creates CREATE_ACCOUNT action', () => {
    accounts.persistAccount = jest.fn(resolvePromise(true))

    return store
      .dispatch(createAccount('foo', 'cash', { USD: 100 }))
      .then(() => {
        expect(
          store.getActions().find(action => action.type === CREATE_ACCOUNT)
        ).toBeTruthy()
      })
  })

  it('converts balance to smaller unit', () => {
    accounts.persistAccount = jest.fn(resolvePromise(true))

    return store
      .dispatch(createAccount('foo', 'cash', { USD: 125.59, JPY: 2218 }))
      .then(() => {
        const action = store
          .getActions()
          .find(action => action.type === CREATE_ACCOUNT)
        expect(action.account.balance).toEqual({
          USD: 12559, // $125.59 becomes 12559 cents
          JPY: 2218 // 2218 yen stays 2218 because yen does not have smaller units
        })
      })
  })

  it('generates ID based on current timestamp', () => {
    accounts.persistAccount = jest.fn(resolvePromise(true))
    Date.now = jest.fn(() => 12345)

    return store
      .dispatch(createAccount('foo', 'cash', { USD: 125.59 }))
      .then(() => {
        const action = store
          .getActions()
          .find(action => action.type === CREATE_ACCOUNT)
        expect(action.account.id).toEqual('A12345')
      })
  })

  it('creates CREATE_ACCOUNT_FAILURE when failed to persist account', () => {
    const error = new Error()
    accounts.persistAccount = jest.fn(rejectPromise(error))

    return store
      .dispatch(createAccount('foo', 'cash', { USD: 125.59 }))
      .then(() => {
        expect(
          store.getActions().find(action => action.type === CREATE_ACCOUNT)
        ).toBeTruthy()
        const failureAction = store
          .getActions()
          .find(action => action.type === CREATE_ACCOUNT_FAILURE)
        expect(failureAction).toBeTruthy()
        expect(failureAction.error).toEqual(error)
        expect(failureAction.name).toEqual('foo')
        expect(failureAction.group).toEqual('cash')
        expect(failureAction.balance).toEqual({ USD: 125.59 })
      })
  })
})

describe('removing account', () => {
  it('creates REMOVE_ACCOUNT action', () => {
    accounts.deleteAccount = jest.fn(resolvePromise(true))

    return store.dispatch(removeAccount('A12345')).then(() => {
      expect(store.getActions()).toEqual([
        { type: REMOVE_ACCOUNT, id: 'A12345' }
      ])
    })
  })

  it('creates REMOVE_ACCOUNT_FAILURE when failed to delete account', () => {
    const error = new Error()
    accounts.deleteAccount = jest.fn(rejectPromise(error))

    return store.dispatch(removeAccount('A12345')).then(() => {
      expect(store.getActions()).toEqual([
        { type: REMOVE_ACCOUNT, id: 'A12345' },
        { type: REMOVE_ACCOUNT_FAILURE, error }
      ])
    })
  })
})

describe('changing balance', () => {
  it('creates CHANGE_ACCOUNT_BALANCE action', () => {
    accounts.persistBalanceChange = jest.fn(resolvePromise(true))

    return store
      .dispatch(changeAccountBalance('A12345', 'USD', -100))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: CHANGE_ACCOUNT_BALANCE,
            id: 'A12345',
            currency: 'USD',
            amount: -100
          }
        ])
      })
  })

  it('creates CHANGE_ACCOUNT_BALANCE_FAILURE when failed to persist balance change', () => {
    const error = new Error()
    accounts.persistBalanceChange = jest.fn(rejectPromise(error))

    return store
      .dispatch(changeAccountBalance('A12345', 'USD', 150))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: CHANGE_ACCOUNT_BALANCE,
            id: 'A12345',
            currency: 'USD',
            amount: 150
          },
          { type: CHANGE_ACCOUNT_BALANCE_FAILURE, error }
        ])
      })
  })
})
