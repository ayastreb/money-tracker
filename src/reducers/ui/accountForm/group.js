import { FAILURE, REQUEST } from '../../../middleware/promise'
import { CHANGE_GROUP } from '../../../actions/ui/accountForm'
import { saveAccount } from '../../../actions/accounts'
import Account from '../../../models/Account'

export default function(state = Account.defaultGroup, action) {
  switch (action.type) {
    case CHANGE_GROUP:
      return action.group
    case `${saveAccount}_${REQUEST}`:
      return Account.defaultGroup
    case `${saveAccount}_${FAILURE}`:
      return action.meta.account.group
    default:
      return state
  }
}
