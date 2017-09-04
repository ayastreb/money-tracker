import React from 'react'
import PropTypes from 'prop-types'
import TransactionItem from './TransactionItem'
import './index.css'

class TransactionList extends React.Component {
  render() {
    return (
      <div className="transactions-list__wrapper">
        {this.props.transactions.length > 0 ? (
          this.props.transactions.map(this.renderTransaction)
        ) : (
          <div className="transactions-list__empty">
            You don't have any transactions yet
          </div>
        )}
      </div>
    )
  }

  renderTransaction = transaction => (
    <TransactionItem key={transaction.id} {...transaction} />
  )
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object)
}

export default TransactionList
