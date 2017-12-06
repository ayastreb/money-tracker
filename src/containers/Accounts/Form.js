import { connect } from 'react-redux'
import AccountForm from '../../components/Account/Form'
import {
  changeName,
  changeGroup,
  changeBalance,
  toggleOnDashboard,
  toggleCurrency
} from '../../actions/ui/form/account'
import { saveAccount, removeAccount } from '../../actions/entities/accounts'
import { getBaseCurrency, getSecondaryCurrency } from '../../selectors/settings'
import { getForm } from '../../selectors/ui/form/account'

const mapStateToProps = state => ({
  form: getForm(state),
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state)
})

export default connect(mapStateToProps, {
  changeName,
  changeGroup,
  changeBalance,
  toggleCurrency,
  toggleOnDashboard,
  saveAccount,
  removeAccount
})(AccountForm)
