import { UPDATE_EXCHANGE_RATE_SUCCESS } from '../../actions/settings'
import reducer from './exchangeRate'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({ USD: 1.0 })
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
