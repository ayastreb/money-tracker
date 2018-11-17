import { combineReducers } from 'redux';
import form from './form';
import report from './report';
import transaction from './transaction';
import dataImport from './dataImport';
import isMobile from './isMobile';
import isSidebarOpen from './isSidebarOpen';
import settings from './settings';
import sync from './sync';

export default combineReducers({
  form,
  report,
  transaction,
  dataImport,
  settings,
  sync,
  isMobile,
  isSidebarOpen
});
