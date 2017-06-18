import reducer from './collapsedGroups'
import { TOGGLE_GROUP_COLLAPSE } from '../../../actions/ui/accountsWidget'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual([])
})

it('collapses group if it is not yet collapsed', () => {
  expect(reducer([], { type: TOGGLE_GROUP_COLLAPSE, group: 'cash' })).toEqual([
    'cash'
  ])
  expect(
    reducer(['bank'], { type: TOGGLE_GROUP_COLLAPSE, group: 'cash' })
  ).toEqual(['bank', 'cash'])
})

it('un-collapses group if it is already collapsed', () => {
  expect(
    reducer(['bank', 'cash'], { type: TOGGLE_GROUP_COLLAPSE, group: 'bank' })
  ).toEqual(['cash'])
})
