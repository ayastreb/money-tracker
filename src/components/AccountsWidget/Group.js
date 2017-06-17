import React from 'react'
import PropTypes from 'prop-types'
import Account from './Account'
import Amount from '../Amount'
import './style.css'

const Group = ({ baseCurrency, group }) => (
  <div className="account-widget-group">
    <div className="account-widget-group__header">
      <span className="account-widget-group__name">
        {group.name}
      </span>
      <span className="account-widget-group__total">
        <Amount value={group.total} code={baseCurrency} />
      </span>
    </div>
    {group.accounts.map(account => (
      <Account key={account.id} account={account} />
    ))}
  </div>
)

Group.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
}

export default Group
