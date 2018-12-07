import { createAction } from 'typesafe-actions';

export const changeEmail = createAction(
  'user/ui/sign_in/CHANGE_EMAIL',
  resolve => (email: string) => resolve(email)
);
export const changeCode = createAction(
  'user/ui/sign_in/CHANGE_CODE',
  resolve => (code: string) => resolve(code)
);
export const sendCode = createAction('user/ui/sign_in/SEND_CODE');
export const sendCodeSuccess = createAction(
  'user/ui/sign_in/SEND_CODE_SUCCESS'
);
export const sendCodeFailure = createAction(
  'user/ui/sign_in/SEND_CODE_FAILURE',
  resolve => (error: Error) => resolve(error)
);
export const verifyCode = createAction('user/ui/sign_in/VERIFY_CODE');
export const verifyCodeSuccess = createAction(
  'user/ui/sign_in/VERIFY_CODE_SUCCESS'
);
export const verifyCodeFailure = createAction(
  'user/ui/sign_in/VERIFY_CODE_FAILURE',
  resolve => (error: Error) => resolve(error)
);
export const finishAuth = createAction('user/ui/sign_in/FINISH_AUTH');
