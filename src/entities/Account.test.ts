import {
  AccountGroupT,
  defaultGroup,
  getAccountGroupOptions,
  getGroupName,
  formTostate,
  stateToForm,
  storageToState,
  stateToStorage,
  mutateBalance
} from './Account';

it('has default group', () => {
  expect(defaultGroup).toEqual('cash');
});

it('returns list of group options', () => {
  const options = getAccountGroupOptions();

  expect(Array.isArray(options)).toBeTruthy();
  expect(options.length).toBeGreaterThanOrEqual(1);
  expect(options[0]).toHaveProperty('key');
  expect(options[0]).toHaveProperty('value');
  expect(options[0]).toHaveProperty('text');
});

it('returns group name for given code', () => {
  expect(getGroupName(AccountGroupT.Cash)).toEqual('Cash');
  expect(getGroupName(AccountGroupT.Bank)).toEqual('Bank Account');
});

it('defaults id to current timestamp if not present in form', () => {
  const form = {
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: '100.95'
    },
    currencies: ['USD'],
    on_dashboard: false
  };
  Date.now = jest.fn(() => '1234');
  expect(formTostate(form)).toEqual({
    id: 'A1234',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095
    },
    currencies: ['USD'],
    on_dashboard: false
  });
});

it('converts balance to subunits from form data', () => {
  const form = {
    id: 'A12345',
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: '100.95',
      JPY: ''
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: false
  };
  expect(formTostate(form)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 0
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: false
  });
});

it('keeps only stored keys from form data', () => {
  const form = {
    id: 'A12345',
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: '100.95',
      JPY: '2200'
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: true,
    completed: true
  };
  expect(formTostate(form)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: true
  });
});

it('converts balance from subunits back to float', () => {
  const state = {
    id: 'A1234',
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: true
  };
  expect(stateToForm(state)).toEqual({
    id: 'A1234',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: '100.95',
      JPY: '2200'
    },
    currencies: ['USD', 'JPY'],
    on_dashboard: true
  });
});

it('converts storage id, filters out unrelated fields when read from storage', () => {
  const storage = {
    _id: 'A12345',
    _rev: '1-abcd',
    _conflicts: [],
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD'],
    on_dashboard: true
  };
  expect(storageToState(storage)).toEqual({
    id: 'A12345',
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD'],
    on_dashboard: true
  });
});

it('skips id from data when write to storage', () => {
  const state = {
    id: 'A12345',
    name: 'Test',
    group: AccountGroupT.Cash,
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD'],
    on_dashboard: true
  };
  expect(stateToStorage(state)).toEqual({
    name: 'Test',
    group: 'cash',
    balance: {
      USD: 10095,
      JPY: 2200
    },
    currencies: ['USD'],
    on_dashboard: true
  });
});

it('returns new record when mutating balance', () => {
  const state = {
    _id: 'A1234',
    name: 'Test',
    group: AccountGroupT.Cash,
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2200
    },
    on_dashboard: true
  };
  const mutatedUSD = mutateBalance(state, 'USD', 100);
  const mutatedJPY = mutateBalance(state, 'JPY', -200);
  expect(state === mutatedUSD).toBeFalsy();
  expect(state === mutatedJPY).toBeFalsy();
  expect(state).toEqual({
    _id: 'A1234',
    name: 'Test',
    group: 'cash',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2200
    },
    on_dashboard: true
  });
  expect(mutatedUSD).toEqual({
    _id: 'A1234',
    name: 'Test',
    group: 'cash',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10195,
      JPY: 2200
    },
    on_dashboard: true
  });
  expect(mutatedJPY).toEqual({
    _id: 'A1234',
    name: 'Test',
    group: 'cash',
    currencies: ['USD', 'JPY'],
    balance: {
      USD: 10095,
      JPY: 2000
    },
    on_dashboard: true
  });
});
