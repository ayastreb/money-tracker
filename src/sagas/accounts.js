import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  updateAccount,
  removeAccount,
  removeAccountStart,
  removeAccountItemProcessed,
  removeAccountFailure,
  removeAccountSuccess
} from '../actions/entities/accounts'
import { getForm } from '../selectors/ui/form/transaction'
import {
  resetTransactionFormSaga,
  removeTransactionSaga,
  saveTransactionSaga
} from './transactions'
import {
  removeTransaction,
  saveTransaction
} from '../actions/entities/transactions'
import AccountsStorage from '../util/storage/accounts'
import TransactionsStorage from '../util/storage/transactions'
import {
  DELETE_STRATEGY_ARCHIVE,
  DELETE_STRATEGY_CLEANUP,
  DELETE_STRATEGY_MOVE
} from '../entities/Account'

export function* loadAccountsSaga() {
  const accounts = yield call(AccountsStorage.loadAll)
  yield put(loadAccountsSuccess(accounts))
  const transactionForm = yield select(getForm)
  if (!transactionForm.accountId && accounts.length > 0) {
    yield resetTransactionFormSaga()
  }
}

export function* saveAccountSaga(action) {
  const account = action.payload
  try {
    yield call(AccountsStorage.save, account)
    yield resetTransactionFormSaga()
    yield put(saveAccountSuccess())
  } catch (error) {
    yield put(saveAccountFailure(account.id))
  }
}

export function* updateAccountBalanceSaga(mutation) {
  const account = yield call(AccountsStorage.mutateBalance, mutation)
  yield put(updateAccount(account))
}

export function* removeAccountSaga({ payload }) {
  try {
    const deleteStrategies = {
      [DELETE_STRATEGY_ARCHIVE]: deleteStrategyArchive,
      [DELETE_STRATEGY_CLEANUP]: deleteStrategyCleanup,
      [DELETE_STRATEGY_MOVE]: deleteStrategyMove
    }
    const strategy = deleteStrategies[payload.strategy]
    if (strategy) yield strategy(payload.id, payload.moveTo)
  } catch (error) {
    yield put(removeAccountFailure(error.message))
  }
}

function* deleteStrategyArchive(accountId) {
  yield call(AccountsStorage.archive, accountId)
  yield put(removeAccountSuccess(accountId))
}

function* deleteStrategyCleanup(accountId) {
  const transactions = yield call(TransactionsStorage.loadFiltered, {
    accounts: [accountId]
  })
  if (transactions.length > 0) {
    yield put(removeAccountStart(transactions.length))

    for (const [index, tx] of transactions.entries()) {
      yield removeTransactionSaga(removeTransaction(tx.id))
      yield put(removeAccountItemProcessed(index))
    }
  }

  yield call(AccountsStorage.remove, accountId)
  yield put(removeAccountSuccess(accountId))
}

function* deleteStrategyMove(accountId, moveTo) {
  const transactions = yield call(TransactionsStorage.loadFiltered, {
    accounts: [accountId]
  })
  if (transactions.length > 0) {
    yield put(removeAccountStart(transactions.length))

    for (const [index, tx] of transactions.entries()) {
      yield saveTransactionSaga(
        saveTransaction({
          ...tx,
          accountId: tx.accountId === accountId ? moveTo : tx.accountId,
          linkedAccountId:
            tx.linkedAccountId === accountId ? moveTo : tx.linkedAccountId
        })
      )
      yield put(removeAccountItemProcessed(index))
    }
  }

  yield call(AccountsStorage.remove, accountId)
  yield put(removeAccountSuccess(accountId))
}

export default [
  takeLatest(loadAccounts, loadAccountsSaga),
  takeLatest(saveAccount, saveAccountSaga),
  takeLatest(removeAccount, removeAccountSaga),
  takeLatest(removeAccountSuccess, resetTransactionFormSaga)
]
