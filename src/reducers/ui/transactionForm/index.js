import {
  CHANGE_TRANSACTION_KIND,
  CHANGE_ACCOUNT,
  CHANGE_AMOUNT,
  CHANGE_TRANSACTION_CURRENCY,
  CHANGE_LINKED_ACCOUNT,
  CHANGE_LINKED_AMOUNT,
  CHANGE_LINKED_CURRENCY,
  CHANGE_EXPENSE_TAGS,
  CHANGE_INCOME_TAGS,
  CHANGE_DATE,
  CHANGE_NOTE
} from '../../../actions/ui/transactionForm'
import { SAVE_TRANSACTION } from '../../../actions/transactions'
import {
  EXPENSE,
  INCOME,
  DEFAULT_TRANSACTION_KIND
} from '../../../constants/transaction'
import { formatInternal } from '../../../util/date'

export default function(state = initialState(), action) {
  switch (action.type) {
    case CHANGE_TRANSACTION_KIND:
      return { ...state, kind: action.kind }
    case CHANGE_ACCOUNT:
      return { ...state, accountId: action.accountId }
    case CHANGE_AMOUNT:
      return { ...state, amount: action.amount }
    case CHANGE_TRANSACTION_CURRENCY:
      return { ...state, currency: action.currency }
    case CHANGE_LINKED_ACCOUNT:
      return { ...state, linkedAccountId: action.accountId }
    case CHANGE_LINKED_AMOUNT:
      return { ...state, linkedAmount: action.amount }
    case CHANGE_LINKED_CURRENCY:
      return { ...state, linkedCurrency: action.currency }
    case CHANGE_EXPENSE_TAGS:
      return {
        ...state,
        tags: { ...state.tags, [EXPENSE]: action.tags }
      }
    case CHANGE_INCOME_TAGS:
      return {
        ...state,
        tags: { ...state.tags, [INCOME]: action.tags }
      }
    case CHANGE_DATE:
      return { ...state, date: action.date }
    case CHANGE_NOTE:
      return { ...state, note: action.note }
    case SAVE_TRANSACTION:
      return initialState()
    default:
      return state
  }
}

const initialState = () => ({
  kind: DEFAULT_TRANSACTION_KIND,
  accountId: null,
  amount: '',
  currency: null,
  linkedAccountId: null,
  linkedAmount: '',
  linkedCurrency: null,
  tags: {
    [EXPENSE]: [],
    [INCOME]: []
  },
  date: formatInternal(new Date()),
  note: ''
})
