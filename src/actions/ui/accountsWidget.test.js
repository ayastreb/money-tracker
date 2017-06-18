import { TOGGLE_GROUP_COLLAPSE, toggleGroupCollapse } from './accountsWidget'

it('creates TOGGLE_GROUP_COLLAPSED action', () => {
  expect(toggleGroupCollapse('cash')).toEqual({
    type: TOGGLE_GROUP_COLLAPSE,
    group: 'cash'
  })
})
