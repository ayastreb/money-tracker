import React from 'react';
import { connect } from 'react-redux';
import { getNetWorth } from '../../selectors/entities/accounts';
import { getBaseCurrency } from '../../selectors/settings';
import Amount from '../../components/Amount';

const NetWorth = ({ netWorth, baseCurrency }) => (
  <div className="net-worth__total">
    <Amount value={netWorth} code={baseCurrency} showCents={false} />
  </div>
);

const mapStateToProps = state => ({
  netWorth: getNetWorth(state),
  baseCurrency: getBaseCurrency(state)
});

export default connect(mapStateToProps)(NetWorth);
