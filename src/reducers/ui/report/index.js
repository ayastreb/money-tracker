import { handleActions, combineActions } from 'redux-actions'
import {
  changeReportKind,
  changeReportTimespan,
  changeReportAccounts,
  moveReportTimespanBefore,
  moveReportTimespanAfter,
  loadReport,
  loadReportSuccess,
  loadReportFailure
} from '../../../actions/ui/report'
import Report from '../../../entities/Report'

export default handleActions(
  {
    [changeReportKind]: (state, { payload }) => ({ ...state, kind: payload }),
    [changeReportTimespan]: (state, { payload }) => ({
      ...state,
      timespan: payload
    }),
    [changeReportAccounts]: (state, { payload }) => ({
      ...state,
      accounts: payload
    }),
    [moveReportTimespanBefore]: state => ({ ...state }),
    [moveReportTimespanAfter]: state => ({ ...state }),
    [loadReport]: state => ({ ...state, isLoading: true }),
    [combineActions(loadReportSuccess, loadReportFailure)]: state => ({
      ...state,
      isLoading: false
    })
  },
  {
    isLoading: false,
    kind: Report.defaultKind,
    timespan: Report.defaultTimespan,
    dateStart: Report.defaultStartDate(),
    dateEnd: Report.defaultEndDate(),
    accounts: []
  }
)
