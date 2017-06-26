import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import Transaction from './Transaction'
import './index.css'

class TransactionList extends React.Component {
  render() {
    return (
      <Table singleLine>
        <Table.Body>
          {this.props.transactions.length > 0
            ? this.props.transactions.map(this.renderTransaction)
            : <div className="transactions-list__empty">
                You don't have any transactions yet
              </div>}
        </Table.Body>
      </Table>
    )
  }

  renderTransaction = transaction => (
    <Transaction
      key={transaction.id}
      isMobile={this.props.isMobile}
      {...transaction}
    />
  )
}

TransactionList.propTypes = {
  isMobile: PropTypes.bool,
  transactions: PropTypes.arrayOf(PropTypes.object)
}

export default TransactionList
