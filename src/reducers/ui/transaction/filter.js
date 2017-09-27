import { handleActions } from 'redux-actions'
import {
  changeFilterDate,
  changeFilterPage,
  toggleFilterCalendar
} from '../../../actions/ui/transaction/filter'
import {
  loadFilterTransactions,
  loadFilterTransactionsSuccess
} from '../../../actions/entities/transactions'
import DateRange from '../../../entities/Transaction/FilterDateRange'
import Transaction from '../../../entities/Transaction'

const initialState = {
  dateStart: DateRange.defaultStart,
  dateEnd: DateRange.defaultEnd,
  isCalendarOpen: false,
  isFilterModalOpen: false,
  isLoading: false,
  totalRows: 0,
  page: 0,
  perPage: Transaction.rowsPerSearchPage
}

export default handleActions(
  {
    [loadFilterTransactions]: state => ({ ...state, isLoading: true }),
    [loadFilterTransactionsSuccess]: (state, { payload }) => ({
      ...state,
      page: 0,
      totalRows: payload.length,
      isLoading: false
    }),
    [changeFilterDate]: (state, { payload }) => ({
      ...state,
      ...payload,
      isLoading: true
    }),
    [changeFilterPage]: (state, { payload }) => ({ ...state, page: payload }),
    [toggleFilterCalendar]: state => ({
      ...state,
      isCalendarOpen: !state.isCalendarOpen
    })
  },
  initialState
)
