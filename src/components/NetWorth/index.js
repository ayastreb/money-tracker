import React from 'react'
import PropTypes from 'prop-types'
import Amount from '../Amount'
import './style.css'

const NetWorth = ({ baseCurrency, netWorth }) => (
  <div className="net-worth">
    <div className="net-worth-label">NET WORTH</div>
    <Amount value={netWorth} code={baseCurrency} />
  </div>
)

NetWorth.propTypes = {
  baseCurrency: PropTypes.string,
  netWorth: PropTypes.number
}

export default NetWorth
