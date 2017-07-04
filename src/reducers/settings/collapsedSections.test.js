import reducer from './collapsedSections'
import { TOGGLE_SECTION_COLLAPSE } from '../../actions/settings'

it('returns default state', () => {
  expect(reducer(undefined, {})).toEqual([])
})

it('collapses section if it is not yet collapsed', () => {
  expect(
    reducer([], { type: TOGGLE_SECTION_COLLAPSE, section: 'cash' })
  ).toEqual(['cash'])
  expect(
    reducer(['bank'], { type: TOGGLE_SECTION_COLLAPSE, section: 'cash' })
  ).toEqual(['bank', 'cash'])
})

it('un-collapses section if it is already collapsed', () => {
  expect(
    reducer(['bank', 'cash'], {
      type: TOGGLE_SECTION_COLLAPSE,
      section: 'bank'
    })
  ).toEqual(['cash'])
})
