import { connect } from 'react-redux'
import TransactionForm from '../../../components/TransactionForm'
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../../selectors/entities/accounts'
import { getTagOptions } from '../../../selectors/entities/tags'
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
  form: state.ui.transactionForm,
  label: 'To',
  buttonLabel: 'Add Income',
  currencyMap: getAccountsCurrencyMap(state),
  accountOptions: getAccountsAsOptions(state),
  tagsOptions: getTagOptions(state)
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
