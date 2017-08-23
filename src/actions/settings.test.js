import {
  loadSettings,
  completeSetup,
  changeCurrency,
  updateExchangeRate,
  toggleSectionCollapse
} from './settings'

jest.mock('../util/storage/settings', () => ({
  load: jest.fn().mockReturnValueOnce('load promise')
}))
jest.mock('../util/currency', () => ({
  fetchExchangeRates: jest.fn().mockReturnValueOnce('currency promise')
}))

it('creates load action', () => {
  expect(loadSettings()).toEqual({
    type: 'LOAD_SETTINGS',
    payload: 'load promise'
  })
})

it('creates complete setup action', () => {
  expect(completeSetup()).toEqual({
    type: 'COMPLETE_SETUP'
  })
})

it('filters base currency from secondary currencies', () => {
  expect(changeCurrency('EUR', ['USD', 'EUR', 'JPY'], 'CAD')).toEqual({
    type: 'CHANGE_CURRENCY',
    payload: {
      base: 'EUR',
      secondary: ['USD', 'JPY', 'CAD']
    }
  })
})

it('creates update exchange rate action', () => {
  expect(updateExchangeRate('USD', ['EUR'])).toEqual({
    type: 'UPDATE_EXCHANGE_RATE',
    payload: 'currency promise'
  })
})

it('creates toggle section action', () => {
  expect(toggleSectionCollapse('foo')).toEqual({
    type: 'TOGGLE_SECTION_COLLAPSE',
    payload: 'foo'
  })
})
