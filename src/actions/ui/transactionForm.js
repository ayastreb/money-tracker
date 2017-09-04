import { createActions } from 'redux-actions'

export const {
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  addExpenseTag,
  addIncomeTag,
  changeExpenseTags,
  changeIncomeTags,
  changeNote
} = createActions(
  'CHANGE_KIND',
  'CHANGE_ACCOUNT',
  'CHANGE_AMOUNT',
  'CHANGE_CURRENCY',
  'CHANGE_LINKED_ACCOUNT',
  'CHANGE_LINKED_AMOUNT',
  'CHANGE_LINKED_CURRENCY',
  'CHANGE_DATE',
  'ADD_EXPENSE_TAG',
  'ADD_INCOME_TAG',
  'CHANGE_EXPENSE_TAGS',
  'CHANGE_INCOME_TAGS',
  'CHANGE_NOTE'
)
