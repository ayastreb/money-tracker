import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadTags,
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../actions/entities/tags'
import { INCOME, EXPENSE } from '../entities/Transaction'
import TagsStorage from '../util/storage/tags'

export function* loadTagsSaga() {
  const expenseTags = yield call(TagsStorage.load, EXPENSE)
  yield put(loadExpenseTagsSuccess(expenseTags))
  const incomeTags = yield call(TagsStorage.load, INCOME)
  yield put(loadIncomeTagsSuccess(incomeTags))
}

export function* useTag(kind, tag) {
  yield call(TagsStorage.increaseUsage, kind, tag)
}

export default [takeLatest(loadTags, loadTagsSaga)]
