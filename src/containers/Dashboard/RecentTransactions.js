import { connect } from 'react-redux'
import TransactionList from '../../components/TransactionList'
import { getRecentTransactions } from '../../selectors/transactions'

const mapStateToProps = state => ({
  transactions: getRecentTransactions(state)
})

export default connect(mapStateToProps)(TransactionList)
