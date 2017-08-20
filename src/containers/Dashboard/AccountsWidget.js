import { connect } from 'react-redux'
import AccountsWidget from '../../components/AccountsWidget'
import { getGroupedAccounts } from '../../selectors/accounts'
import { toggleSectionCollapse } from '../../actions/settings'

const mapStateToProps = state => ({
  baseCurrency: state.settings.currency.base,
  collapsedGroups: state.settings.collapsedSections,
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, { toggleSectionCollapse })(
  AccountsWidget
)
