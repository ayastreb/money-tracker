import reducer from './isSidebarOpen'
import { TOGGLE_SIDEBAR } from '../../actions/ui/sidebar'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(false)
})

it('toggles sidebar open flag', () => {
  expect(reducer(false, { type: TOGGLE_SIDEBAR })).toEqual(true)
  expect(reducer(true, { type: TOGGLE_SIDEBAR })).toEqual(false)
})
