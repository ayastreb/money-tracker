import reducer from './isLoaded'
import { LOAD_SETTINGS_SUCCESS } from '../../actions/settings'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

describe('handle settings load success', () => {
  it('should handle without initial state', () => {
    expect(reducer(undefined, { type: LOAD_SETTINGS_SUCCESS })).toEqual(true)
  })

  it('should handle with initial state', () => {
    expect(reducer(true, { type: LOAD_SETTINGS_SUCCESS })).toEqual(true)
  })
})
