import { takeLatest, call, put, select } from 'redux-saga/effects';
import union from 'lodash/union';
import {
  loadSettingsSuccess,
  changeSettingsCurrency,
  updateExchangeRate,
  updateExchangeRateSuccess,
  updateExchangeRateFailure,
  completeSetup,
  toggleSectionCollapse
} from '../actions/settings';
import {
  getCollapsedSections,
  getBaseCurrency,
  getSecondaryCurrency
} from '../selectors/settings';
import { getAccountsCurrencyList } from '../selectors/entities/accounts';
import SettingsStorage from '../util/storage/settings';
import { fetchExchangeRates } from '../util/currency';

export function* loadSetting() {
  const settings = yield call(SettingsStorage.load);
  yield put(loadSettingsSuccess(settings));
}

export function* updateCurrencySaga() {
  const base = yield select(getBaseCurrency);
  const secondary = yield select(getSecondaryCurrency);
  const used = yield select(getAccountsCurrencyList);
  try {
    const exchangeRate = yield call(
      fetchExchangeRates,
      base,
      union(secondary, used)
    );
    yield put(updateExchangeRateSuccess(exchangeRate));
    yield call(SettingsStorage.save, {
      currency: { base, secondary },
      exchangeRate
    });
  } catch (error) {
    yield put(updateExchangeRateFailure(error));
  }
}

export function* completeSetupSaga() {
  yield call(SettingsStorage.save, { isSetupComplete: true });
}

export function* saveCollapsedSectionsSaga() {
  const collapsedSections = yield select(getCollapsedSections);
  yield call(SettingsStorage.saveLocal, { collapsedSections });
}

export default [
  takeLatest(changeSettingsCurrency, updateCurrencySaga),
  takeLatest(updateExchangeRate, updateCurrencySaga),
  takeLatest(completeSetup, completeSetupSaga),
  takeLatest(toggleSectionCollapse, saveCollapsedSectionsSaga)
];
