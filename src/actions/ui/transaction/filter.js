import { createActions } from 'redux-actions'

export const {
  changeFilterDate,
  toggleFilterCalendar,
  changeFilterPage
} = createActions(
  'CHANGE_FILTER_DATE',
  'TOGGLE_FILTER_CALENDAR',
  'CHANGE_FILTER_PAGE'
)
