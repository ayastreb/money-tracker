import React from 'react'
import PropTypes from 'prop-types'
import Amount from '../Amount'
import './style.css'

const NetWorth = ({ baseCurrency, netWorth }) => (
  <div className="net-worth">
    <div className="net-worth__label">NET WORTH</div>
    <div className="net-worth__total">
      <Amount value={netWorth} code={baseCurrency} />
    </div>
  </div>
)

NetWorth.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  netWorth: PropTypes.number.isRequired
}

export default NetWorth
