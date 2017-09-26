import { createActions } from 'redux-actions'

export const { changeFilterDate, toggleFilterCalendar } = createActions(
  'CHANGE_FILTER_DATE',
  'TOGGLE_FILTER_CALENDAR'
)
