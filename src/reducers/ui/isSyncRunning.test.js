import reducer from './isSyncRunning'
import { SYNC_REQUEST, SYNC_SUCCESS, SYNC_FAILURE } from '../../actions/sync'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

it('changes flag when sync is started', () => {
  expect(reducer(false, { type: SYNC_REQUEST })).toEqual(true)
})

it('changes flag when sync is finished', () => {
  expect(reducer(true, { type: SYNC_SUCCESS })).toEqual(false)
})

it('changes flag on sync error', () => {
  expect(reducer(true, { type: SYNC_FAILURE })).toEqual(false)
})
