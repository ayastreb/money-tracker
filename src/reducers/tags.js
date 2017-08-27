import { handleActions } from 'redux-actions'
import { loadExpenseTagsSuccess, loadIncomeTagsSuccess } from '../actions/tags'
import { addExpenseTag, addIncomeTag } from '../actions/ui/transactionForm'
import { EXPENSE, INCOME } from '../models/Transaction'

export default handleActions(
  {
    [loadExpenseTagsSuccess]: (state, { payload }) => ({
      ...state,
      [EXPENSE]: payload
    }),
    [loadIncomeTagsSuccess]: (state, { payload }) => ({
      ...state,
      [INCOME]: payload
    }),
    [addExpenseTag]: (state, { payload }) =>
      addTagIfNotUsed(state, EXPENSE, payload),
    [addIncomeTag]: (state, { payload }) =>
      addTagIfNotUsed(state, INCOME, payload)
  },
  { [EXPENSE]: [], [INCOME]: [] }
)

function addTagIfNotUsed(state, kind, tag) {
  return state[kind].includes(tag)
    ? state
    : { ...state, [kind]: state[kind].concat(tag) }
}
