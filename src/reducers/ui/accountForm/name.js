import { handleActions } from 'redux-actions'
import { changeName } from '../../../actions/ui/accountForm'
import {
  saveAccountRequest,
  saveAccountFailure
} from '../../../actions/accounts'

export default handleActions(
  {
    [changeName]: (state, action) => action.payload,
    [saveAccountRequest]: () => '',
    [saveAccountFailure]: (state, action) => action.payload.name
  },
  ''
)
