import {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  removeAccount,
  removeAccountSuccess
} from './accounts';

it('creates load action', () => {
  expect(loadAccounts()).toEqual({
    type: 'LOAD_ACCOUNTS'
  });
});

it('creates load success action', () => {
  expect(loadAccountsSuccess()).toEqual({
    type: 'LOAD_ACCOUNTS_SUCCESS'
  });
});

it('creates save action', () => {
  expect(saveAccount('foo')).toEqual({
    type: 'SAVE_ACCOUNT',
    payload: 'foo'
  });
});

it('creates save success action', () => {
  expect(saveAccountSuccess('foo')).toEqual({
    type: 'SAVE_ACCOUNT_SUCCESS',
    payload: 'foo'
  });
});

it('creates save failrue action', () => {
  expect(saveAccountFailure('foo')).toEqual({
    type: 'SAVE_ACCOUNT_FAILURE',
    payload: 'foo'
  });
});

it('creates remove action', () => {
  expect(removeAccount('foo_id')).toEqual({
    type: 'REMOVE_ACCOUNT',
    payload: 'foo_id'
  });
});

it('creates remove success action', () => {
  expect(removeAccountSuccess()).toEqual({
    type: 'REMOVE_ACCOUNT_SUCCESS'
  });
});
