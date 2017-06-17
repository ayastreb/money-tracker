import React from 'react'
import PropTypes from 'prop-types'
import Amount from '../Amount'

const Account = ({ account }) => (
  <div className="account-widget-account">
    <div className="account-widget-account__name">{account.name}</div>
    <div className="account-widget-account__balance">
      {Object.keys(account.balance).map(code => (
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
  }).isRequired
}

export default Account
