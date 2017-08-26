import { createActions } from 'redux-actions'
import { INCOME, EXPENSE } from '../models/Transaction'
import tags from '../util/storage/tags'

export const { loadExpenseTagsSuccess, loadIncomeTagsSuccess } = createActions(
  'LOAD_EXPENSE_TAGS_SUCCESS',
  'LOAD_INCOME_TAGS_SUCCESS'
)

export function useTag() {
  return dispatch => tags.increaseUsage(kind, tag)
}

export function loadExpenseTags() {
  return dispatch =>
    tags.load(EXPENSE).then(tags => loadExpenseTagsSuccess(tags))
}

export function loadIncomeTags() {
  return dispatch => tags.load(INCOME).then(tags => loadIncomeTagsSuccess(tags))
}

export function syncTags() {
  return dispatch =>
    tags.sync().then(() => {
      dispatch(loadExpenseTags())
      dispatch(loadIncomeTags())
    })
}
