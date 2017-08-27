import { handleActions } from 'redux-actions'
import { changeGroup } from '../../../actions/ui/accountForm'
import {
  saveAccountRequest,
  saveAccountFailure
} from '../../../actions/accounts'
import Account from '../../../models/Account'

export default handleActions(
  {
    [changeGroup]: (state, action) => action.payload,
    [saveAccountRequest]: () => Account.defaultGroup,
    [saveAccountFailure]: (state, action) => action.payload.group
  },
  Account.defaultGroup
)
