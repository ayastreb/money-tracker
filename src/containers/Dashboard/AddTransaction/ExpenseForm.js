import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import { getAccountsAsOptions } from '../../../selectors/accounts'
import {
  getAccountId,
  getCurrencyOptions,
  getCurrency,
  getExpenseTagOptions
} from '../../../selectors/ui/transactionForm'
import { EXPENSE } from '../../../models/Transaction'
import { saveTransaction } from '../../../actions/transactions'
import { loadExpenseTags } from '../../../actions/tags'
import {
  changeAccount,
  changeAmount,
  changeCurrency,
  addExpenseTag,
  changeExpenseTags,
  changeDate,
  changeNote
} from '../../../actions/ui/transactionForm'

const mapStateToProps = state => ({
  kind: EXPENSE,
  label: 'From',
  buttonLabel: 'Add Expense',
  accountId: getAccountId(state),
  accountOptions: getAccountsAsOptions(state),
  amount: state.ui.transactionForm.amount,
  currency: getCurrency(state),
  currencyOptions: getCurrencyOptions(state),
  tags: state.ui.transactionForm.tags[EXPENSE],
  tagsOptions: getExpenseTagOptions(state),
  date: state.ui.transactionForm.date,
  note: state.ui.transactionForm.note
})

export default connect(mapStateToProps, {
  changeAccount,
  changeAmount,
  changeCurrency,
  changeDate,
  changeNote,
  addTag: addExpenseTag,
  changeTags: changeExpenseTags,
  loadTagsOptions: loadExpenseTags,
  saveTransaction
})(TransactionForm)
