import React from 'react'
import PropTypes from 'prop-types'
import Group from './Group'

const AccountsWidget = ({ baseCurrency, groups }) => (
  <div>
    {Object.keys(groups).map(group => (
      <Group key={group} baseCurrency={baseCurrency} group={groups[group]} />
    ))}
  </div>
)

AccountsWidget.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  groups: PropTypes.objectOf(PropTypes.object).isRequired
}

export default AccountsWidget
