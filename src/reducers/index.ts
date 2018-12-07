import { combineReducers } from 'redux';
import entities from './entities';
import ui from './ui';
import settings from './settings';
import user, { UserStateT } from 'features/user/state/User.reducer';

export interface RootStateT {
  user: UserStateT;
}

export default combineReducers({
  settings,
  entities,
  user,
  ui
});
