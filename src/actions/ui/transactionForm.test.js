import {CHANGE_TRANSACTION_KIND, changeTransactionKind} from "./transactionForm"

it('should create CHANGE_TRANSACTION_KIND action', () => {
  expect(changeTransactionKind('transfer')).toEqual({
    type: CHANGE_TRANSACTION_KIND,
    kind: 'transfer'
  })
})
