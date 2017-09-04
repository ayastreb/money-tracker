import { createActions } from 'redux-actions'

export const {
  changeName,
  changeGroup,
  changeCurrencyCheckbox,
  changeCurrencyBalance
} = createActions(
  'CHANGE_CURRENCY_CHECKBOX',
  'CHANGE_CURRENCY_BALANCE',
  'CHANGE_NAME',
  'CHANGE_GROUP'
)
