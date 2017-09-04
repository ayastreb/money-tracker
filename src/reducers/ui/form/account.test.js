import reducer from './account'

import {
  changeGroup,
  changeName,
  changeCurrencyCheckbox,
  changeCurrencyBalance
} from '../../../actions/ui/form/account.js'
import {
  saveAccount,
  saveAccountFailure
} from '../../../actions/entities/accounts'
import { changeSettingsCurrency } from '../../../actions/settings'
import Account from '../../../entities/Account'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    name: '',
    group: Account.defaultGroup,
    balance: {}
  })
})

it('resets to initial state when account is created', () => {
  expect(
    reducer(
      { name: 'foo', group: 'bank', balance: { EUR: 100 } },
      saveAccount()
    )
  ).toEqual({
    name: '',
    group: Account.defaultGroup,
    balance: {}
  })
})

it('restores form value when failed to persist account', () => {
  expect(
    reducer(
      {},
      saveAccountFailure({
        name: 'foo',
        group: 'bank',
        balance: { USD: 12599 }
      })
    )
  ).toEqual({
    name: 'foo',
    group: 'bank',
    balance: { USD: '125.99' }
  })
})

it('changes account form group', () => {
  expect(reducer({ group: 'cash' }, changeGroup('bank'))).toEqual({
    group: 'bank'
  })
})

it('changes account form name', () => {
  expect(reducer({ name: 'foo' }, changeName('bar'))).toEqual({ name: 'bar' })
})

describe('changing currency checkbox', () => {
  it('checks first checkbox', () => {
    expect(
      reducer(
        { balance: {} },
        changeCurrencyCheckbox({ code: 'EUR', isChecked: true })
      )
    ).toEqual({
      balance: { EUR: '' }
    })
  })

  it('checks second checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 18 } },
        changeCurrencyCheckbox({ code: 'USD', isChecked: true })
      )
    ).toEqual({
      balance: {
        EUR: 18,
        USD: ''
      }
    })
  })

  it('un-checks second checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 155, USD: 156 } },
        changeCurrencyCheckbox({ code: 'USD', isChecked: false })
      )
    ).toEqual({ balance: { EUR: 155 } })
  })

  it('does not allow to uncheck last checkbox', () => {
    expect(
      reducer(
        { balance: { EUR: 155 } },
        changeCurrencyCheckbox({ code: 'EUR', isChecked: false })
      )
    ).toEqual({ balance: { EUR: 155 } })
  })
})

describe('changing currency balance', () => {
  it('changes balance of unchecked currency', () => {
    expect(
      reducer(
        { balance: {} },
        changeCurrencyBalance({ code: 'USD', balance: 200 })
      )
    ).toEqual({
      balance: { USD: 200 }
    })
    expect(
      reducer(
        { balance: { USD: 200 } },
        changeCurrencyBalance({ code: 'EUR', balance: 150 })
      )
    ).toEqual({
      balance: {
        USD: 200,
        EUR: 150
      }
    })
  })

  fit('changes balance of checked currency', () => {
    expect(
      reducer(
        { balance: { USD: 200 } },
        changeCurrencyBalance({ code: 'USD', balance: 200.56 })
      )
    ).toEqual({
      balance: { USD: 200.56 }
    })
  })
})

describe('changing currency settings', () => {
  it('filters out unused currencies', () => {
    expect(
      reducer(
        { balance: { USD: 100, JPY: 500 } },
        changeSettingsCurrency({ base: 'USD', secondary: [] })
      )
    ).toEqual({
      balance: { USD: 100 }
    })

    expect(
      reducer(
        { balance: { EUR: 101, CAD: 102, AUD: 103 } },
        changeSettingsCurrency({ base: 'USD', secondary: ['EUR', 'CAD'] })
      )
    ).toEqual({
      balance: {
        EUR: 101,
        CAD: 102
      }
    })
  })
})
