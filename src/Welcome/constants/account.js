export const ACCOUNT_TYPE = {
  cash: 'Cash',
  bank: 'Bank',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

export function accountTypesAsDropdownOptions() {
  const options = []
  for (let key of Object.keys(ACCOUNT_TYPE)) {
    options.push({
      key,
      value: key,
      text: ACCOUNT_TYPE[key]
    })
  }

  return options
}
