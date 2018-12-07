import reducer, { UserActionT } from './User.reducer';
import { setDemoUser, signInSuccess } from './User.action';

const initialState = reducer(undefined, {} as any);

it('returns default state', () => {
  expect(initialState).toMatchSnapshot();
});

it('changes flag when user is authenticated', () => {
  expect(reducer({ ...initialState }, signInSuccess() as UserActionT)).toEqual({
    ...initialState,
    isSignedIn: true
  });
});

it('changes flag when user is demo', () => {
  expect(reducer({ ...initialState }, setDemoUser() as UserActionT)).toEqual({
    ...initialState,
    isDemoUser: true
  });
});
