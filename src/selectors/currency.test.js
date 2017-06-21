import { getUsedCurrency } from './currency'

it('returns used currency from accounts', () => {
  const state = {
    accounts: {
      allIds: ['A/12345', 'A/12346'],
      byId: {
        'A/12345': {
          currencies: ['USD', 'EUR']
        },
        'A/12346': {
          currencies: ['EUR', 'JPY']
        }
      }
    }
  }

  expect(getUsedCurrency(state)).toEqual(['USD', 'EUR', 'JPY'])
})
