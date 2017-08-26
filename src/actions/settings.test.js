import {
  changeCurrency,
  loadSettingsSuccess,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} from './settings'

it('filters base currency from secondary currencies', () => {
  expect(changeCurrency('EUR', ['USD', 'EUR', 'JPY'], 'CAD')).toEqual({
    type: 'CHANGE_CURRENCY',
    payload: {
      base: 'EUR',
      secondary: ['USD', 'JPY', 'CAD']
    }
  })
})

it('creates load success action', () => {
  expect(loadSettingsSuccess('foo')).toEqual({
    type: 'LOAD_SETTINGS_SUCCESS',
    payload: 'foo'
  })
})

it('creates update exchange rate success action', () => {
  expect(updateExchangeRateSuccess('foo')).toEqual({
    type: 'UPDATE_EXCHANGE_RATE_SUCCESS',
    payload: 'foo'
  })
})

it('creates toggle section action', () => {
  expect(toggleSectionCollapse('foo')).toEqual({
    type: 'TOGGLE_SECTION_COLLAPSE',
    payload: 'foo'
  })
})

it('creates complete setup action', () => {
  expect(completeSetup()).toEqual({
    type: 'COMPLETE_SETUP'
  })
})
