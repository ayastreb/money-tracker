import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';
import './index.css';

class AccountsWidget extends React.Component {
  toggle = group => () => this.props.toggleSectionCollapse(group);

  render() {
    const groups = Object.keys(this.props.groups);

    return (
      groups.length > 0 && (
        <div className="account-widget">
          {groups.map(group => (
            <Group
              key={group}
              baseCurrency={this.props.baseCurrency}
              group={this.props.groups[group]}
              isCollapsed={this.props.collapsedGroups.includes(group)}
              toggleGroupCollapse={this.toggle(group)}
              openAccountInModal={this.props.openAccountInModal}
            />
          ))}
        </div>
      )
    );
  }
}

AccountsWidget.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  groups: PropTypes.objectOf(PropTypes.object).isRequired,
  collapsedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSectionCollapse: PropTypes.func.isRequired,
  openAccountInModal: PropTypes.func
};

export default AccountsWidget;
