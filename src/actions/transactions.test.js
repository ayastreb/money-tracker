import {
  LOAD_RECENT_TRANSACTIONS,
  LOAD_TRANSACTIONS_FAILURE,
  CREATE_TRANSACTION,
  loadRecentTransactions,
  createTransaction
} from './transactions'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as accounts from '../util/storage/accounts'
import * as transactions from '../util/storage/transactions'
import { CHANGE_ACCOUNT_BALANCE } from './accounts'

let store

beforeEach(() => (store = mockStore()))

describe('loading recent transactions', () => {
  it('creates LOAD_RECENT_TRANSACTIONS action', () => {
    const expectedTransactions = [{ id: 'T12345' }, { id: 'T12346' }]
    transactions.retrieveRecentTransactions = jest.fn(
      resolvePromise(expectedTransactions)
    )

    return store.dispatch(loadRecentTransactions()).then(() => {
      const action = store
        .getActions()
        .find(action => action.type === LOAD_RECENT_TRANSACTIONS)
      expect(action.transactions).toEqual(expectedTransactions)
    })
  })

  it('creates LOAD_TRANSACTIONS_FAILURE when failed to load recent transactions', () => {
    const error = new Error()
    transactions.retrieveRecentTransactions = jest.fn(rejectPromise(error))

    return store.dispatch(loadRecentTransactions()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_TRANSACTIONS_FAILURE, error }
      ])
    })
  })
})

describe('creating transaction', () => {
  it('creates CREATE_TRANSACTION action ', () => {
    Date.now = jest.fn(() => '67890')
    const expectedTransaction = {
      id: 'T67890',
      accountId: 'A12345',
      amount: 10000, // converted to cents
      currency: 'USD',
      tags: ['foo'],
      date: '2017-06-22',
      note: 'text'
    }
    transactions.persistTransaction = jest.fn(resolvePromise(true))
    accounts.persistBalanceChange = jest.fn(resolvePromise(true))

    return store
      .dispatch(
        createTransaction({
          accountId: 'A12345',
          amount: 100,
          currency: 'USD',
          tags: ['foo'],
          date: '2017-06-22',
          note: 'text'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: CREATE_TRANSACTION,
            transaction: expectedTransaction
          },
          {
            type: CHANGE_ACCOUNT_BALANCE,
            id: 'A12345',
            currency: 'USD',
            amount: 10000
          }
        ])
      })
  })
})
