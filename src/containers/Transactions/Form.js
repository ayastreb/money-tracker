import React from 'react'
import { connect } from 'react-redux'
import TransactionForm from '../../components/Transaction/Form'
import {
  getAccountsCurrencyMap,
  getAccountsAsOptions
} from '../../selectors/entities/accounts'
import { getTagOptions } from '../../selectors/entities/tags'
import { saveTransaction } from '../../actions/entities/transactions'
import { loadTags } from '../../actions/entities/tags'
import {
  resetTransactionForm,
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

class Form extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    this.props.saveTransaction(Transaction.fromForm(this.props.form))
    this.props.resetTransactionForm()
  }

  render() {
    if (!this.props.form.accountId) return null

    return <TransactionForm {...this.props} onSubmit={this.onSubmit} />
  }
}

const mapStateToProps = state => ({
  form: state.ui.form.transaction,
  accountCurrency: getAccountsCurrencyMap(state),
  accountOptions: getAccountsAsOptions(state),
  tagsOptions: getTagOptions(state)
})

export default connect(mapStateToProps, {
  resetTransactionForm,
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
})(Form)
