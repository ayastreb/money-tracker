const types = {
  cash: 'Cash',
  bank: 'Bank Account',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

export function accountTypesAsDropdownOptions() {
  const options = []
  for (let key of Object.keys(types)) {
    options.push({
      key,
      value: key,
      text: types[key]
    })
  }

  return options
}
