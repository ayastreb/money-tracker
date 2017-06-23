import { getUsedCurrency } from './currency'

it('returns used currency from accounts', () => {
  const state = {
    accounts: {
      allIds: ['A12345', 'A12346'],
      byId: {
        'A12345': {
          currencies: ['USD', 'EUR']
        },
        'A12346': {
          currencies: ['EUR', 'JPY']
        }
      }
    }
  }

  expect(getUsedCurrency(state)).toEqual(['USD', 'EUR', 'JPY'])
})
