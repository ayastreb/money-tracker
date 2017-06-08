import reducer from './exchangeRate'
import {
  LOAD_SETTINGS_SUCCESS,
  UPDATE_EXCHANGE_RATE_SUCCESS
} from '../../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ USD: 1.0 })
})

describe('loading settings', () => {
  it('returns original state if loaded settings are empty', () => {
    const state = { USD: 1, EUR: 0.75 }
    expect(
      reducer(state, { type: LOAD_SETTINGS_SUCCESS, settings: false })
    ).toEqual(state)
  })

  it('updates settings from loaded data', () => {
    expect(
      reducer(undefined, {
        type: LOAD_SETTINGS_SUCCESS,
        settings: { exchangeRate: { EUR: 1, JPY: 120.009 } }
      })
    ).toEqual({ EUR: 1, JPY: 120.009 })
  })
})

describe('updating exchange rate', () => {
  it('updates without initial state', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_EXCHANGE_RATE_SUCCESS,
        exchangeRate: { EUR: 1.0, JPY: 120.223 }
      })
    ).toEqual({ EUR: 1.0, JPY: 120.223 })
  })

  it('updates with initial state', () => {
    expect(
      reducer(
        { EUR: 1.0, JPY: 120.223 },
        {
          type: UPDATE_EXCHANGE_RATE_SUCCESS,
          exchangeRate: { USD: 1.0, JPY: 112.562 }
        }
      )
    ).toEqual({ USD: 1.0, JPY: 112.562 })
  })
})
