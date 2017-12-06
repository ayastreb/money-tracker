import { createActions } from 'redux-actions'

export const {
  changeReportKind,
  changeReportTimespan,
  changeReportAccounts,
  moveReportTimespanBefore,
  moveReportTimespanAfter,
  loadReport,
  loadReportSuccess,
  loadReportFailure
} = createActions(
  'CHANGE_REPORT_KIND',
  'CHANGE_REPORT_TIMESPAN',
  'CHANGE_REPORT_ACCOUNTS',
  'MOVE_REPORT_TIMESPAN_BEFORE',
  'MOVE_REPORT_TIMESPAN_AFTER',
  'LOAD_REPORT',
  'LOAD_REPORT_SUCCESS',
  'LOAD_REPORT_FAILURE'
)
