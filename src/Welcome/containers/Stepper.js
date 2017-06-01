import React from 'react'
import { connect } from 'react-redux'
import { STEPS } from '../constants'
import { Step } from 'semantic-ui-react'
import { changeStep } from '../actions/step'

const mapStateToProps = state => ({
  currentStep: state.step
})

const mapDispatchToProps = dispatch => ({
  changeStep: nextStep => dispatch(changeStep(nextStep))
})

const Stepper = ({ currentStep, changeStep }) => {
  const switchStep = nextStep =>
    currentStep === nextStep ? undefined : () => changeStep(nextStep)

  return (
    <Step.Group fluid>
      <Step
        active={currentStep === STEPS.CURRENCY}
        icon="dollar"
        title="Currency"
        onClick={switchStep(STEPS.CURRENCY)}
      />
      <Step
        active={currentStep === STEPS.ACCOUNT}
        icon="credit card"
        title="Account"
        onClick={switchStep(STEPS.ACCOUNT)}
      />
    </Step.Group>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Stepper)
