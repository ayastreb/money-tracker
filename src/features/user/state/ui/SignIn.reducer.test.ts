import reducer from './SignIn.reducer';
import {
  changeEmail,
  changeCode,
  sendCode,
  sendCodeSuccess,
  sendCodeFailure,
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure
} from './SignIn.action';

const initialState = reducer(undefined, {} as any);

it('returns default state', () => {
  expect(initialState).toMatchSnapshot();
});

it('changes email', () => {
  expect(reducer({ ...initialState }, changeEmail('foo@bar.com'))).toEqual({
    ...initialState,
    email: 'foo@bar.com'
  });
});

it('changes code', () => {
  expect(reducer({ ...initialState }, changeCode('1234'))).toEqual({
    ...initialState,
    code: '1234'
  });
});

it('request send code', () => {
  expect(reducer({ ...initialState }, sendCode())).toEqual({
    ...initialState,
    sendCodeStatus: 'REQUEST'
  });
});

it('completes send code', () => {
  expect(reducer({ ...initialState }, sendCodeSuccess())).toEqual({
    ...initialState,
    sendCodeStatus: 'SUCCESS'
  });
});

it('handles send code error', () => {
  const err = new Error('Failure');
  expect(reducer({ ...initialState }, sendCodeFailure(err))).toEqual({
    ...initialState,
    sendCodeStatus: 'FAILURE',
    error: 'Failure'
  });
});

it('request verify code', () => {
  expect(reducer({ ...initialState }, verifyCode())).toEqual({
    ...initialState,
    verifyCodeStatus: 'REQUEST'
  });
});

it('completes verify code', () => {
  expect(reducer({ ...initialState }, verifyCodeSuccess())).toEqual({
    ...initialState,
    verifyCodeStatus: 'SUCCESS'
  });
});

it('handles verify code error', () => {
  const err = new Error('Failure');
  expect(reducer({ ...initialState }, verifyCodeFailure(err))).toEqual({
    ...initialState,
    verifyCodeStatus: 'FAILURE',
    error: 'Failure'
  });
});
