import { takeLatest, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { loadReport, loadReportSuccess } from '../actions/ui/report'

export function* loadReportSaga() {
  yield delay(1000)
  yield put(loadReportSuccess())
}

export default [takeLatest(loadReport, loadReportSaga)]
