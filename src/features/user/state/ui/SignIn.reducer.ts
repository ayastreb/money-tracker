import { ActionType, getType } from 'typesafe-actions';
import * as SignIn from './SignIn.action';
import { AsyncOperationStateT } from 'typings/async';

export interface SignInStateT {
  email: string;
  code: string;
  error?: string;
  sendCodeStatus?: AsyncOperationStateT;
  verifyCodeStatus?: AsyncOperationStateT;
}

export type SignInActionT = ActionType<typeof SignIn>;

const initialState: SignInStateT = {
  email: '',
  code: ''
};

export default (state = initialState, action: SignInActionT): SignInStateT => {
  switch (action.type) {
    case getType(SignIn.changeEmail):
      return { ...state, email: action.payload };
    case getType(SignIn.changeCode):
      return { ...state, code: action.payload };
    case getType(SignIn.sendCode):
      return { ...state, sendCodeStatus: 'REQUEST' };
    case getType(SignIn.sendCodeSuccess):
      return { ...state, sendCodeStatus: 'SUCCESS' };
    case getType(SignIn.sendCodeFailure):
      return {
        ...state,
        sendCodeStatus: 'FAILURE',
        error: action.payload.message
      };
    case getType(SignIn.verifyCode):
      return { ...state, verifyCodeStatus: 'REQUEST' };
    case getType(SignIn.verifyCodeSuccess):
      return { ...state, verifyCodeStatus: 'SUCCESS' };
    case getType(SignIn.verifyCodeFailure):
      return {
        ...state,
        verifyCodeStatus: 'FAILURE',
        error: action.payload.message
      };
    default:
      return state;
  }
};
