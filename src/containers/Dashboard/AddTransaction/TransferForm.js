import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../../selectors/entities/accounts'

import { saveTransaction } from '../../../actions/transactions'
import {
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  changeNote
} from '../../../actions/ui/transactionForm'

const mapStateToProps = state => ({
  form: state.ui.transactionForm,
  label: 'From',
  buttonLabel: 'Add Transfer',
  currencyMap: getAccountsCurrencyMap(state),
  accountOptions: getAccountsAsOptions(state)
})

export default connect(mapStateToProps, {
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  changeNote,
  saveTransaction
})(TransactionForm)
