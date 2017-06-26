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
    return (
      <div className="transactions-list">
        <div className="transactions-list__header">
          <h3>Recent Transactions</h3>
        </div>
        <TransactionList
          isMobile={this.props.isMobile}
          transactions={this.props.transactions}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isMobile: state.ui.isMobile,
  transactions: getRecentTransactions(state)
})

export default connect(mapStateToProps, { loadRecentTransactions })(
  RecentTransactions
)
