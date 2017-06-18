import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Table, List } from 'semantic-ui-react'
import Amount from '../components/Amount'
import { getGroupedAccounts } from '../selectors/accounts'
import { removeAccount } from '../actions/accounts'
import { ACCOUNT_GROUP } from '../constants/account'

class AccountTable extends React.Component {
  handleRemove = id => () => this.props.removeAccount(id)

  render() {
    const groups = Object.keys(this.props.groups)
    if (groups.length === 0) return false
    return (
      <div>
        {groups.map(this.renderGroup)}
      </div>
    )
  }

  renderGroup = group => (
    <Table basic="very" singleLine key={group}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{ACCOUNT_GROUP[group]}</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">
            <Amount
              code={this.props.baseCurrency}
              value={this.props.groups[group].total}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.props.groups[group].accounts.map(this.renderAccount)}
      </Table.Body>
    </Table>
  )

  renderAccount = account => (
    <Table.Row key={account.id}>
      <Table.Cell verticalAlign="top">
        <Button
          compact
          circular
          basic
          icon="trash"
          onClick={this.handleRemove(account.id)}
        />
        {' '}{account.name}
      </Table.Cell>
      <Table.Cell textAlign="right">
        <List style={{ padding: 0 }}>
          {Object.keys(account.balance).map(currency => (
            <List.Item key={currency}>
              <List.Content floated="right">
                <Amount code={currency} value={account.balance[currency]} />
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Table.Cell>
    </Table.Row>
  )
}

AccountTable.propTypes = {
  baseCurrency: PropTypes.string,
  groups: PropTypes.objectOf(PropTypes.object),
  removeAccount: PropTypes.func
}

const mapStateToProps = state => ({
  baseCurrency: state.settings.currency.base,
  groups: getGroupedAccounts(state)
})

export default connect(mapStateToProps, { removeAccount })(AccountTable)
