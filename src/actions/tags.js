import { createActions } from 'redux-actions'
import { INCOME, EXPENSE } from '../models/Transaction'
import tags from '../util/storage/tags'

export const { loadExpenseTagsSuccess, loadIncomeTagsSuccess } = createActions(
  'LOAD_EXPENSE_TAGS_SUCCESS',
  'LOAD_INCOME_TAGS_SUCCESS'
)

export function useTag(kind, tag) {
  return dispatch => tags.increaseUsage(kind, tag)
}

export function loadExpenseTags() {
  return dispatch =>
    tags
      .load(EXPENSE)
      .then(tags => dispatch(loadExpenseTagsSuccess(tags)))
      .catch(error => console.error(error))
}

export function loadIncomeTags() {
  return dispatch =>
    tags
      .load(INCOME)
      .then(tags => dispatch(loadIncomeTagsSuccess(tags)))
      .catch(error => console.error(error))
}

export function syncTags() {
  return dispatch =>
    tags.sync().then(() => {
      dispatch(loadExpenseTags())
      dispatch(loadIncomeTags())
    })
}
