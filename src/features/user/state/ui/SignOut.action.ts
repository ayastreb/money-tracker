import { createAction } from 'typesafe-actions';

export const signOut = createAction('user/ui/sign_out/SIGN_OUT_REQUEST');
export const signOutSuccess = createAction('user/ui/sign_out/SIGN_OUT_SUCCESS');
export const signOutFailure = createAction(
  'user/ui/sign_out/SIGN_OUT_FAILURE',
  resolve => (error: Error) => resolve(error)
);
