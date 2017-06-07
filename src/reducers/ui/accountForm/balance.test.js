import reducer from './balance'
import {
  CHANGE_CURRENCY_CHECKBOX,
  CHANGE_CURRENCY_BALANCE
} from '../../../actions/ui/accountForm'
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE
} from '../../../actions/accounts'
import { CHANGE_CURRENCY } from '../../../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('resets to initial state when account is created', () => {
  expect(reducer({ EUR: 100 }, { type: CREATE_ACCOUNT })).toEqual({})
})

it('restores form value when failed to persist account', () => {
  expect(
    reducer({}, { type: CREATE_ACCOUNT_FAILURE, balance: { USD: 125.99 } })
  ).toEqual({ USD: 125.99 })
})

describe('changing currency checkbox', () => {
  it('checks first checkbox', () => {
    expect(
      reducer(
        {},
        { type: CHANGE_CURRENCY_CHECKBOX, code: 'EUR', isChecked: true }
      )
    ).toEqual({ EUR: '' })
  })

  it('checks second checkbox', () => {
    expect(
      reducer(
        { EUR: 18 },
        { type: CHANGE_CURRENCY_CHECKBOX, code: 'USD', isChecked: true }
      )
    ).toEqual({ EUR: 18, USD: '' })
  })

  it('un-checks second checkbox', () => {
    expect(
      reducer(
        { EUR: 155, USD: 156 },
        { type: CHANGE_CURRENCY_CHECKBOX, code: 'USD', isChecked: false }
      )
    ).toEqual({ EUR: 155 })
  })

  it('does not allow to uncheck last checkbox', () => {
    expect(
      reducer(
        { EUR: 155 },
        { type: CHANGE_CURRENCY_CHECKBOX, code: 'EUR', isChecked: false }
      )
    ).toEqual({ EUR: 155 })
  })
})

describe('changing currency balance', () => {
  it('changes balance of unchecked currency', () => {
    expect(
      reducer({}, { type: CHANGE_CURRENCY_BALANCE, code: 'USD', balance: 200 })
    ).toEqual({
      USD: 200
    })
    expect(
      reducer(
        { USD: 200 },
        { type: CHANGE_CURRENCY_BALANCE, code: 'EUR', balance: 150 }
      )
    ).toEqual({
      USD: 200,
      EUR: 150
    })
  })

  it('changes balance of checked currency', () => {
    expect(
      reducer(
        { USD: 200 },
        { type: CHANGE_CURRENCY_BALANCE, code: 'USD', balance: 200.56 }
      )
    ).toEqual({
      USD: 200.56
    })
  })

  it('ignores empty input', () => {
    expect(
      reducer({}, { type: CHANGE_CURRENCY_BALANCE, code: 'USD', balance: '' })
    ).toEqual({})
  })
})

describe('changing currency settings', () => {
  it('filters out unused currencies', () => {
    expect(
      reducer(
        { USD: 100, JPY: 500 },
        { type: CHANGE_CURRENCY, base: 'USD', secondary: [] }
      )
    ).toEqual({
      USD: 100
    })

    expect(
      reducer(
        { EUR: 101, CAD: 102, AUD: 103 },
        { type: CHANGE_CURRENCY, base: 'USD', secondary: ['EUR', 'CAD'] }
      )
    ).toEqual({
      EUR: 101,
      CAD: 102
    })
  })
})
