import React from 'react'
import PropTypes from 'prop-types'
import { Table, Label } from 'semantic-ui-react'
import Amount from '../Amount'
import { formatShort } from '../../util/date'

class Transaction extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell width={2}>
          {formatShort(new Date(this.props.timestamp))}
        </Table.Cell>
        <Table.Cell>
          {this.props.accountName}
          {' → '}
          {this.props.tags.map(tag => <Label key={tag}>{tag}</Label>)}
          {this.props.note}
        </Table.Cell>
        <Table.Cell width={4} textAlign="right">
          <Amount value={this.props.amount} code={this.props.currency} />
        </Table.Cell>
      </Table.Row>
    )
  }
}

Transaction.propTypes = {
  timestamp: PropTypes.number,
  accountId: PropTypes.string,
  accountName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  note: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string
}

export default Transaction
