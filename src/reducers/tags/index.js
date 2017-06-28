import { LOAD_EXPENSE_TAGS, LOAD_INCOME_TAGS } from '../../actions/tags'
import {
  ADD_EXPENSE_TAG,
  ADD_INCOME_TAG
} from '../../actions/ui/transactionForm'
import {
  EXPENSE_TRANSACTION,
  INCOME_TRANSACTION
} from '../../constants/transaction'

export default function(
  state = { [EXPENSE_TRANSACTION]: [], [INCOME_TRANSACTION]: [] },
  action
) {
  switch (action.type) {
    case LOAD_EXPENSE_TAGS:
      return { ...state, [EXPENSE_TRANSACTION]: action.tags }
    case LOAD_INCOME_TAGS:
      return { ...state, [INCOME_TRANSACTION]: action.tags }
    case ADD_EXPENSE_TAG:
      return addTagIfNotUsed(state, EXPENSE_TRANSACTION, action.tag)
    case ADD_INCOME_TAG:
      return addTagIfNotUsed(state, INCOME_TRANSACTION, action.tag)
    default:
      return state
  }
}

function addTagIfNotUsed(state, kind, tag) {
  return state[kind].includes(tag)
    ? state
    : { ...state, [kind]: state[kind].concat(tag) }
}
