import { LOAD_EXPENSE_TAGS, LOAD_INCOME_TAGS } from '../../actions/tags'
import {
  ADD_EXPENSE_TAG,
  ADD_INCOME_TAG
} from '../../actions/ui/transactionForm'
import { EXPENSE, INCOME } from '../../constants/transaction'

export default function(state = { [EXPENSE]: [], [INCOME]: [] }, action) {
  switch (action.type) {
    case LOAD_EXPENSE_TAGS:
      return { ...state, [EXPENSE]: action.tags }
    case LOAD_INCOME_TAGS:
      return { ...state, [INCOME]: action.tags }
    case ADD_EXPENSE_TAG:
      return addTagIfNotUsed(state, EXPENSE, action.tag)
    case ADD_INCOME_TAG:
      return addTagIfNotUsed(state, INCOME, action.tag)
    default:
      return state
  }
}

function addTagIfNotUsed(state, kind, tag) {
  return state[kind].includes(tag)
    ? state
    : { ...state, [kind]: state[kind].concat(tag) }
}
