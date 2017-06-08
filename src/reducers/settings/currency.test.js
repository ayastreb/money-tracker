import reducer from './currency'
import { CHANGE_CURRENCY, LOAD_SETTINGS_SUCCESS } from '../../actions/settings'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    base: DEFAULT_BASE_CURRENCY,
    secondary: []
  })
})

describe('loading settings', () => {
  it('returns original state if loaded settings are empty', () => {
    const state = { base: 'EUR', secondary: ['JPY'] }
    expect(
      reducer(state, { type: LOAD_SETTINGS_SUCCESS, settings: false })
    ).toEqual(state)
  })

  it('updates settings from loaded data', () => {
    expect(
      reducer(undefined, {
        type: LOAD_SETTINGS_SUCCESS,
        settings: { currency: { base: 'EUR', secondary: ['JPY'] } }
      })
    ).toEqual({ base: 'EUR', secondary: ['JPY'] })
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
