export const ACCOUNT_TYPE = {
  cash: 'Cash',
  bank: 'Bank',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

export function accountTypesAsDropdownOptions() {
  return Object.keys(ACCOUNT_TYPE).map(key => ({
    key,
    value: key,
    text: ACCOUNT_TYPE[key]
  }))
}
