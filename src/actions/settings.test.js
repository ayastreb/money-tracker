import {
  LOAD_SETTINGS_REQUEST,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_FAILURE,
  loadSettings,
  UPDATE_EXCHANGE_RATE_REQUEST,
  UPDATE_EXCHANGE_RATE_SUCCESS,
  UPDATE_EXCHANGE_RATE_FAILURE,
  updateExchangeRate,
  COMPLETE_SETUP,
  completeSetup,
  CHANGE_CURRENCY,
  changeCurrency,
  TOGGLE_SECTION_COLLAPSE,
  toggleSectionCollapse,
  UPDATE_SYNC_SETTINGS,
  updateSyncSettings,
  START_SYNC
} from './settings'
import { mockStore, rejectPromise, resolvePromise } from '../util/test/helper'
import * as settings from '../util/storage/settings'
import * as currency from '../util/currency'

let store

beforeEach(() => (store = mockStore()))

describe('Loading settings', () => {
  it('creates LOAD_SETTINGS_SUCCESS after loading settings', () => {
    settings.retrieveSettings = jest.fn(resolvePromise({ foo: 'bar' }))

    return store.dispatch(loadSettings()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_SETTINGS_REQUEST },
        { type: LOAD_SETTINGS_SUCCESS, settings: { foo: 'bar' } }
      ])
    })
  })

  it('creates LOAD_SETTINGS_FAILURE when failed to load settings', () => {
    const error = new Error()
    settings.retrieveSettings = jest.fn(rejectPromise(error))

    return store.dispatch(loadSettings()).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOAD_SETTINGS_REQUEST },
        { type: LOAD_SETTINGS_FAILURE, error }
      ])
    })
  })
})

describe('Updating exchange rates', () => {
  it('merges secondary and used currency codes', () => {
    currency.fetchExchangeRates = jest.fn(
      resolvePromise({ USD: 1, EUR: 0.75, CAD: 1.351, JPY: 112.086 })
    )

    return store
      .dispatch(
        updateExchangeRate('USD', ['EUR', 'CAD'], ['USD', 'EUR', 'JPY'])
      )
      .then(() => {
        const updateAction = store
          .getActions()
          .find(action => action.type === UPDATE_EXCHANGE_RATE_REQUEST)
        expect(updateAction.target).toEqual(
          expect.arrayContaining(['USD', 'EUR', 'CAD', 'JPY'])
        )
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              type: UPDATE_EXCHANGE_RATE_SUCCESS,
              exchangeRate: { USD: 1, EUR: 0.75, CAD: 1.351, JPY: 112.086 }
            }
          ])
        )
      })
  })

  it('creates UPDATE_EXCHANGE_RATE_FAILURE when failed to fetch rates', () => {
    const error = new Error()
    currency.fetchExchangeRates = jest.fn(rejectPromise(error))

    return store.dispatch(updateExchangeRate('USD', [], [])).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([{ type: UPDATE_EXCHANGE_RATE_FAILURE, error }])
      )
    })
  })
})

describe('Completing initial setup', () => {
  it('creates COMPLETE_SETUP action', () => {
    expect(completeSetup()).toEqual({ type: COMPLETE_SETUP })
  })
})

describe('Changing base currency', () => {
  it('filters base currency from secondary currencies', () => {
    expect(changeCurrency('EUR', ['USD', 'EUR', 'JPY'], 'CAD')).toEqual({
      type: CHANGE_CURRENCY,
      base: 'EUR',
      secondary: ['USD', 'JPY', 'CAD']
    })
  })
})

describe('Toggling collapsed sections', () => {
  it('creates TOGGLE_SECTION_COLLAPSE action', () => {
    expect(toggleSectionCollapse('foo')).toEqual({
      type: TOGGLE_SECTION_COLLAPSE,
      section: 'foo'
    })
  })
})

describe('Updating sync settings', () => {
  it('creates UPDATE_SYNC_SETTINGS and START_SYNC actions', () => {
    return store
      .dispatch(updateSyncSettings({ host: 'test', databases: {} }))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: UPDATE_SYNC_SETTINGS,
            settings: { host: 'test', databases: {} }
          },
          {
            type: START_SYNC
          }
        ])
      })
  })
})
