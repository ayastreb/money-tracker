import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import { getAccountsAsOptions } from '../../../selectors/accounts'
import {
  getAccountId,
  getCurrencyOptions,
  getCurrency,
  getIncomeTagOptions
} from '../../../selectors/ui/transactionForm'
import { INCOME } from '../../../entities/Transaction'
import { saveTransaction } from '../../../actions/transactions'
import { loadIncomeTags } from '../../../actions/tags'
import {
  changeAccount,
  changeAmount,
  changeCurrency,
  addIncomeTag,
  changeIncomeTags,
  changeDate,
  changeNote
} from '../../../actions/ui/transactionForm'

const mapStateToProps = state => ({
  form: {
    kind: INCOME,
    accountId: getAccountId(state),
    amount: state.ui.transactionForm.amount,
    currency: getCurrency(state),
    tags: state.ui.transactionForm.tags[INCOME],
    date: state.ui.transactionForm.date,
    note: state.ui.transactionForm.note
  },
  label: 'To',
  buttonLabel: 'Add Income',
  accountOptions: getAccountsAsOptions(state),
  currencyOptions: getCurrencyOptions(state),
  tagsOptions: getIncomeTagOptions(state)
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
  saveTransaction
})(TransactionForm)
