import { createActions } from 'redux-actions'

export const {
  fillInTransactionForm,
  resetTransactionForm,
  openTransactionInModal,
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  addTag,
  changeTags,
  changeNote
} = createActions(
  'FILL_IN_TRANSACTION_FORM',
  'RESET_TRANSACTION_FORM',
  'OPEN_TRANSACTION_IN_MODAL',
  'CHANGE_KIND',
  'CHANGE_ACCOUNT',
  'CHANGE_AMOUNT',
  'CHANGE_CURRENCY',
  'CHANGE_LINKED_ACCOUNT',
  'CHANGE_LINKED_AMOUNT',
  'CHANGE_LINKED_CURRENCY',
  'CHANGE_DATE',
  'ADD_TAG',
  'CHANGE_TAGS',
  'CHANGE_NOTE'
)
