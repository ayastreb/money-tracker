export const CHANGE_TRANSACTION_KIND = 'CHANGE_TRANSACTION_KIND'
export function changeTransactionKind(kind) {
  return {
    type: CHANGE_TRANSACTION_KIND,
    kind
  }
}

export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT'
export function changeAccount(accountId) {
  return {
    type: CHANGE_ACCOUNT,
    accountId
  }
}

export const CHANGE_AMOUNT = 'CHANGE_AMOUNT'
export function changeAmount(amount) {
  return {
    type: CHANGE_AMOUNT,
    amount
  }
}

export const CHANGE_TRANSACTION_CURRENCY = 'CHANGE_TRANSACTION_CURRENCY'
export function changeCurrency(currency) {
  return {
    type: CHANGE_TRANSACTION_CURRENCY,
    currency
  }
}

export const CHANGE_LINKED_ACCOUNT = 'CHANGE_LINKED_ACCOUNT'
export function changeLinkedAccount(accountId) {
  return {
    type: CHANGE_LINKED_ACCOUNT,
    accountId
  }
}

export const CHANGE_LINKED_AMOUNT = 'CHANGE_LINKED_AMOUNT'
export function changeLinkedAmount(amount) {
  return {
    type: CHANGE_LINKED_AMOUNT,
    amount
  }
}

export const CHANGE_LINKED_CURRENCY = 'CHANGE_LINKED_CURRENCY'
export function changeLinkedCurrency(currency) {
  return {
    type: CHANGE_LINKED_CURRENCY,
    currency
  }
}

export const CHANGE_DATE = 'CHANGE_DATE'
export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    date
  }
}

export const ADD_TAG = 'ADD_TAG'
export function addTag(tag) {
  return {
    type: ADD_TAG,
    tag
  }
}

export const CHANGE_TAGS = 'CHANGE_TAGS'
export function changeTags(tags) {
  return {
    type: CHANGE_TAGS,
    tags
  }
}

export const CHANGE_NOTE = 'CHANGE_NOTE'
export function changeNote(note) {
  return {
    type: CHANGE_NOTE,
    note
  }
}
