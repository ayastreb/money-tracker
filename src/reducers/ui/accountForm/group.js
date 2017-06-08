import { CHANGE_GROUP } from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'
import { DEFAULT_GROUP } from '../../../constants/account'

export default function(state = DEFAULT_GROUP, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_FAILURE:
    case CHANGE_GROUP:
      return action.group
    case CREATE_ACCOUNT:
      return DEFAULT_GROUP
    default:
      return state
  }
}
