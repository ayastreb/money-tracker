import { connect } from 'react-redux'
import Filter from '../../components/Transaction/Filter'
import {
  changeFilterDate,
  toggleFilterCalendar,
  toggleFilterModal,
  applyFilters
} from '../../actions/ui/transaction/filter'
import { getDateLabel } from '../../selectors/ui/transaction/filter'
import { getAccountsAsOptions } from '../../selectors/entities/accounts'

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  dateRangeLabel: getDateLabel(state),
  isCalendarOpen: state.ui.transaction.filter.isCalendarOpen,
  isFilterModalOpen: state.ui.transaction.filter.isFilterModalOpen,
  accountOptions: getAccountsAsOptions(state),
  appliedAccounts: state.ui.transaction.filter.applied.accounts || []
})

export default connect(mapStateToProps, {
  changeFilterDate,
  toggleFilterCalendar,
  toggleFilterModal,
  applyFilters
})(Filter)
