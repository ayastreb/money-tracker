import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  changeReportAccounts,
  changeReportKind,
  changeReportTimespan,
  loadReport,
  loadReportFailure,
  loadReportSuccess,
  moveReportDateBackwards,
  moveReportDateForwards
} from '../actions/ui/report'
import Report from '../entities/Report'
import { getNetWorth } from '../selectors/entities/accounts'
import { getBaseCurrency, getExchangeRate } from '../selectors/settings'
import { getReport } from '../selectors/ui/report'
import TransactionsStorage from '../util/storage/transactions'

export function* loadReportSaga() {
  const report = yield select(getReport)
  const base = yield select(getBaseCurrency)
  const exchangeRate = yield select(getExchangeRate)
  const netWorthEnd = report.data.netWorthEnd || (yield select(getNetWorth))
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
      exchangeRate,
      netWorthEnd
    )
    yield put(loadReportSuccess(data))
  } catch (error) {
    yield put(loadReportFailure(error.message))
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
