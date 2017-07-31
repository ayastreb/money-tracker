import {
  DISMISS_SYNC_WARNING,
  SET_PENDING_CHANGES_FLAG,
  UNSET_PENDING_CHANGES_FLAG,
  SYNC_REQUEST,
  SYNC_SUCCESS,
  SYNC_FAILURE,
  dismissSyncWarning,
  setPendingChangesFlag,
  unsetPendingChangesFlag,
  startSync
} from './sync'
import { UPDATE_ACCOUNTS_LIST } from './accounts'
import { UPDATE_RECENT_TRANSACTIONS } from './transactions'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as accounts from '../util/storage/accounts'
import * as transactions from '../util/storage/transactions'
let store

it('creates DISMISS_SYNC_WARNING action', () => {
  expect(dismissSyncWarning()).toEqual({
    type: DISMISS_SYNC_WARNING
  })
})

it('creates SET_PENDING_CHANGES_FLAG action', () => {
  expect(setPendingChangesFlag()).toEqual({
    type: SET_PENDING_CHANGES_FLAG
  })
})

it('creates UNSET_PENDING_CHANGES_FLAG action', () => {
  expect(unsetPendingChangesFlag()).toEqual({
    type: UNSET_PENDING_CHANGES_FLAG
  })
})

describe('running sync', () => {
  beforeEach(() => (store = mockStore()))

  it('runs without changes', () => {
    accounts.syncAccounts = jest.fn(resolvePromise(false))
    transactions.syncTransactions = jest.fn(resolvePromise(false))

    return store.dispatch(startSync()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SYNC_REQUEST },
        { type: SYNC_SUCCESS }
      ])
    })
  })

  it('runs with changes', () => {
    accounts.syncAccounts = jest.fn(resolvePromise('foo'))
    transactions.syncTransactions = jest.fn(resolvePromise('bar'))

    return store.dispatch(startSync()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SYNC_REQUEST },
        { type: UPDATE_ACCOUNTS_LIST, accounts: 'foo' },
        { type: UPDATE_RECENT_TRANSACTIONS, transactions: 'bar' },
        { type: SYNC_SUCCESS }
      ])
    })
  })

  it('creates SYNC_FAILURE when failed to sync', () => {
    const error = new Error('could not sync')
    accounts.syncAccounts = jest.fn(rejectPromise(error))

    return store.dispatch(startSync()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SYNC_REQUEST },
        { type: SYNC_FAILURE, error }
      ])
    })
  })
})
