import { handleActions } from 'redux-actions';
import { getType } from 'typesafe-actions';
import { loadFilterTransactionsSuccess } from '../../../actions/entities/transactions';
import { signOutSuccess } from 'features/user/state/ui/SignOut.action';
import EntityMap from '../../../entities/EntityMap';

const initialState = EntityMap.fromArray([]);

export default handleActions(
  {
    [loadFilterTransactionsSuccess]: (state, action) => {
      const transactions = action.payload;
      return EntityMap.fromArray(transactions);
    },
    [getType(signOutSuccess)]: () => initialState
  },
  initialState
);
