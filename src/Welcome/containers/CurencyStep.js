import React from 'react'
import { connect } from 'react-redux'
import {
  changeBaseCurrency,
  changeSecondaryCurrency,
  changeStep
} from '../actions'
import { STEPS } from '../constants'
import { Header } from 'semantic-ui-react'
import CurrencyForm from '../components/CurrencyForm'

const mapStateToProps = state => ({
  base: state.currency.base,
  secondary: state.currency.secondary
})

const mapDispatchToProps = dispatch => ({
  onBaseChange: (event, { value }) => {
    dispatch(changeBaseCurrency(value))
  },
  onSecondaryChange: (event, { value }) =>
    dispatch(changeSecondaryCurrency(value)),
  onSubmit: event => {
    event.preventDefault()
    dispatch(changeStep(STEPS.ACCOUNT))
  }
})

const CurrencyStep = props => (
  <div>
    <Header as="h3">Setup Currencies</Header>
    <CurrencyForm {...props} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyStep)
