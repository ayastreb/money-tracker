import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Amount from '../../Amount'
import Account from '../../../entities/Account'

class AccountItem extends React.Component {
  handleEditClick = () => {
    this.props.openAccountInModal(Account.toForm(this.props.account))
  }

  render() {
    return (
      <div className="account-widget-account">
        <div className="account-widget-account__name">
          <Link to={`/transactions/${this.props.account.id}`}>
            {this.props.account.name}
          </Link>
        </div>
        <div className="account-widget-account__balance">
          {this.props.account.currencies.map(code => (
            <div key={code}>
              <Amount value={this.props.account.balance[code]} code={code} />
            </div>
          ))}
        </div>
        {this.props.openAccountInModal && (
          <div className="account-widget-account__edit">
            <Button
              basic
              circular
              icon="pencil"
              onClick={this.handleEditClick}
            />
          </div>
        )}
      </div>
    )
  }
}

AccountItem.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.objectOf(PropTypes.number).isRequired
  }).isRequired,
  openAccountInModal: PropTypes.func
}

export default AccountItem
