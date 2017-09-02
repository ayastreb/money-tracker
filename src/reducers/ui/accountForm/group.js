import { handleActions } from 'redux-actions'
import { changeGroup } from '../../../actions/ui/accountForm'
import { saveAccount, saveAccountFailure } from '../../../actions/accounts'
import Account from '../../../entities/Account'

export default handleActions(
  {
    [changeGroup]: (state, action) => action.payload,
    [saveAccount]: () => Account.defaultGroup,
    [saveAccountFailure]: (state, action) => action.payload.group
  },
  Account.defaultGroup
)
