import { CHANGE_NAME } from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'

export default function(state = '', action) {
  switch (action.type) {
    case CREATE_ACCOUNT_FAILURE:
    case CHANGE_NAME:
      return action.name
    case CREATE_ACCOUNT:
      return ''
    default:
      return state
  }
}
