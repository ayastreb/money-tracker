import { connect } from 'react-redux'
import AccountsWidget from '../../components/Account/Widget'
import { getGroupedAccounts } from '../../selectors/entities/accounts'
import { getCollapsedSections, getBaseCurrency } from '../../selectors/settings'
import { toggleSectionCollapse } from '../../actions/settings'

const mapStateToProps = state => ({
  baseCurrency: getBaseCurrency(state),
  collapsedGroups: getCollapsedSections(state),
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, { toggleSectionCollapse })(
  AccountsWidget
)
