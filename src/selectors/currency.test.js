import { getUsedCurrency } from './currency'

it('returns used currency from accounts', () => {
  const state = {
    accounts: {
      byId: {
        'A/12345': {
          balance: {
            USD: 123,
            EUR: 456
          }
        },
        'A/12346': {
          balance: {
            EUR: 457,
            JPY: 890
          }
        }
      }
    }
  }

  expect(getUsedCurrency(state)).toEqual(['USD', 'EUR', 'JPY'])
})
