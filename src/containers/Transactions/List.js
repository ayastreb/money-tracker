import { connect } from 'react-redux'
import {
  openTransactionInModal,
  resetTransactionForm
} from '../../actions/ui/form/transaction'
import { removeTransaction } from '../../actions/entities/transactions'
import TransactionList from '../../components/Transaction/List'
import { getFilterTransactions } from '../../selectors/entities/transactions'
import { getForm } from '../../selectors/ui/form/transaction'
import TransactionForm from '../Transactions/Form'

const mapStateToProps = state => ({
  currentTransactionId: getForm(state).id,
  isLoading: state.ui.transaction.filter.isLoading,
  transactions: getFilterTransactions(state),
  isModalOpen: getForm(state).isModalOpen,
  isEdit: getForm(state).id !== undefined,
  EditForm: TransactionForm
})

export default connect(mapStateToProps, {
  openTransactionInModal,
  resetTransactionForm,
  removeTransaction
})(TransactionList)
