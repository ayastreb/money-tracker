import { takeLatest } from 'redux-saga/effects';
import { bootstrap } from '../actions/app';
import { isUserLoggedIn, isDemoUser } from 'features/user/state/User.saga';
import { loadSetting } from './settings';
import { syncSaga } from './sync';

export function* bootstrapSaga() {
  yield isDemoUser();
  yield isUserLoggedIn();
  yield loadSetting();
  yield syncSaga();
}

export default [takeLatest(bootstrap, bootstrapSaga)];
