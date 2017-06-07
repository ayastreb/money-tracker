export const DEFAULT_GROUP = 'cash'
export const ACCOUNT_GROUP = {
  cash: 'Cash',
  bank: 'Bank',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

export function accountGroupAsDropdownOptions() {
  return Object.keys(ACCOUNT_GROUP).map(key => ({
    key,
    value: key,
    text: ACCOUNT_GROUP[key]
  }))
}
