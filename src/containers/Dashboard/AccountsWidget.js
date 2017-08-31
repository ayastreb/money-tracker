import { connect } from 'react-redux'
import AccountsWidget from '../../components/AccountsWidget'
import { getGroupedAccounts } from '../../selectors/accounts'
import { getCollapsedSections } from '../../selectors/settings'
import { getBaseCurrency } from '../../selectors/currency'
import { toggleSectionCollapse } from '../../actions/settings'

const mapStateToProps = state => ({
  baseCurrency: getBaseCurrency(state),
  collapsedGroups: getCollapsedSections(state),
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, { toggleSectionCollapse })(
  AccountsWidget
)
