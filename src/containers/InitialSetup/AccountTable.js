import { connect } from 'react-redux'
import AccountsWidget from '../../components/AccountsWidget'
import { getGroupedAccounts } from '../../selectors/accounts'
import { removeAccount } from '../../actions/accounts'
import { toggleSectionCollapse } from '../../actions/settings'
import { getCollapsedSections } from '../../selectors/settings'
import { getBaseCurrency } from '../../selectors/currency'

const mapStateToProps = state => ({
  baseCurrency: getBaseCurrency(state),
  collapsedGroups: getCollapsedSections(state),
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, {
  toggleSectionCollapse,
  removeAccount
})(AccountsWidget)
