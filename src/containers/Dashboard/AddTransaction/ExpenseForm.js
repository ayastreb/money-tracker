import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import { getAccountsAsOptions } from '../../../selectors/accounts'
import {
  getAccountId,
  getCurrencyOptions,
  getCurrency,
  getExpenseTagOptions
} from '../../../selectors/ui/transactionForm'
import { EXPENSE } from '../../../entities/Transaction'
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
  form: {
    kind: EXPENSE,
    accountId: getAccountId(state),
    amount: state.ui.transactionForm.amount,
    currency: getCurrency(state),
    tags: state.ui.transactionForm.tags[EXPENSE],
    date: state.ui.transactionForm.date,
    note: state.ui.transactionForm.note
  },
  label: 'From',
  buttonLabel: 'Add Expense',
  accountOptions: getAccountsAsOptions(state),
  currencyOptions: getCurrencyOptions(state),
  tagsOptions: getExpenseTagOptions(state)
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
