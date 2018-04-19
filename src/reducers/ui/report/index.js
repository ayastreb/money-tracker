import { handleActions } from 'redux-actions'
import {
  changeReportKind,
  changeReportTimespan,
  changeReportAccounts,
  moveReportDateBackwards,
  moveReportDateForwards,
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
      timespan: payload,
      date: Report.defaultDate(payload)
    }),
    [changeReportAccounts]: (state, { payload }) => ({
      ...state,
      accounts: payload
    }),
    [moveReportDateBackwards]: state => ({
      ...state,
      date: Report.moveDateBackwards(state.date, state.timespan),
      data: {
        ...state.data,
        netWorthEnd: state.data.netWorthStart
      },
      netWorthStack: [state.data.netWorthEnd, ...state.netWorthStack]
    }),
    [moveReportDateForwards]: state => ({
      ...state,
      date: Report.moveDateForwards(state.date, state.timespan),
      data: {
        ...state.data,
        netWorthEnd: state.netWorthStack[0]
      },
      netWorthStack: state.netWorthStack.slice(1)
    }),
    [loadReport]: state => ({ ...state, isLoading: true }),
    [loadReportSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: payload
    }),
    [loadReportFailure]: state => ({ ...state, isLoading: false })
  },
  {
    isLoading: false,
    data: {},
    kind: Report.defaultKind,
    timespan: Report.defaultTimespan,
    date: Report.defaultDate(),
    accounts: [],
    netWorthStack: []
  }
)
