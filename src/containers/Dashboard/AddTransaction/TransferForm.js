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
import { TRANSFER } from '../../../entities/Transaction'
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
  form: {
    kind: TRANSFER,
    accountId: getAccountId(state),
    amount: state.ui.transactionForm.amount,
    currency: getCurrency(state),
    linkedAccountId: getLinkedAccountId(state),
    linkedAmount: state.ui.transactionForm.linkedAmount,
    linkedCurrency: getLinkedCurrency(state),
    date: state.ui.transactionForm.date,
    note: state.ui.transactionForm.note
  },
  label: 'From',
  buttonLabel: 'Add Transfer',
  accountOptions: getAccountsAsOptions(state),
  currencyOptions: getCurrencyOptions(state),
  linkedCurrencyOptions: getLinkedCurrencyOptions(state)
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
