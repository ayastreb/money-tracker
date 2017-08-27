import reducer from './balance'
import {
  changeCurrencyCheckbox,
  changeCurrencyBalance
} from '../../../actions/ui/accountForm'
import {
  saveAccountRequest,
  saveAccountFailure
} from '../../../actions/accounts'
import { changeCurrency } from '../../../actions/settings'
import Account from '../../../models/Account'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({})
})

it('resets to initial state when account is created', () => {
  expect(reducer({ EUR: 100 }, saveAccountRequest())).toEqual({})
})

it('restores form value when failed to persist account', () => {
  expect(
    reducer({}, saveAccountFailure(new Account({ balance: { USD: 12599 } })))
  ).toEqual({ USD: '125.99' })
})

describe('changing currency checkbox', () => {
  it('checks first checkbox', () => {
    expect(reducer({}, changeCurrencyCheckbox('EUR', true))).toEqual({
      EUR: ''
    })
  })

  it('checks second checkbox', () => {
    expect(reducer({ EUR: 18 }, changeCurrencyCheckbox('USD', true))).toEqual({
      EUR: 18,
      USD: ''
    })
  })

  it('un-checks second checkbox', () => {
    expect(
      reducer({ EUR: 155, USD: 156 }, changeCurrencyCheckbox('USD', false))
    ).toEqual({ EUR: 155 })
  })

  it('does not allow to uncheck last checkbox', () => {
    expect(
      reducer({ EUR: 155 }, changeCurrencyCheckbox('EUR', false))
    ).toEqual({ EUR: 155 })
  })
})

describe('changing currency balance', () => {
  it('changes balance of unchecked currency', () => {
    expect(reducer({}, changeCurrencyBalance('USD', 200))).toEqual({
      USD: 200
    })
    expect(reducer({ USD: 200 }, changeCurrencyBalance('EUR', 150))).toEqual({
      USD: 200,
      EUR: 150
    })
  })

  it('changes balance of checked currency', () => {
    expect(
      reducer({ USD: 200 }, changeCurrencyBalance('USD', 200.56))
    ).toEqual({
      USD: 200.56
    })
  })
})

describe('changing currency settings', () => {
  it('filters out unused currencies', () => {
    expect(reducer({ USD: 100, JPY: 500 }, changeCurrency('USD', []))).toEqual({
      USD: 100
    })

    expect(
      reducer(
        { EUR: 101, CAD: 102, AUD: 103 },
        changeCurrency('USD', ['EUR', 'CAD'])
      )
    ).toEqual({
      EUR: 101,
      CAD: 102
    })
  })
})
