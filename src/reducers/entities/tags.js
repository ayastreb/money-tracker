import { handleActions } from 'redux-actions'
import {
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../../actions/entities/tags'
import { addTag } from '../../actions/ui/form/transaction'
import { EXPENSE, TRANSFER, INCOME } from '../../entities/Transaction'

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
    [addTag]: (state, action) => {
      const { kind, tag } = action.payload
      return state[kind].includes(tag)
        ? state
        : { ...state, [kind]: state[kind].concat(tag) }
    }
  },
  { [EXPENSE]: [], [TRANSFER]: [], [INCOME]: [] }
)
