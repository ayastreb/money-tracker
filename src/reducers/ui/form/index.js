import { combineReducers } from 'redux';
import account from './account';
import transaction from './transaction';

export default combineReducers({ account, transaction });
