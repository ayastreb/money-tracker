import React from 'react'
import { connect } from 'react-redux'
import { getDefaultState } from '../../selectors/ui/form/transaction'
import TransactionForm from '../../components/Transaction/Form'
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../selectors/entities/accounts'
import { getTagOptions } from '../../selectors/entities/tags'
import { saveTransaction } from '../../actions/entities/transactions'
import { loadTags } from '../../actions/entities/tags'
import {
  fillInTransactionForm,
  changeKind,
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
} from '../../actions/ui/form/transaction'
import Transaction from '../../entities/Transaction'

class AddTransaction extends React.Component {
  componentWillMount() {
    this.props.loadTags()
    this.props.fillInTransactionForm(this.props.initialData)
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction(Transaction.fromForm(this.props.form))
    this.props.fillInTransactionForm(this.props.initialData)
  }

  render() {
    if (!this.props.form.accountId) return null

    return <TransactionForm {...this.props} onSubmit={this.onSubmit} />
  }
}

const mapStateToProps = state => ({
  initialData: getDefaultState(state),
  form: state.ui.form.transaction,
  accountCurrency: getAccountsCurrencyMap(state),
  accountOptions: getAccountsAsOptions(state),
  tagsOptions: getTagOptions(state)
})

export default connect(mapStateToProps, {
  fillInTransactionForm,
  changeKind,
  changeAccount,
  changeAmount,
  changeCurrency,
  changeLinkedAccount,
  changeLinkedAmount,
  changeLinkedCurrency,
  changeDate,
  changeNote,
  addTag,
  changeTags,
  loadTags,
  saveTransaction
})(AddTransaction)
