import { CHANGE_TRANSACTION_KIND } from '../../../actions/ui/transactionForm'
import { DEFAULT_TRANSACTION_KIND } from '../../../constants/transaction'

export default function(state = DEFAULT_TRANSACTION_KIND, action) {
  return action.type === CHANGE_TRANSACTION_KIND ? action.kind : state
}
