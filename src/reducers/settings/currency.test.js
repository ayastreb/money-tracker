import reducer from './currency'
import { CHANGE_CURRENCY } from '../../actions/settings'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    base: DEFAULT_BASE_CURRENCY,
    secondary: []
  })
})

describe('changing currency', () => {
  it('changes without initial state', () => {
    expect(
      reducer(undefined, {
        type: CHANGE_CURRENCY,
        base: 'EUR',
        secondary: ['JPY']
      })
    ).toEqual({ base: 'EUR', secondary: ['JPY'] })
  })

  it('changes with initial state', () => {
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
