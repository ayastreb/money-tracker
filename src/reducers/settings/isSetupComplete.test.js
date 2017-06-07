import reducer from './isSetupComplete'
import { COMPLETE_SETUP } from '../../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
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
