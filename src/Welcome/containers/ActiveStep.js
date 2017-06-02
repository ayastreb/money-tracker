import React from 'react'
import { STEP } from '../constants'
import { connect } from 'react-redux'
import CurrencyStep from './CurencyStep'
import AccountStep from './AccountStep'

const ActiveStep = ({ step }) =>
  step === STEP.CURRENCY ? <CurrencyStep /> : <AccountStep />

const mapStateToProps = state => ({
  step: state.step
})

export default connect(mapStateToProps)(ActiveStep)
