import { takeLatest, call, put } from 'redux-saga/effects'
import {
  loadTags,
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../actions/entities/tags'
import { INCOME, EXPENSE } from '../entities/Transaction'
import TagsStorage from '../util/storage/tags'
import difference from '../util/SetDifference'

export function* loadTagsSaga() {
  const expenseTags = yield call(TagsStorage.load, EXPENSE)
  yield put(loadExpenseTagsSuccess(expenseTags))
  const incomeTags = yield call(TagsStorage.load, INCOME)
  yield put(loadIncomeTagsSuccess(incomeTags))
}

export function* updateTagsUsage(prev, next) {
  const prevTags = new Set((prev && prev.tags) || [])
  const nextTags = new Set((next && next.tags) || [])

  for (const newTag of difference(nextTags, prevTags)) {
    yield call(TagsStorage.updateUsage, next.kind, newTag, 1)
  }
  for (const oldTag of difference(prevTags, nextTags)) {
    yield call(TagsStorage.updateUsage, prev.kind, oldTag, -1)
  }
}

export default [takeLatest(loadTags, loadTagsSaga)]
