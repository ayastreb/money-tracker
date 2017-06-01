import React from 'react'
import { STEPS } from '../constants/step'
import { connect } from 'react-redux'
import CurrencyStep from './CurencyStep'
import AccountStep from './AccountStep'

const ActiveStep = ({ step }) =>
  step === STEPS.CURRENCY ? <CurrencyStep /> : <AccountStep />

const mapStateToProps = state => ({
  step: state.step
})

export default connect(mapStateToProps)(ActiveStep)
