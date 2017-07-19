import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import { getAccountsAsOptions } from '../../../selectors/accounts'
import {
  getAccountId,
  getCurrencyOptions,
  getCurrency,
  getLinkedAccountId,
  getLinkedCurrencyOptions,
  getLinkedCurrency
} from '../../../selectors/ui/transactionForm'
import { saveTransferTransaction } from '../../../actions/transactions'
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
  label: 'From',
  buttonLabel: 'Add Transfer',
  accountId: getAccountId(state),
  accountOptions: getAccountsAsOptions(state),
  amount: state.ui.transactionForm.amount,
  currency: getCurrency(state),
  currencyOptions: getCurrencyOptions(state),
  linkedAccountId: getLinkedAccountId(state),
  linkedAmount: state.ui.transactionForm.linkedAmount,
  linkedCurrency: getLinkedCurrency(state),
  linkedCurrencyOptions: getLinkedCurrencyOptions(state),
  date: state.ui.transactionForm.date,
  note: state.ui.transactionForm.note
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
  saveTransaction: saveTransferTransaction
})(TransactionForm)
