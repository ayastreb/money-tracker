import { handleActions } from 'redux-actions';
import { getType } from 'typesafe-actions';
import {
  loadExpenseTagsSuccess,
  loadIncomeTagsSuccess
} from '../../actions/entities/tags';
import { addTag } from '../../actions/ui/form/transaction';
import { signOutSuccess } from 'features/user/state/ui/SignOut.action';
import { TransationKindT } from '../../entities/Transaction';

const { Expense, Transfer, Income } = TransationKindT;
const initialState = { [Expense]: [], [Transfer]: [], [Income]: [] };

export default handleActions(
  {
    [loadExpenseTagsSuccess]: (state, { payload }) => ({
      ...state,
      [Expense]: payload
    }),
    [loadIncomeTagsSuccess]: (state, { payload }) => ({
      ...state,
      [Income]: payload
    }),
    [addTag]: (state, action) => {
      const { kind, tag } = action.payload;
      return state[kind].includes(tag)
        ? state
        : { ...state, [kind]: state[kind].concat(tag) };
    },
    [getType(signOutSuccess)]: () => initialState
  },
  initialState
);
