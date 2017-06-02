import { CHANGE_BASE_CURRENCY, CHANGE_SECONDARY_CURRENCY } from '../actions'

const initialState = { base: 'USD', secondary: [] }
export default function currency(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BASE_CURRENCY:
      return {
        base: action.code,
        secondary: state.secondary.filter(code => code !== action.code)
      }
    case CHANGE_SECONDARY_CURRENCY:
      return { ...state, secondary: action.codes || [] }
    default:
      return state
  }
}
