import { connect } from 'react-redux'
import AccountsWidget from '../../components/Account/Widget'
import { getGroupedAccounts } from '../../selectors/entities/accounts'
import { removeAccount } from '../../actions/entities/accounts'
import { toggleSectionCollapse } from '../../actions/settings'
import { getCollapsedSections, getBaseCurrency } from '../../selectors/settings'

const mapStateToProps = state => ({
  baseCurrency: getBaseCurrency(state),
  collapsedGroups: getCollapsedSections(state),
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, {
  toggleSectionCollapse,
  removeAccount
})(AccountsWidget)
