import { takeLatest, put, call, select } from 'redux-saga/effects'
import {
  changeReportKind,
  changeReportTimespan,
  changeReportAccounts,
  moveReportDateBackwards,
  moveReportDateForwards,
  loadReport,
  loadReportSuccess,
  loadReportFailure
} from '../actions/ui/report'
import { getReport } from '../selectors/ui/report'
import { getBaseCurrency, getExchangeRate } from '../selectors/settings'
import TransactionsStorage from '../util/storage/transactions'
import Report from '../entities/Report'

export function* loadReportSaga() {
  const report = yield select(getReport)
  const base = yield select(getBaseCurrency)
  const exchangeRate = yield select(getExchangeRate)
  try {
    const transactions = yield call(
      TransactionsStorage.loadFiltered,
      Report.transactionFilters(report)
    )
    const data = yield call(
      Report.prepareData,
      report,
      transactions,
      base,
      exchangeRate
    )
    yield put(loadReportSuccess(data))
  } catch (error) {
    yield put(loadReportFailure(error))
  }
}

export function* refreshReportSaga() {
  yield put(loadReport())
}

export default [
  takeLatest(loadReport, loadReportSaga),
  takeLatest(changeReportKind, refreshReportSaga),
  takeLatest(changeReportTimespan, refreshReportSaga),
  takeLatest(changeReportAccounts, refreshReportSaga),
  takeLatest(moveReportDateBackwards, refreshReportSaga),
  takeLatest(moveReportDateForwards, refreshReportSaga)
]
