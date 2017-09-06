import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Amount from '../../Amount'

const Account = ({ account, onRemoveAccount }) => (
  <div className="account-widget-account">
    <div className="account-widget-account__name">
      <Link to={`/accounts/details/${account.id}`}>{account.name}</Link>
    </div>
    {onRemoveAccount && (
      <div className="account-widget-account__remove">
        <Icon
          name="trash"
          color="grey"
          style={{ cursor: 'pointer' }}
          onClick={() => onRemoveAccount(account.id)}
        />
      </div>
    )}
    <div className="account-widget-account__balance">
      {account.currencies.map(code => (
        <div key={code}>
          <Amount value={account.balance[code]} code={code} />
        </div>
      ))}
    </div>
  </div>
)

Account.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.objectOf(PropTypes.number).isRequired
  }).isRequired,
  onRemoveAccount: PropTypes.func
}

export default Account
