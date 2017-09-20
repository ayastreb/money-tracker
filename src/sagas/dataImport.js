import { takeLatest, call, put, select } from 'redux-saga/effects'
import union from 'lodash/union'
import {
  startDataImport,
  importFileReadSuccess,
  importLineProcessed,
  importFailure
} from '../actions/ui/dataImport'
import { changeSettingsCurrency } from '../actions/settings'
import { saveAccount } from '../actions/entities/accounts'
import { saveTransaction } from '../actions/entities/transactions'
import { getImportFile } from '../selectors/ui/dataImport'
import { getBaseCurrency, getSecondaryCurrency } from '../selectors/settings'
import { getAccountByName } from '../selectors/entities/accounts'
import { saveAccountSaga } from './accounts'
import { saveTransactionSaga } from './transactions'
import Account from '../entities/Account'
import Transaction from '../entities/Transaction'
import CsvReader from '../util/CsvReader'

export function* startDataImportSaga() {
  try {
    const file = yield select(getImportFile)
    const { transactions, accounts, currencies } = yield call(CsvReader, file)

    yield put(importFileReadSuccess(transactions.length - 1))
    yield updateCurrencySettings(currencies)
    const accountIds = yield mapAccountsToIds(accounts)

    for (const [lineNr, transaction] of transactions.entries()) {
      yield saveTransactionSaga(
        saveTransaction(
          Transaction.fromForm({
            ...transaction,
            accountId: accountIds.get(transaction.account),
            linkedAccountId: accountIds.get(transaction.linkedAccount)
          })
        )
      )
      yield put(importLineProcessed(lineNr))
    }
  } catch (error) {
    yield put(importFailure(error))
  }
}

/**
 * Set currencies from import file as secondary.
 *
 * @param {Set} currencies
 */
export function* updateCurrencySettings(currencies) {
  const base = yield select(getBaseCurrency)
  const secondary = yield select(getSecondaryCurrency)

  yield put(
    changeSettingsCurrency({
      base,
      secondary: union(secondary, [...currencies])
    })
  )
}

/**
 * Map account name to account ID.
 * If no account found in local accounts, create new one.
 *
 * @param {Map} accounts name => set of currencies map
 */
export function* mapAccountsToIds(accounts) {
  const idMap = new Map()
  for (const [name, currency] of accounts.entries()) {
    if (!idMap.has(name)) {
      let account = yield select(getAccountByName(name))
      if (!account) {
        account = Account.fromForm({
          name,
          group: 'cash',
          balance: [...currency].reduce((acc, code) => {
            acc[code] = 0
            return acc
          }, {}),
          currencies: [...currency],
          on_dashboard: false
        })
        yield saveAccountSaga(saveAccount(account))
      }
      idMap.set(name, account.id)
    }
  }

  return idMap
}

export default [takeLatest(startDataImport, startDataImportSaga)]
