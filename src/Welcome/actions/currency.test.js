import { CHANGE_BASE_CURRENCY, CHANGE_SECONDARY_CURRENCY } from '../constants/'
import { changeBaseCurrency, changeSecondaryCurrency } from './currency'

it('should generate change base currency action', () => {
  const actual = changeBaseCurrency('USD')
  const expected = {
    type: CHANGE_BASE_CURRENCY,
    code: 'USD'
  }

  expect(actual).toEqual(expected)
})

it('should generate change secondary currencies action', () => {
  const actual = changeSecondaryCurrency(['EUR', 'JPY'])
  const expected = {
    type: CHANGE_SECONDARY_CURRENCY,
    codes: ['EUR', 'JPY']
  }

  expect(actual).toEqual(expected)
})
