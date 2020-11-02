import React from 'react';
import PropTypes from 'prop-types';
import Currency from '../entities/Currency';

const Amount = ({ value, code, showColor = true, showCents = true }) => (
  <span
    className={`mono ${showColor && (value >= 0 ? 'positive' : 'negative')}`}
  >
    {showCents
      ? Currency.centsToString(value, code)
      : Currency.centsToDollar(value, code)}{' '}
    {code}
  </span>
);

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  showColor: PropTypes.bool,
  showCents: PropTypes.bool
};

export default Amount;
