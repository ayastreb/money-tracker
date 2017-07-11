import { DISMISS_SYNC_WARNING, dismissSyncWarning } from './syncWarning'

it('creates DISMISS_SYNC_WARNING action', () => {
  expect(dismissSyncWarning()).toEqual({
    type: DISMISS_SYNC_WARNING
  })
})
