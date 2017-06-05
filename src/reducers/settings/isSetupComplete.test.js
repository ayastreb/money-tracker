import reducer from './isSetupComplete'
import { COMPLETE_SETUP } from '../../actions/settings'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

describe('completing setup', () => {
  it('should complete without initial state', () => {
    expect(reducer(undefined, { type: COMPLETE_SETUP })).toEqual(true)
  })

  it('should complete with not completed initial state', () => {
    expect(reducer(false, { type: COMPLETE_SETUP })).toEqual(true)
  })

  it('should complete with completed initial state', () => {
    expect(reducer(true, { type: COMPLETE_SETUP })).toEqual(true)
  })
})
