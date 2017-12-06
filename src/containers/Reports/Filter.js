import { connect } from 'react-redux'
import Filter from '../../components/Report/Filter'
import { changeReportAccounts } from '../../actions/ui/report'
import { getAccountsAsOptions } from '../../selectors/entities/accounts'

const mapStateToProps = state => ({
  accounts: state.ui.report.accounts,
  accountOptions: getAccountsAsOptions(state)
})

export default connect(mapStateToProps, { changeReportAccounts })(Filter)
