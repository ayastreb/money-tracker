import { handleActions } from 'redux-actions'
import { changeName } from '../../../actions/ui/accountForm'
import { saveAccount, saveAccountFailure } from '../../../actions/accounts'

export default handleActions(
  {
    [changeName]: (state, action) => action.payload,
    [saveAccount]: () => '',
    [saveAccountFailure]: (state, action) => action.payload.name
  },
  ''
)
