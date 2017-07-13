import reducer from './isSyncRunning'
import { START_SYNC } from '../../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

it('changes flag when sync is started', () => {
  expect(reducer(false, { type: START_SYNC })).toEqual(true)
})
