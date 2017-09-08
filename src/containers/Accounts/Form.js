import { connect } from 'react-redux'
import AccountForm from '../../components/Account/Form'
import {
  changeName,
  changeGroup,
  changeBalance,
  toggleOnDashboard,
  toggleCurrency
} from '../../actions/ui/form/account'
import { saveAccount } from '../../actions/entities/accounts'
import { getBaseCurrency, getSecondaryCurrency } from '../../selectors/settings'

const mapStateToProps = state => ({
  form: state.ui.form.account,
  base: getBaseCurrency(state),
  secondary: getSecondaryCurrency(state)
})

export default connect(mapStateToProps, {
  changeName,
  changeGroup,
  changeBalance,
  toggleCurrency,
  toggleOnDashboard,
  saveAccount
})(AccountForm)
