import React from 'react'
import PropTypes from 'prop-types'
import Account from './Account'
import Amount from '../Amount'

const Group = ({ baseCurrency, group, isCollapsed, toggleGroupCollapse }) => (
  <div className="account-widget-group">
    <div className="account-widget-group__header" onClick={toggleGroupCollapse}>
      <span className="account-widget-group__name">
        {group.name}
      </span>
      <span className="account-widget-group__total">
        <Amount value={group.total} code={baseCurrency} />
      </span>
    </div>
    {!isCollapsed &&
      group.accounts.map(account => (
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
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  toggleGroupCollapse: PropTypes.func.isRequired
}

export default Group
