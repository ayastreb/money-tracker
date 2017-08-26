import { handleActions } from 'redux-actions'
import { loadExpenseTagsSuccess, loadIncomeTagsSuccess } from '../actions/tags'
import { ADD_EXPENSE_TAG, ADD_INCOME_TAG } from '../actions/ui/transactionForm'
import { EXPENSE, INCOME } from '../models/Transaction'

export default handleActions(
  {
    [loadExpenseTagsSuccess]: (state, action) => ({
      ...state,
      [EXPENSE]: action.payload
    }),
    [loadIncomeTagsSuccess]: (state, action) => ({
      ...state,
      [INCOME]: action.payload
    }),
    [ADD_EXPENSE_TAG]: (state, action) =>
      addTagIfNotUsed(state, EXPENSE, action.tag),
    [ADD_INCOME_TAG]: (state, action) =>
      addTagIfNotUsed(state, INCOME, action.tag)
  },
  { [EXPENSE]: [], [INCOME]: [] }
)

function addTagIfNotUsed(state, kind, tag) {
  return state[kind].includes(tag)
    ? state
    : { ...state, [kind]: state[kind].concat(tag) }
}
