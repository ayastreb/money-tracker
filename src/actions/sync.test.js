import {
  dismissSyncWarning,
  setPendingChangesFlag,
  sync,
  syncRequest,
  syncSuccess,
  syncFailure
} from './sync'

it('creates dismiss warning action', () => {
  expect(dismissSyncWarning()).toEqual({
    type: 'DISMISS_SYNC_WARNING'
  })
})

it('creates set pending changes action', () => {
  expect(setPendingChangesFlag()).toEqual({
    type: 'SET_PENDING_CHANGES_FLAG'
  })
})

it('creates sync action', () => {
  expect(sync()).toEqual({
    type: 'SYNC'
  })
})

it('creates sync request action', () => {
  expect(syncRequest()).toEqual({
    type: 'SYNC_REQUEST'
  })
})

it('creates sync success action', () => {
  expect(syncSuccess()).toEqual({
    type: 'SYNC_SUCCESS'
  })
})

it('creates sync failure action', () => {
  expect(syncFailure()).toEqual({
    type: 'SYNC_FAILURE'
  })
})
