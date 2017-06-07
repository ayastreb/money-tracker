export const CHANGE_NAME = 'CHANGE_NAME'
export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name
  }
}

export const CHANGE_GROUP = 'CHANGE_GROUP'
export function changeGroup(group) {
  return {
    type: CHANGE_GROUP,
    group
  }
}

export const CHANGE_CURRENCY_CHECKBOX = 'CHANGE_CURRENCY_CHECKBOX'
export function changeCurrencyCheckbox(code, isChecked) {
  return {
    type: CHANGE_CURRENCY_CHECKBOX,
    code,
    isChecked
  }
}

export const CHANGE_CURRENCY_BALANCE = 'CHANGE_CURRENCY_BALANCE'
export function changeCurrencyBalance(code, balance) {
  return {
    type: CHANGE_CURRENCY_BALANCE,
    code,
    balance
  }
}
