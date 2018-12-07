import { ActionType, getType } from 'typesafe-actions';
import * as actions from './SignOut.action';
import { AsyncOperationStateT } from 'typings/async';

export interface SignOutStateT {
  signOutState?: AsyncOperationStateT;
}

export type SignOutActionT = ActionType<typeof actions>;

export default (
  state: SignOutStateT = {},
  action: SignOutActionT
): SignOutStateT => {
  switch (action.type) {
    case getType(actions.signOut):
      return { ...state, signOutState: 'REQUEST' };
    case getType(actions.signOutSuccess):
      return { ...state, signOutState: 'SUCCESS' };
    case getType(actions.signOutFailure):
      return { ...state, signOutState: 'FAILURE' };
    default:
      return state;
  }
};
