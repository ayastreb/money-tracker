import reducer from './account';
import {
  resetAccountForm,
  fillInAccountForm,
  changeGroup,
  changeName,
  changeBalance,
  toggleCurrency,
  toggleOnDashboard
} from '../../../actions/ui/form/account.js';
import { saveAccountSuccess } from '../../../actions/entities/accounts';
import { changeSettingsCurrency } from '../../../actions/settings';
import { defaultGroup } from '../../../entities/Account';

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    name: '',
    group: defaultGroup,
    balance: {},
    currencies: [],
    on_dashboard: true,
    completed: false,
    isModalOpen: false,
    isDeleteRequest: false,
    isDeleteRunning: false,
    itemsToProcess: Infinity,
    itemsProcessed: 0
  });
});

it('fills form with given values', () => {
  expect(
    reducer(
      { name: '' },
      fillInAccountForm({ name: 'foo', group: 'bank', balance: { USD: 990 } })
    )
  ).toEqual({ name: 'foo', group: 'bank', balance: { USD: '9.9' } });
});

it('resets to initial state when account is created', () => {
  expect(
    reducer(
      { name: 'foo', group: 'bank', balance: { EUR: 100 } },
      saveAccountSuccess()
    )
  ).toEqual({
    name: '',
    group: defaultGroup,
    balance: {},
    currencies: [],
    on_dashboard: true,
    completed: true,
    isModalOpen: false,
    isDeleteRequest: false,
    isDeleteRunning: false,
    itemsToProcess: Infinity,
    itemsProcessed: 0
  });
});

it('resets to initial state', () => {
  expect(
    reducer(
      { name: 'foo', group: 'bank', balance: { EUR: 100 } },
      resetAccountForm()
    )
  ).toEqual({
    name: '',
    group: defaultGroup,
    balance: {},
    currencies: [],
    on_dashboard: true,
    completed: false,
    isModalOpen: false,
    isDeleteRequest: false,
    isDeleteRunning: false,
    itemsToProcess: Infinity,
    itemsProcessed: 0
  });
});

it('changes account form group', () => {
  expect(reducer({ group: 'cash' }, changeGroup('bank'))).toEqual({
    group: 'bank'
  });
});

it('changes account form name', () => {
  expect(reducer({ name: 'foo' }, changeName('bar'))).toEqual({ name: 'bar' });
});

describe('toggling currency checkbox', () => {
  it('checks first checkbox', () => {
    expect(
      reducer({ balance: {}, currencies: [] }, toggleCurrency('EUR'))
    ).toEqual({
      balance: { EUR: '' },
      currencies: ['EUR']
    });
  });

  it('checks second checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 18 }, currencies: ['EUR'] },
        toggleCurrency('USD')
      )
    ).toEqual({
      balance: {
        EUR: 18,
        USD: ''
      },
      currencies: ['EUR', 'USD']
    });
  });

  it('un-checks second checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 155, USD: 156 }, currencies: ['EUR', 'USD'] },
        toggleCurrency('USD')
      )
    ).toEqual({ balance: { EUR: 155, USD: 156 }, currencies: ['EUR'] });
  });

  it('does not allow to uncheck last checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 155 }, currencies: ['EUR'] },
        toggleCurrency('EUR')
      )
    ).toEqual({
      balance: { EUR: 155 },
      currencies: ['EUR']
    });
  });
});

describe('changing currency balance', () => {
  it('changes balance of unchecked currency', () => {
    expect(
      reducer(
        { balance: {}, currencies: [] },
        changeBalance({ code: 'USD', balance: 200 })
      )
    ).toEqual({
      balance: { USD: 200 },
      currencies: ['USD']
    });
    expect(
      reducer(
        { balance: { USD: 200 }, currencies: ['USD'] },
        changeBalance({ code: 'EUR', balance: 150 })
      )
    ).toEqual({
      balance: {
        USD: 200,
        EUR: 150
      },
      currencies: ['USD', 'EUR']
    });
  });

  it('changes balance of checked currency', () => {
    expect(
      reducer(
        { balance: { USD: 200 }, currencies: ['USD'] },
        changeBalance({ code: 'USD', balance: 200.56 })
      )
    ).toEqual({
      balance: { USD: 200.56 },
      currencies: ['USD']
    });
  });
});

describe('changing currency settings', () => {
  it('filters out unused currencies', () => {
    expect(
      reducer(
        { balance: { USD: 100, JPY: 500 }, currencies: ['USD', 'JPY'] },
        changeSettingsCurrency({ base: 'USD', secondary: [] })
      )
    ).toEqual({
      balance: { USD: 100 },
      currencies: ['USD']
    });

    expect(
      reducer(
        {
          balance: { EUR: 101, CAD: 102, AUD: 103 },
          currencies: ['EUR', 'CAD', 'AUD']
        },
        changeSettingsCurrency({ base: 'USD', secondary: ['EUR', 'CAD'] })
      )
    ).toEqual({
      balance: {
        EUR: 101,
        CAD: 102
      },
      currencies: ['EUR', 'CAD']
    });
  });
});

describe('toggling display on dashboard checkbox', () => {
  it('sets on dashboard checkbox on', () => {
    expect(reducer({ on_dashboard: false }, toggleOnDashboard())).toEqual({
      on_dashboard: true
    });
  });

  it('sets on dashboard checkbox off', () => {
    expect(reducer({ on_dashboard: true }, toggleOnDashboard())).toEqual({
      on_dashboard: false
    });
  });
});
