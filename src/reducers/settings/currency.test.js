import reducer from './currency'
import { CHANGE_CURRENCY } from '../../actions/settings'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    base: 'USD',
    secondary: []
  })
})

describe('changing currency', () => {
  it('should change without initial state', () => {
    expect(
      reducer(undefined, {
        type: CHANGE_CURRENCY,
        base: 'EUR',
        secondary: ['JPY']
      })
    ).toEqual({ base: 'EUR', secondary: ['JPY'] })
  })

  it('should change with initial state', () => {
    expect(
      reducer(
        { base: 'EUR', secondary: ['JPY'] },
        {
          type: CHANGE_CURRENCY,
          base: 'GBP',
          secondary: ['AUD', 'CAD']
        }
      )
    ).toEqual({ base: 'GBP', secondary: ['AUD', 'CAD'] })
  })
})
