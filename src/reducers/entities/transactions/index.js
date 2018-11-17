import { combineReducers } from 'redux';
import filter from './filter';
import recent from './recent';

export default combineReducers({
  filter,
  recent
});
