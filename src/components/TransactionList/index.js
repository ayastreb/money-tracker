import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import Transaction from './Transaction'

class TransactionList extends React.Component {
  render() {
    return (
      <Table singleLine>
        <Table.Body>
          {this.props.transactions.map(transaction => (
            <Transaction key={transaction.id} {...transaction} />
          ))}
        </Table.Body>
      </Table>
    )
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object)
}

export default TransactionList
