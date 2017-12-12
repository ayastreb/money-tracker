import { createActions } from 'redux-actions'

export const {
  changeReportKind,
  changeReportTimespan,
  changeReportAccounts,
  moveReportDateBackwards,
  moveReportDateForwards,
  loadReport,
  loadReportSuccess,
  loadReportFailure
} = createActions(
  'CHANGE_REPORT_KIND',
  'CHANGE_REPORT_TIMESPAN',
  'CHANGE_REPORT_ACCOUNTS',
  'MOVE_REPORT_DATE_BACKWARDS',
  'MOVE_REPORT_DATE_FORWARDS',
  'LOAD_REPORT',
  'LOAD_REPORT_SUCCESS',
  'LOAD_REPORT_FAILURE'
)
