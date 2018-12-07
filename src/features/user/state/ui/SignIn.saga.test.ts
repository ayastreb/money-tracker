import { select, call, put } from 'redux-saga/effects';
import Auth from 'util/auth';
import {
  sendCodeSuccess,
  sendCodeFailure,
  verifyCodeSuccess,
  verifyCodeFailure
} from './SignIn.action';
import { sendCodeSaga, verifyCodeSaga } from './SignIn.saga';
import { getSignInEmail, getSignInCode } from './SignIn.selector';

describe('sending auth code', () => {
  it('sends code successfully', () => {
    const gen = sendCodeSaga();
    expect(gen.next().value).toEqual(select(getSignInEmail));
    expect(gen.next('foo@example').value).toEqual(
      call(Auth.sendCode, 'foo@example')
    );
    expect(gen.next().value).toEqual(put(sendCodeSuccess()));
    expect(gen.next().done).toBeTruthy();
  });

  it('send code failure', () => {
    const gen = sendCodeSaga();
    expect(gen.next().value).toEqual(select(getSignInEmail));
    expect(gen.next('foo@example').value).toEqual(
      call(Auth.sendCode, 'foo@example')
    );
    const error = new Error('Failed');
    if (gen.throw) {
      expect(gen.throw(error).value).toEqual(put(sendCodeFailure(error)));
    }
    expect(gen.next().done).toBeTruthy();
  });
});

describe('verifying auth code', () => {
  it('verify code successfully', () => {
    const gen = verifyCodeSaga();
    expect(gen.next().value).toEqual(select(getSignInEmail));
    expect(gen.next('foo@example').value).toEqual(select(getSignInCode));
    expect(gen.next('code').value).toEqual(
      call(Auth.verifyCode, 'foo@example', 'code')
    );
    expect(gen.next().value).toEqual(put(verifyCodeSuccess()));
    expect(gen.next().done).toBeTruthy();
  });

  it('verify code failure', () => {
    const gen = verifyCodeSaga();
    expect(gen.next().value).toEqual(select(getSignInEmail));
    expect(gen.next('foo@example').value).toEqual(select(getSignInCode));
    expect(gen.next('code').value).toEqual(
      call(Auth.verifyCode, 'foo@example', 'code')
    );
    const error = new Error('failure');
    if (gen.throw) {
      expect(gen.throw(error).value).toEqual(put(verifyCodeFailure(error)));
    }
    expect(gen.next().done).toBeTruthy();
  });
});
