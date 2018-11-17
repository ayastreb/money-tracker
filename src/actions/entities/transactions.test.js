import {
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess
} from './transactions';

it('creates load recent transactions action', () => {
  expect(loadRecentTransactions()).toEqual({
    type: 'LOAD_RECENT_TRANSACTIONS'
  });
});

it('creates load recent transactions success action', () => {
  expect(loadRecentTransactionsSuccess('foo')).toEqual({
    type: 'LOAD_RECENT_TRANSACTIONS_SUCCESS',
    payload: 'foo'
  });
});

it('creates save transaction action', () => {
  expect(saveTransaction('foo')).toEqual({
    type: 'SAVE_TRANSACTION',
    payload: 'foo'
  });
});

it('creates save transaction success action', () => {
  expect(saveTransactionSuccess('foo')).toEqual({
    type: 'SAVE_TRANSACTION_SUCCESS',
    payload: 'foo'
  });
});
