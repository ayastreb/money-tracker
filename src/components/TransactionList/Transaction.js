import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Table, Label } from 'semantic-ui-react'
import Amount from '../Amount'
import { formatShort } from '../../util/date'

class Transaction extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell width={2}>
          {formatShort(new Date(this.props.date))}
        </Table.Cell>
        <Table.Cell>
          {this.props.accountName}
          {' → '}
          {this.props.tags.map(tag => <Label key={tag}>{tag}</Label>)}
          {this.props.note}
        </Table.Cell>
        <Table.Cell width={4} textAlign="right">
          <Amount value={this.props.amount} code={this.props.currency} />
          {' '}
          <Icon style={{cursor: 'pointer'}} name="trash" color="grey" onClick={() => console.log('a')} />
        </Table.Cell>
      </Table.Row>
    )
  }
}

Transaction.propTypes = {
  isMobile: PropTypes.bool,
  id: PropTypes.string,
  accountId: PropTypes.string,
  accountName: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  note: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.string
}

export default Transaction
