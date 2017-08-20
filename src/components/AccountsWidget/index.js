import React from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import './index.css'

class AccountsWidget extends React.Component {
  toggle = group => () => this.props.toggleSectionCollapse(group)

  render() {
    return (
      <div className="account-widget">
        {Object.keys(this.props.groups).map(group => (
          <Group
            key={group}
            baseCurrency={this.props.baseCurrency}
            group={this.props.groups[group]}
            isCollapsed={this.props.collapsedGroups.includes(group)}
            toggleGroupCollapse={this.toggle(group)}
            removeAccount={this.props.removeAccount}
          />
        ))}
      </div>
    )
  }
}

AccountsWidget.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  groups: PropTypes.objectOf(PropTypes.object).isRequired,
  collapsedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSectionCollapse: PropTypes.func.isRequired,
  removeAccount: PropTypes.func
}

export default AccountsWidget
