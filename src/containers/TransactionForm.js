import { connect } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import { getAccountsAsOptions } from '../selectors/accounts'
import {
  getAccountId,
  getCurrencies,
  getCurrency,
  getLinkedAccountId,
  getLinkedCurrencies,
  getLinkedCurrency,
  getTagOptions
} from '../selectors/ui/transactionForm'
import {
  changeTransactionKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  addTag,
  changeTags,
  changeDate,
  changeNote
} from '../actions/ui/transactionForm'

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  kind: state.ui.transactionForm.kind,
  amount: state.ui.transactionForm.amount,
  linkedAmount: state.ui.transactionForm.linkedAmount,
  tags: state.ui.transactionForm.tags,
  date: state.ui.transactionForm.date,
  note: state.ui.transactionForm.note,
  accounts: getAccountsAsOptions(state),
  accountId: getAccountId(state),
  currencies: getCurrencies(state),
  currency: getCurrency(state),
  linkedAccountId: getLinkedAccountId(state),
  linkedCurrencies: getLinkedCurrencies(state),
  linkedCurrency: getLinkedCurrency(state),
  tagOptions: getTagOptions(state)
})

export default connect(mapStateToProps, {
  changeTransactionKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  addTag,
  changeTags,
  changeDate,
  changeNote
})(TransactionForm)
