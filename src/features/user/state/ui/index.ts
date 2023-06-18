import { combineReducers } from 'redux';
import SignOutReducer, {
  SignOutActionT,
  SignOutStateT
} from './SignOut.reducer';
import SignOutSaga from './SignOut.saga';

export interface UserUiStateT {
  signOut: SignOutStateT;
}

export type UserUiActionT = SignOutActionT;

export const UserUiReducer = combineReducers<UserUiStateT, UserUiActionT>({
  signOut: SignOutReducer
});

export const UserUiSaga = [...SignOutSaga];
