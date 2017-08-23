import { FAILURE, REQUEST } from '../../../middleware/promise'
import { CHANGE_NAME } from '../../../actions/ui/accountForm'
import { saveAccount } from '../../../actions/accounts'

export default function(state = '', action) {
  switch (action.type) {
    case CHANGE_NAME:
      return action.name
    case `${saveAccount}_${REQUEST}`:
      return ''
    case `${saveAccount}_${FAILURE}`:
      return action.meta.account.name
    default:
      return state
  }
}
