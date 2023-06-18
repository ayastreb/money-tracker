import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { UserUiActionT, UserUiReducer, UserUiStateT } from './ui';
import * as user from './User.action';

export interface UserStateT {
  readonly isDemoUser: boolean;
  readonly isSignedIn: boolean;
  readonly ui: UserUiStateT;
}

export type UserActionT = ActionType<typeof user> & UserUiActionT;

export default combineReducers<UserStateT, UserActionT>({
  isDemoUser: (state = false, action) => {
    return action.type === getType(user.setDemoUser) ? true : state;
  },
  isSignedIn: (state = false, action) => {
    return action.type === getType(user.signInSuccess) ? true : state;
  },
  ui: UserUiReducer
});
