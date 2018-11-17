import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  loadFilterTransactions,
  loadFilterTransactionsSuccess,
  loadRecentTransactions,
  loadRecentTransactionsSuccess,
  saveTransaction,
  saveTransactionSuccess,
  removeTransaction,
  removeTransactionSuccess
} from '../actions/entities/transactions';
import {
  changeFilterDate,
  applyFilters
} from '../actions/ui/transaction/filter';
import {
  fillInTransactionForm,
  resetTransactionForm
} from '../actions/ui/form/transaction';
import { getDefaultState } from '../selectors/ui/form/transaction';
import { getFilters } from '../selectors/ui/transaction/filter';
import getAccountsMutations from '../entities/Transaction/AccountMutations';
import { updateAccountBalanceSaga } from './accounts';
import { updateTagsUsage } from './tags';
import TransactionsStorage from '../util/storage/transactions';

export function* resetTransactionFormSaga() {
  const initialData = yield select(getDefaultState);
  yield put(fillInTransactionForm(initialData));
}

export function* loadFilterTransactionsSaga() {
  const filters = yield select(getFilters);
  const transactions = yield call(TransactionsStorage.loadFiltered, filters);
  yield put(loadFilterTransactionsSuccess(transactions));
}

export function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent);
  yield put(loadRecentTransactionsSuccess(transactions));
}

export function* removeTransactionSaga(action) {
  const prev = yield call(TransactionsStorage.remove, action.payload);

  yield call(updateAccountsBalance, prev);
  yield call(updateTagsUsage, prev);
  yield call(loadRecentTransactionsSaga);
  yield call(loadFilterTransactionsSaga);
  yield call(resetTransactionFormSaga);
  yield put(removeTransactionSuccess());
}

export function* saveTransactionSaga(action) {
  const next = action.payload;
  const prev = yield call(TransactionsStorage.remove, next.id);
  next.id = `T${next.date}-${Date.now()}`;

  yield call(TransactionsStorage.save, next);
  yield call(updateAccountsBalance, prev, next);
  yield call(updateTagsUsage, prev, next);
  yield call(loadRecentTransactionsSaga);
  yield call(loadFilterTransactionsSaga);
  yield call(resetTransactionFormSaga);
  yield put(saveTransactionSuccess());
}

function* updateAccountsBalance(prev, next) {
  for (const mutation of getAccountsMutations(prev, next)) {
    yield call(updateAccountBalanceSaga, mutation);
  }
}

export default [
  takeLatest(resetTransactionForm, resetTransactionFormSaga),
  takeLatest(loadFilterTransactions, loadFilterTransactionsSaga),
  takeLatest(changeFilterDate, loadFilterTransactionsSaga),
  takeLatest(applyFilters, loadFilterTransactionsSaga),
  takeLatest(loadRecentTransactions, loadRecentTransactionsSaga),
  takeLatest(removeTransaction, removeTransactionSaga),
  takeLatest(saveTransaction, saveTransactionSaga)
];
