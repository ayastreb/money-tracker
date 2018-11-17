import {
  getBaseCurrency,
  getSecondaryCurrency,
  getExchangeRate,
  getCollapsedSections
} from './settings';

it('gets base and secondary currency', () => {
  const state = {
    settings: {
      currency: {
        base: 'USD',
        secondary: ['EUR', 'JPY']
      }
    }
  };
  expect(getBaseCurrency(state)).toEqual('USD');
  expect(getSecondaryCurrency(state)).toEqual(['EUR', 'JPY']);
});

it('gets exchange rate', () => {
  const state = {
    settings: {
      exchangeRate: {
        USD: 1,
        EUR: 0.85
      }
    }
  };
  expect(getExchangeRate(state)).toEqual({
    USD: 1,
    EUR: 0.85
  });
});

it('gets collapsed sections', () => {
  const state = {
    settings: {
      collapsedSections: ['foo', 'bar']
    }
  };
  expect(getCollapsedSections(state)).toEqual(['foo', 'bar']);
});
