import {
  loadRecentTransactionsSuccess,
  saveTransactionRequest,
  saveTransactionSuccess
} from './transactions'

it('creates load recent transactions success action', () => {
  expect(loadRecentTransactionsSuccess('foo')).toEqual({
    type: 'LOAD_RECENT_TRANSACTIONS_SUCCESS',
    payload: 'foo'
  })
})

it('creates save transaction request action', () => {
  expect(saveTransactionRequest('foo')).toEqual({
    type: 'SAVE_TRANSACTION_REQUEST',
    payload: 'foo'
  })
})

it('creates save transaction success action', () => {
  expect(saveTransactionSuccess('foo')).toEqual({
    type: 'SAVE_TRANSACTION_SUCCESS',
    payload: 'foo'
  })
})
