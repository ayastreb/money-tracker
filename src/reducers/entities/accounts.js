import { handleActions, combineActions } from 'redux-actions';
import { getType } from 'typesafe-actions';
import {
  loadAccountsSuccess,
  saveAccount,
  saveAccountFailure,
  updateAccount,
  removeAccountSuccess
} from '../../actions/entities/accounts';
import { signOutSuccess } from 'features/user/state/ui/SignOut.action';
import EntityMap from '../../entities/EntityMap';

const initialState = EntityMap.fromArray([]);

export default handleActions(
  {
    [loadAccountsSuccess]: (state, action) => {
      const accounts = action.payload;
      return EntityMap.fromArray(accounts);
    },
    [combineActions(saveAccount, updateAccount)]: (state, action) => {
      const account = action.payload;
      return EntityMap.set(state, account);
    },
    [combineActions(removeAccountSuccess, saveAccountFailure)]: (
      state,
      action
    ) => {
      const accountId = action.payload;
      return EntityMap.remove(state, accountId);
    },
    [getType(signOutSuccess)]: () => initialState
  },
  initialState
);
