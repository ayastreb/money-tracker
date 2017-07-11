import reducer from './isSyncWarningVisible'
import { DISMISS_SYNC_WARNING } from '../../actions/ui/syncWarning'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual(true)
})

it('changes visibility when dismissed', () => {
  expect(reducer(true, { type: DISMISS_SYNC_WARNING })).toEqual(false)
})
