import { connect } from 'react-redux'
import Filter from '../../components/Transaction/Filter'
import {
  changeFilterDate,
  toggleFilterCalendar,
  toggleFilterModal,
  applyFilters
} from '../../actions/ui/transaction/filter'
import { openTransactionInModal } from '../../actions/ui/form/transaction'
import { getDateLabel } from '../../selectors/ui/transaction/filter'
import {
  getAccountsAsOptions,
  getAccountsNameMap
} from '../../selectors/entities/accounts'
import { getAllTagsOptions } from '../../selectors/entities/tags'

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  dateRangeLabel: getDateLabel(state),
  isCalendarOpen: state.ui.transaction.filter.isCalendarOpen,
  isFilterModalOpen: state.ui.transaction.filter.isFilterModalOpen,
  accountOptions: getAccountsAsOptions(state),
  accountNameMap: getAccountsNameMap(state),
  appliedAccounts: state.ui.transaction.filter.applied.accounts || [],
  tagsOptions: getAllTagsOptions(state),
  appliedTags: state.ui.transaction.filter.applied.tags || []
})

export default connect(mapStateToProps, {
  changeFilterDate,
  toggleFilterCalendar,
  toggleFilterModal,
  applyFilters,
  openTransactionInModal
})(Filter)
