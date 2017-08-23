import reducer from './settings'
import {
  loadSettings,
  completeSetup,
  changeCurrency,
  updateExchangeRate,
  toggleSectionCollapse
} from '../actions/settings'
import { SUCCESS } from '../middleware/promise'

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

it('handles without initial state', () => {
  expect(reducer(undefined, { type: `${loadSettings}_${SUCCESS}` })).toEqual({
    isLoaded: true
  })
})

it('handles with initial state', () => {
  expect(
    reducer({ isLoaded: false }, { type: `${loadSettings}_${SUCCESS}` })
  ).toEqual({ isLoaded: true })
})

it('completes with not completed initial state', () => {
  expect(reducer({ isSetupComplete: false }, { type: completeSetup })).toEqual({
    isSetupComplete: true
  })
})

it('completes with completed initial state', () => {
  expect(reducer({ isSetupComplete: true }, { type: completeSetup })).toEqual({
    isSetupComplete: true
  })
})

it('changes currency with initial state', () => {
  expect(
    reducer(
      { currency: { base: 'EUR', secondary: ['JPY'] } },
      {
        type: changeCurrency,
        payload: {
          base: 'GBP',
          secondary: ['AUD', 'CAD']
        }
      }
    )
  ).toEqual({ currency: { base: 'GBP', secondary: ['AUD', 'CAD'] } })
})

it('updates exchange rate with initial state', () => {
  expect(
    reducer(
      { exchangeRate: { EUR: 1.0, JPY: 120.223 } },
      {
        type: `${updateExchangeRate}_${SUCCESS}`,
        payload: { USD: 1.0, JPY: 112.562 }
      }
    )
  ).toEqual({ exchangeRate: { USD: 1.0, JPY: 112.562 } })
})

it('collapses section if it is not yet collapsed', () => {
  expect(
    reducer(
      { collapsedSections: [] },
      { type: toggleSectionCollapse, payload: 'cash' }
    )
  ).toEqual({ collapsedSections: ['cash'] })
  expect(
    reducer(
      { collapsedSections: ['bank'] },
      { type: toggleSectionCollapse, payload: 'cash' }
    )
  ).toEqual({ collapsedSections: ['bank', 'cash'] })
})

it('un-collapses section if it is already collapsed', () => {
  expect(
    reducer(
      { collapsedSections: ['bank', 'cash'] },
      {
        type: toggleSectionCollapse,
        payload: 'bank'
      }
    )
  ).toEqual({ collapsedSections: ['cash'] })
})
