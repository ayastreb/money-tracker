import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Dimmer, Loader, Responsive, Button } from 'semantic-ui-react'
import ExchangeRateGrid from './ExchangeRateGrid'
import ExchangeRateTable from './ExchangeRateTable'
import './index.css'

const ExchangeRate = props =>
  props.secondary.length > 0 && (
    <Segment basic className="exchange-rate-table">
      <Dimmer inverted active={props.isLoading}>
        <Loader />
      </Dimmer>
      <Responsive minWidth={768}>
        <ExchangeRateGrid {...props} />
      </Responsive>
      <Responsive maxWidth={767}>
        <ExchangeRateTable {...props} />
      </Responsive>
      <Button
        basic
        content="Update exchange rate"
        icon="refresh"
        onClick={props.updateExchangeRate}
      />
    </Segment>
  )

ExchangeRate.propTypes = {
  base: PropTypes.string,
  secondary: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  exchangeRate: PropTypes.objectOf(PropTypes.number),
  updateExchangeRate: PropTypes.func
}

export default ExchangeRate
