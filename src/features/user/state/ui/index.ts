import { combineReducers } from 'redux';
import SignInReducer, { SignInStateT, SignInActionT } from './SignIn.reducer';
import SignOutReducer, {
  SignOutStateT,
  SignOutActionT
} from './SignOut.reducer';
import CouchDBReducer, { CouchDBStateT, CouchDBActionT } from './CouchDB.reducers';
import SignInSaga from './SignIn.saga';
import SignOutSaga from './SignOut.saga';
import CouchDBSaga from './CouchDB.saga';

export interface UserUiStateT {
  signIn: SignInStateT;
  signOut: SignOutStateT;
  couchDB: CouchDBStateT;
}

export type UserUiActionT = SignInActionT & SignOutActionT & CouchDBActionT;

export const UserUiReducer = combineReducers<UserUiStateT, UserUiActionT>({
  signIn: SignInReducer,
  signOut: SignOutReducer,
  couchDB: CouchDBReducer
});

export const UserUiSaga = [...SignInSaga, ...SignOutSaga, ...CouchDBSaga];
