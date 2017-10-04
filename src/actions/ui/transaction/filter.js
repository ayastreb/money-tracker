import { createActions } from 'redux-actions'

export const {
  changeFilterDate,
  toggleFilterCalendar,
  changeFilterPage,
  toggleFilterModal,
  applyFilters
} = createActions(
  'CHANGE_FILTER_DATE',
  'TOGGLE_FILTER_CALENDAR',
  'CHANGE_FILTER_PAGE',
  'TOGGLE_FILTER_MODAL',
  'APPLY_FILTERS'
)
