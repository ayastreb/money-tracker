import { handleActions } from 'redux-actions';
import {
  changeFilterDate,
  changeFilterPage,
  toggleFilterCalendar,
  toggleFilterModal,
  applyFilters
} from 'actions/ui/transaction/filter';
import {
  loadFilterTransactions,
  loadFilterTransactionsSuccess
} from 'actions/entities/transactions';
import { defaultStart, defaultEnd } from 'entities/Transaction/DateFilterRange';
import { rowsPerSearchPage } from 'entities/Transaction';
import { toUtcTimestamp } from 'util/timezone';

const initialState = {
  dateStart: toUtcTimestamp(defaultStart()),
  dateEnd: toUtcTimestamp(defaultEnd()),
  isCalendarOpen: false,
  isFilterModalOpen: false,
  applied: {},
  isLoading: false,
  totalRows: 0,
  page: 0,
  perPage: rowsPerSearchPage
};

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
      dateStart: toUtcTimestamp(payload.dateStart),
      dateEnd: toUtcTimestamp(payload.dateEnd),
      isLoading: true
    }),
    [changeFilterPage]: (state, { payload }) => ({ ...state, page: payload }),
    [toggleFilterCalendar]: state => ({
      ...state,
      isCalendarOpen: !state.isCalendarOpen
    }),
    [toggleFilterModal]: state => ({
      ...state,
      isFilterModalOpen: !state.isFilterModalOpen
    }),
    [applyFilters]: (state, { payload }) => ({ ...state, applied: payload })
  },
  initialState
);
