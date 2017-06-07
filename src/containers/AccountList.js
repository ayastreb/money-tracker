import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Label, List, Icon } from 'semantic-ui-react'
import Amount from '../components/Amount'
import { removeAccount } from '../actions/accounts'
import { ACCOUNT_GROUP } from '../constants/account'

class AccountList extends React.Component {
  render() {
    if (this.props.allIds.length === 0) return false

    return (
      <List divided relaxed>
        {this.props.allIds.map(this.renderItem)}
      </List>
    )
  }

  renderItem = id => {
    const account = this.props.byId[id]
    return (
      <List.Item key={id}>
        <List.Content floated="left">
          <Label
            as="a"
            pointing="right"
            onClick={() => this.props.removeAccount(id)}
          >
            <Icon name="trash" />{ACCOUNT_GROUP[account.group]}
          </Label>
          {account.name}
        </List.Content>
        <List.Content floated="right">
          <List style={{ padding: 0 }}>
            {Object.keys(account.balance).map(currency => (
              <List.Item key={currency}>
                <List.Content floated="right">
                  <Amount code={currency} value={account.balance[currency]} />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </List.Content>
      </List.Item>
    )
  }
}

AccountList.propTypes = {
  byId: PropTypes.objectOf(PropTypes.object),
  allIds: PropTypes.arrayOf(PropTypes.string),
  removeAccount: PropTypes.func
}

const mapStateToProps = state => ({
  byId: state.accounts.byId,
  allIds: state.accounts.allIds
})

export default connect(mapStateToProps, { removeAccount })(AccountList)
