import { connect } from 'react-redux'
import Filter from '../../components/Transaction/Filter'
import {
  changeFilterDate,
  toggleFilterCalendar
} from '../../actions/ui/transaction/filter'
import { getDateLabel } from '../../selectors/ui/transaction/filter'

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  dateRangeLabel: getDateLabel(state),
  isCalendarOpen: state.ui.transaction.filter.isCalendarOpen
})

export default connect(mapStateToProps, {
  changeFilterDate,
  toggleFilterCalendar
})(Filter)
