import reducer from './isSetupComplete'
import { LOAD_SETTINGS_SUCCESS, COMPLETE_SETUP } from '../../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

describe('loading settings', () => {
  it('returns original state if loaded settings are empty', () => {
    const state = false
    expect(
      reducer(state, { type: LOAD_SETTINGS_SUCCESS, settings: false })
    ).toEqual(state)
  })

  it('updates settings from loaded data', () => {
    expect(
      reducer(undefined, {
        type: LOAD_SETTINGS_SUCCESS,
        settings: { isSetupComplete: true }
      })
    ).toEqual(true)
  })
})

describe('completing setup', () => {
  it('completes without initial state', () => {
    expect(reducer(undefined, { type: COMPLETE_SETUP })).toEqual(true)
  })

  it('completes with not completed initial state', () => {
    expect(reducer(false, { type: COMPLETE_SETUP })).toEqual(true)
  })

  it('completes with completed initial state', () => {
    expect(reducer(true, { type: COMPLETE_SETUP })).toEqual(true)
  })
})
