import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadExpenseTags,
  loadIncomeTags,
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../actions/tags'
import { INCOME, EXPENSE } from '../entities/Transaction'
import TagsStorage from '../util/storage/tags'

export function* loadExpenseTagsSaga() {
  const tags = yield call(TagsStorage.load, EXPENSE)
  yield put(loadExpenseTagsSuccess(tags))
}

export function* loadIncomeTagsSaga() {
  const tags = yield call(TagsStorage.load, INCOME)
  yield put(loadIncomeTagsSuccess(tags))
}

export function* useTag(kind, tag) {
  yield call(TagsStorage.increaseUsage, kind, tag)
}

export default [
  takeLatest(loadExpenseTags, loadExpenseTagsSaga),
  takeLatest(loadIncomeTags, loadIncomeTagsSaga)
]
