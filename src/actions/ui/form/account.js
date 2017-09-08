import { createActions } from 'redux-actions'

export const {
  fillInAccountForm,
  resetAccountForm,
  changeName,
  changeGroup,
  changeBalance,
  toggleCurrency,
  toggleOnDashboard
} = createActions(
  'FILL_IN_ACCOUNT_FORM',
  'RESET_ACCOUNT_FORM',
  'CHANGE_NAME',
  'CHANGE_GROUP',
  'CHANGE_BALANCE',
  'TOGGLE_CURRENCY',
  'TOGGLE_ON_DASHBOARD'
)
