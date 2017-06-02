import reducer from './currency'
import { CHANGE_BASE_CURRENCY, CHANGE_SECONDARY_CURRENCY } from '../actions'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({ base: 'USD', secondary: [] })
})

it('should handle base currency change', () => {
  expect(
    reducer(
      { base: 'USD', secondary: ['JPY'] },
      { type: CHANGE_BASE_CURRENCY, code: 'EUR' }
    )
  ).toEqual({ base: 'EUR', secondary: ['JPY'] })
})

it('should remove base currency from secondary if it was used there', () => {
  expect(
    reducer(
      { base: 'USD', secondary: ['EUR', 'JPY'] },
      { type: CHANGE_BASE_CURRENCY, code: 'EUR' }
    )
  ).toEqual({ base: 'EUR', secondary: ['JPY'] })
})

it('should handle secondary currency change', () => {
  expect(
    reducer(
      { base: 'USD', secondary: ['EUR'] },
      { type: CHANGE_SECONDARY_CURRENCY, codes: ['EUR', 'JPY'] }
    )
  ).toEqual({ base: 'USD', secondary: ['EUR', 'JPY'] })

  expect(
    reducer(
      { base: 'USD', secondary: ['EUR', 'JPY'] },
      { type: CHANGE_SECONDARY_CURRENCY, codes: ['GBP'] }
    )
  ).toEqual({ base: 'USD', secondary: ['GBP'] })

  expect(
    reducer(
      { base: 'USD', secondary: ['EUR', 'JPY'] },
      { type: CHANGE_SECONDARY_CURRENCY, codes: [] }
    )
  ).toEqual({ base: 'USD', secondary: [] })

  expect(
    reducer(
      { base: 'USD', secondary: ['EUR', 'JPY'] },
      { type: CHANGE_SECONDARY_CURRENCY, codes: undefined }
    )
  ).toEqual({ base: 'USD', secondary: [] })
})
