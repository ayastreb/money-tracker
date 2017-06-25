import React from 'react'
import PropTypes from 'prop-types'
import Group from './Group'
import './index.css'

class AccountsWidget extends React.Component {
  toggleGroupCollapse = group => () => this.props.toggleGroupCollapse(group)

  render() {
    return (
      <div className="account-widget">
        {Object.keys(this.props.groups).map(group => (
          <Group
            key={group}
            baseCurrency={this.props.baseCurrency}
            group={this.props.groups[group]}
            isCollapsed={this.props.collapsedGroups.includes(group)}
            toggleGroupCollapse={this.toggleGroupCollapse(group)}
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
  toggleGroupCollapse: PropTypes.func.isRequired
}

export default AccountsWidget
