import { handleActions } from 'redux-actions'
import {
  changeFilterDate,
  toggleFilterCalendar
} from '../../../actions/ui/transaction/filter'
import DateRange from '../../../entities/Transaction/FilterDateRange'

const initialState = {
  dateStart: DateRange.defaultStart,
  dateEnd: DateRange.defaultEnd,
  isCalendarOpen: false,
  isFilterModalOpen: false
}

export default handleActions(
  {
    [changeFilterDate]: (state, { payload }) => ({ ...state, ...payload }),
    [toggleFilterCalendar]: state => ({
      ...state,
      isCalendarOpen: !state.isCalendarOpen
    })
  },
  initialState
)
