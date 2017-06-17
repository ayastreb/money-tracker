import React from 'react'
import PropTypes from 'prop-types'
import { CURRENCY } from '../constants/currency'

const Amount = ({ value, code }) => (
  <span className={value >= 0 ? 'mono positive' : 'mono negative'}>
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
  code: PropTypes.string.isRequired
}

export default Amount
