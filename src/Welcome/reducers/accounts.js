import { CREATE_ACCOUNT, REMOVE_ACCOUNT } from '../actions'

export default function accounts(state = [], action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return state.concat(action.account)
    case REMOVE_ACCOUNT:
      return state.filter(account => account.id !== action.id)
    default:
      return state
  }
}
