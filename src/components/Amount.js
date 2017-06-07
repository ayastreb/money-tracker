import React from 'react'
import { CURRENCY } from '../constants/currency'

const Amount = ({ value, code }) => (
  <span className={value >= 0 ? 'mono positive' : 'mono negative'}>
    {Number(
      value / Math.pow(10, CURRENCY[code].exp)
    ).toLocaleString(undefined, { minimumFractionDigits: CURRENCY[code].exp })}
    {' '}
    {code}
  </span>
)

export default Amount
