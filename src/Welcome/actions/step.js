export const CHANGE_STEP = 'CHANGE_STEP'

export function changeStep(nextStep) {
  return {
    type: CHANGE_STEP,
    nextStep
  }
}
