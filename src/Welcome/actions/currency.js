import {
  CHANGE_BASE_CURRENCY,
  CHANGE_SECONDARY_CURRENCY
} from '../constants/currency'

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
