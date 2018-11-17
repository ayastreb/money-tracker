import { createActions } from 'redux-actions';

export const {
  loadTags,
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} = createActions(
  'LOAD_TAGS',
  'LOAD_EXPENSE_TAGS_SUCCESS',
  'LOAD_INCOME_TAGS_SUCCESS'
);
