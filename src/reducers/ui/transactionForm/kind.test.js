import reducer from './kind'
import {
  DEFAULT_TRANSACTION_KIND,
  EXPENSE_TRANSACTION,
  INCOME_TRANSACTION
} from '../../../constants/transaction'
import { CHANGE_TRANSACTION_KIND } from '../../../actions/ui/transactionForm'

it('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual(DEFAULT_TRANSACTION_KIND)
})

it('should update transaction type', () => {
  expect(
    reducer(EXPENSE_TRANSACTION, {
      type: CHANGE_TRANSACTION_KIND,
      kind: INCOME_TRANSACTION
    })
  ).toEqual(INCOME_TRANSACTION)
})
