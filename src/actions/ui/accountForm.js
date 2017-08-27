import { createActions } from 'redux-actions'

export const {
  changeName,
  changeGroup,
  changeCurrencyCheckbox,
  changeCurrencyBalance
} = createActions(
  {
    CHANGE_CURRENCY_CHECKBOX: (code, isChecked) => ({ code, isChecked }),
    CHANGE_CURRENCY_BALANCE: (code, balance) => ({ code, balance })
  },
  'CHANGE_NAME',
  'CHANGE_GROUP'
)
