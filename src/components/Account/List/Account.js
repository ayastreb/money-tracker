import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Amount from '../../Amount'

const Account = ({ account }) => (
  <div className="account-widget-account">
    <div className="account-widget-account__name">
      <Link to={`/accounts/details/${account.id}`}>{account.name}</Link>
    </div>
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
