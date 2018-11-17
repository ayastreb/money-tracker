import { createActions } from 'redux-actions';

export const {
  dismissSyncWarning,
  setPendingChangesFlag,
  sync,
  syncRequest,
  syncSuccess,
  syncFailure
} = createActions(
  'DISMISS_SYNC_WARNING',
  'SET_PENDING_CHANGES_FLAG',
  'SYNC',
  'SYNC_REQUEST',
  'SYNC_SUCCESS',
  'SYNC_FAILURE'
);
