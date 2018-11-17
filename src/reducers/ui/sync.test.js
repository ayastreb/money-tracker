import reducer from './sync';
import {
  dismissSyncWarning,
  setPendingChangesFlag,
  syncRequest,
  syncSuccess,
  syncFailure
} from '../../actions/ui/sync';

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual({
    isRunning: false,
    isWarningVisible: true,
    hasPendingChanges: false
  });
});

it('changes running flag when sync is started', () => {
  expect(reducer({ isRunning: false }, syncRequest())).toEqual({
    isRunning: true
  });
});

it('changes running flag when sync is finished', () => {
  expect(
    reducer({ isRunning: true, hasPendingChanges: true }, syncSuccess())
  ).toEqual({
    isRunning: false,
    hasPendingChanges: false
  });
});

it('changes running flag on sync error', () => {
  expect(reducer({ isRunning: true }, syncFailure())).toEqual({
    isRunning: false
  });
});

it('changes visibility when dismissed', () => {
  expect(reducer({ isWarningVisible: true }, dismissSyncWarning())).toEqual({
    isWarningVisible: false
  });
});

it('sets pending changes flag', () => {
  expect(
    reducer({ hasPendingChanges: false }, setPendingChangesFlag())
  ).toEqual({
    hasPendingChanges: true
  });
});
