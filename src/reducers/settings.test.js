import reducer from './settings'
import {
  changeSettingsCurrency,
  loadSettingsSuccess,
  updateExchangeRateSuccess,
  toggleSectionCollapse,
  completeSetup
} from '../actions/settings'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    isLoaded: false,
    isSetupComplete: false,
    currency: {
      base: 'USD',
      secondary: []
    },
    exchangeRate: { USD: 1.0 },
    collapsedSections: []
  })
})

it('handles load settings success', () => {
  expect(
    reducer(
      { isLoaded: false, isSetupComplete: false },
      loadSettingsSuccess({ isSetupComplete: true })
    )
  ).toEqual({ isLoaded: true, isSetupComplete: true })
})

it('completes with not completed initial state', () => {
  expect(reducer({ isSetupComplete: false }, completeSetup())).toEqual({
    isSetupComplete: true
  })
})

it('completes with completed initial state', () => {
  expect(reducer({ isSetupComplete: true }, completeSetup())).toEqual({
    isSetupComplete: true
  })
})

it('changes currency with initial state', () => {
  expect(
    reducer(
      { currency: { base: 'EUR', secondary: ['JPY'] } },
      changeSettingsCurrency({ base: 'GBP', secondary: ['AUD', 'CAD'] })
    )
  ).toEqual({ currency: { base: 'GBP', secondary: ['AUD', 'CAD'] } })
})

it('updates exchange rate with initial state', () => {
  expect(
    reducer(
      { exchangeRate: { EUR: 1.0, JPY: 120.223 } },
      updateExchangeRateSuccess({ USD: 1.0, JPY: 112.562 })
    )
  ).toEqual({ exchangeRate: { USD: 1.0, JPY: 112.562 } })
})

it('collapses section if it is not yet collapsed', () => {
  expect(
    reducer({ collapsedSections: [] }, toggleSectionCollapse('cash'))
  ).toEqual({ collapsedSections: ['cash'] })
  expect(
    reducer({ collapsedSections: ['bank'] }, toggleSectionCollapse('cash'))
  ).toEqual({ collapsedSections: ['bank', 'cash'] })
})

it('un-collapses section if it is already collapsed', () => {
  expect(
    reducer(
      { collapsedSections: ['bank', 'cash'] },
      toggleSectionCollapse('bank')
    )
  ).toEqual({ collapsedSections: ['cash'] })
})
