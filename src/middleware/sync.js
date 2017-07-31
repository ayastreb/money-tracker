import { SAVE_TRANSACTION } from '../actions/transactions'
import { CREATE_ACCOUNT, REMOVE_ACCOUNT } from '../actions/accounts'
import { SYNC_SUCCESS } from '../actions/sync'
import { setPendingChangesFlag, unsetPendingChangesFlag } from '../actions/sync'

export default store => next => action => {
  const result = next(action)
  switch (action.type) {
    case SAVE_TRANSACTION:
    case CREATE_ACCOUNT:
    case REMOVE_ACCOUNT:
      store.dispatch(setPendingChangesFlag())

      return result
    case SYNC_SUCCESS:
      store.dispatch(unsetPendingChangesFlag())

      return result
    default:
      return result
  }
}
