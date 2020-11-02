import React from 'react';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import Amount from '../../Amount';

const Group = ({
  baseCurrency,
  group,
  isCollapsed,
  toggleGroupCollapse,
  openAccountInModal
}) => (
  <div className="account-widget-group">
    <div className="account-widget-group__header" onClick={toggleGroupCollapse}>
      <span className="account-widget-group__name">{group.name}</span>
      <span className="account-widget-group__total">
        <Amount value={group.total} code={baseCurrency} showCents={false} />
      </span>
    </div>
    {!isCollapsed &&
      group.accounts.map(account => (
        <AccountItem
          key={account.id}
          account={account}
          openAccountInModal={openAccountInModal}
        />
      ))}
  </div>
);

Group.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  toggleGroupCollapse: PropTypes.func.isRequired,
  openAccountInModal: PropTypes.func
};

export default Group;
