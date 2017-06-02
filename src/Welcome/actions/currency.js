export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY'
export const CHANGE_SECONDARY_CURRENCY = 'CHANGE_SECONDARY_CURRENCY'

export function changeBaseCurrency(code) {
  return {
    type: CHANGE_BASE_CURRENCY,
    code
  }
}

export function changeSecondaryCurrency(codes) {
  return {
    type: CHANGE_SECONDARY_CURRENCY,
    codes
  }
}
