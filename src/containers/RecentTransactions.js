import React from 'react'
import { connect } from 'react-redux'
import TransactionList from '../components/TransactionList'
import { loadRecentTransactions } from '../actions/transactions'
import { getRecentTransactions } from '../selectors/transactions'

class RecentTransactions extends React.Component {
  componentDidMount() {
    this.props.loadRecentTransactions()
  }

  render() {
    return <TransactionList transactions={this.props.transactions} />
  }
}

const mapStateToProps = state => ({
  transactions: getRecentTransactions(state)
})

export default connect(mapStateToProps, { loadRecentTransactions })(
  RecentTransactions
)
