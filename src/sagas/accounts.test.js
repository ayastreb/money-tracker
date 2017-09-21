import { call, put, select } from 'redux-saga/effects'
import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  removeAccount,
  removeAccountSuccess
} from '../actions/entities/accounts'
import { saveTransaction } from '../actions/entities/transactions'
import {
  loadAccountsSaga,
  saveAccountSaga,
  saveTransactionSaga,
  removeAccountSaga
} from './accounts'
import { getAccount } from '../selectors/entities/accounts'
import AccountsStorage from '../util/storage/accounts'

it('loads accounts', () => {
  const gen = loadAccountsSaga()

  expect(gen.next().value).toEqual(call(AccountsStorage.loadAll))
  const loaded = ['foo', 'bar']
  expect(gen.next(loaded).value).toEqual(put(loadAccountsSuccess(loaded)))
  // expect(gen.next().done).toBeTruthy()
})

describe('save account', () => {
  const account = { id: 'A12345', name: 'foo' }
  const action = saveAccount(account)
  let gen
  beforeEach(() => (gen = saveAccountSaga(action)))

  it('puts success when no error', () => {
    expect(gen.next().value).toEqual(call(AccountsStorage.save, account))
    expect(gen.next().value).toEqual(put(saveAccountSuccess()))
    expect(gen.next().done).toBeTruthy()
  })

  it('puts failure when error', () => {
    expect(gen.next().value).toEqual(call(AccountsStorage.save, account))
    expect(gen.throw().value).toEqual(put(saveAccountFailure(account.id)))
    expect(gen.next().done).toBeTruthy()
  })
})

it('removes account', () => {
  const action = removeAccount('A12345')
  const gen = removeAccountSaga(action)

  expect(gen.next().value).toEqual(call(AccountsStorage.remove, 'A12345'))
  expect(gen.next().value).toEqual(put(removeAccountSuccess()))
  expect(gen.next().done).toBeTruthy()
})
