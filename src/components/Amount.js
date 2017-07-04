import React from 'react'
import PropTypes from 'prop-types'
import { CURRENCY } from '../constants/currency'

const Amount = ({ value, code, showColor = true }) => (
  <span className={`mono ${showColor && (value >=0 ? 'positive': 'negative')}`}>
    {Number(
      value / Math.pow(10, CURRENCY[code].exp)
    ).toLocaleString(undefined, {
      minimumFractionDigits: CURRENCY[code].exp,
      maximumFractionDigits: CURRENCY[code].exp
    })}
    {' '}
    {code}
  </span>
)

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  showColor: PropTypes.bool
}

export default Amount
