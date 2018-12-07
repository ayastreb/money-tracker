import { combineReducers } from 'redux';
import SignInReducer, { SignInStateT, SignInActionT } from './SignIn.reducer';
import SignOutReducer, {
  SignOutStateT,
  SignOutActionT
} from './SignOut.reducer';
import SignInSaga from './SignIn.saga';
import SignOutSaga from './SignOut.saga';

export interface UserUiStateT {
  signIn: SignInStateT;
  signOut: SignOutStateT;
}

export type UserUiActionT = SignInActionT & SignOutActionT;

export const UserUiReducer = combineReducers<UserUiStateT, UserUiActionT>({
  signIn: SignInReducer,
  signOut: SignOutReducer
});

export const UserUiSaga = [...SignInSaga, ...SignOutSaga];
