import { connect } from 'react-redux'
import AccountsList from '../../components/Account/List'
import { getGroupedAccounts } from '../../selectors/entities/accounts'
import { getCollapsedSections, getBaseCurrency } from '../../selectors/settings'
import { toggleSectionCollapse } from '../../actions/settings'
import { openAccountInModal } from '../../actions/ui/form/account'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  baseCurrency: getBaseCurrency(state),
  collapsedGroups: getCollapsedSections(state),
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, {
  toggleSectionCollapse,
  openAccountInModal
})(AccountsList)
