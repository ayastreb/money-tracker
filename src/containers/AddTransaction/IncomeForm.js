import { connect } from 'react-redux'
import SimpleTransaction
  from '../../components/TransactionForm/SimpleTransaction'
import { getAccountsAsOptions } from '../../selectors/accounts'
import {
  getAccountId,
  getCurrencyOptions,
  getCurrency,
  getIncomeTagOptions
} from '../../selectors/ui/transactionForm'
import { INCOME } from '../../constants/transaction'
import { saveIncomeTransaction } from '../../actions/transactions'
import { loadIncomeTags } from '../../actions/tags'
import {
  changeAccount,
  changeAmount,
  changeCurrency,
  addIncomeTag,
  changeIncomeTags,
  changeDate,
  changeNote
} from '../../actions/ui/transactionForm'

const mapStateToProps = state => ({
  label: 'To',
  buttonLabel: 'Add Income',
  accountId: getAccountId(state),
  accountOptions: getAccountsAsOptions(state),
  amount: state.ui.transactionForm.amount,
  currency: getCurrency(state),
  currencyOptions: getCurrencyOptions(state),
  tags: state.ui.transactionForm.tags[INCOME],
  tagsOptions: getIncomeTagOptions(state),
  date: state.ui.transactionForm.date,
  note: state.ui.transactionForm.note
})

export default connect(mapStateToProps, {
  changeAccount,
  changeAmount,
  changeCurrency,
  changeDate,
  changeNote,
  addTag: addIncomeTag,
  changeTags: changeIncomeTags,
  loadTagsOptions: loadIncomeTags,
  saveTransaction: saveIncomeTransaction
})(SimpleTransaction)
