import {
  fillInAccountForm,
  resetAccountForm,
  changeName,
  changeGroup,
  changeBalance,
  toggleCurrency,
  toggleOnDashboard
} from './account';

it('creates FILL_IN_ACCOUNT_FORM action', () => {
  expect(fillInAccountForm('foo')).toEqual({
    type: 'FILL_IN_ACCOUNT_FORM',
    payload: 'foo'
  });
});

it('creates RESET_ACCOUNT_FORM action', () => {
  expect(resetAccountForm()).toEqual({
    type: 'RESET_ACCOUNT_FORM'
  });
});

it('creates CHANGE_NAME action', () => {
  expect(changeName('foo')).toEqual({ type: 'CHANGE_NAME', payload: 'foo' });
});

it('creates CHANGE_GROUP action', () => {
  expect(changeGroup('bar')).toEqual({ type: 'CHANGE_GROUP', payload: 'bar' });
});

it('creates TOGGLE_CURRENCY action', () => {
  expect(toggleCurrency('USD')).toEqual({
    type: 'TOGGLE_CURRENCY',
    payload: 'USD'
  });
});

it('creates CHANGE_BALANCE action', () => {
  expect(changeBalance({ code: 'USD', balance: 199 })).toEqual({
    type: 'CHANGE_BALANCE',
    payload: {
      code: 'USD',
      balance: 199
    }
  });
});

it('creates TOGGLE_ON_DASHBOARD action', () => {
  expect(toggleOnDashboard()).toEqual({
    type: 'TOGGLE_ON_DASHBOARD'
  });
});
