import { createActions } from 'redux-actions'

export const {
  loadExpenseTags,
  loadExpenseTagsSuccess,
  loadIncomeTags,
  loadIncomeTagsSuccess
} = createActions(
  'LOAD_EXPENSE_TAGS',
  'LOAD_EXPENSE_TAGS_SUCCESS',
  'LOAD_INCOME_TAGS',
  'LOAD_INCOME_TAGS_SUCCESS'
)
