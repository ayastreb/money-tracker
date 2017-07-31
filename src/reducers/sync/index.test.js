import reducer from './index'
import {
  SYNC_REQUEST,
  SYNC_SUCCESS,
  SYNC_FAILURE,
  DISMISS_SYNC_WARNING,
  SET_PENDING_CHANGES_FLAG,
  UNSET_PENDING_CHANGES_FLAG
} from '../../actions/sync'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    isRunning: false,
    isWarningVisible: true,
    hasPendingChanges: false
  })
})

it('changes running flag when sync is started', () => {
  expect(reducer({ isRunning: false }, { type: SYNC_REQUEST })).toEqual({
    isRunning: true
  })
})

it('changes running flag when sync is finished', () => {
  expect(reducer({ isRunning: true }, { type: SYNC_SUCCESS })).toEqual({
    isRunning: false
  })
})

it('changes running flag on sync error', () => {
  expect(reducer({ isRunning: true }, { type: SYNC_FAILURE })).toEqual({
    isRunning: false
  })
})

it('changes visibility when dismissed', () => {
  expect(
    reducer({ isWarningVisible: true }, { type: DISMISS_SYNC_WARNING })
  ).toEqual({ isWarningVisible: false })
})

it('sets pending changes flag', () => {
  expect(
    reducer({ hasPendingChanges: false }, { type: SET_PENDING_CHANGES_FLAG })
  ).toEqual({
    hasPendingChanges: true
  })
})

it('unsets pending changes flag', () => {
  expect(
    reducer({ hasPendingChanges: true }, { type: UNSET_PENDING_CHANGES_FLAG })
  ).toEqual({
    hasPendingChanges: false
  })
})
