import {
  LOAD_SETTINGS_REQUEST,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_FAILURE,
  loadSettings,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  updateSettings,
  UPDATE_EXCHANGE_RATE_REQUEST,
  UPDATE_EXCHANGE_RATE_SUCCESS,
  UPDATE_EXCHANGE_RATE_FAILURE,
  updateExchangeRate,
  COMPLETE_SETUP,
  completeSetup,
  CHANGE_CURRENCY,
  changeCurrency
} from './settings'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as settings from '../storage/settings'
import * as currency from '../util/currency'

const mockStore = configureMockStore([thunk])
const rejectPromise = error => () => new Promise((_, reject) => reject(error))
const resolvePromise = data => () => new Promise(resolve => resolve(data))
let store

beforeEach(() => {
  store = mockStore()
})

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

describe('Updating settings', () => {
  it('creates UPDATE_SETTINGS_SUCCESS after persisting settings', () => {
    settings.persistSettings = jest.fn(resolvePromise(true))

    return store.dispatch(updateSettings({ foo: 'bar' })).then(() => {
      expect(store.getActions()).toEqual([
        { type: UPDATE_SETTINGS_REQUEST },
        { type: UPDATE_SETTINGS_SUCCESS }
      ])
    })
  })

  it('creates UPDATE_SETTINGS_FAILURE when failed to persist settings', () => {
    const error = new Error()
    settings.persistSettings = jest.fn(rejectPromise(error))

    return store.dispatch(updateSettings({ foo: 'bar' })).then(() => {
      expect(store.getActions()).toEqual([
        { type: UPDATE_SETTINGS_REQUEST },
        { type: UPDATE_SETTINGS_FAILURE, error }
      ])
    })
  })
})

describe('Updating exchange rates', () => {
  it('creates UPDATE_EXCHANGE_RATE_SUCCESS after fetching rates', () => {
    currency.fetchExchangeRates = jest.fn(resolvePromise({ USD: 1, EUR: 0.75 }))

    return store.dispatch(updateExchangeRate('USD', ['EUR'])).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: UPDATE_EXCHANGE_RATE_REQUEST },
          {
            type: UPDATE_EXCHANGE_RATE_SUCCESS,
            exchangeRate: { USD: 1, EUR: 0.75 }
          },
          { type: UPDATE_SETTINGS_REQUEST }
        ])
      )
    })
  })

  it('creates UPDATE_EXCHANGE_RATE_FAILURE when failed to fetch rates', () => {
    const error = new Error()
    currency.fetchExchangeRates = jest.fn(rejectPromise(error))

    return store.dispatch(updateExchangeRate('USD', ['EUR'])).then(() => {
      expect(store.getActions()).toEqual([
        { type: UPDATE_EXCHANGE_RATE_REQUEST },
        { type: UPDATE_EXCHANGE_RATE_FAILURE, error }
      ])
    })
  })
})

describe('Completing initial setup', () => {
  it('creates COMPLETE_SETUP action', () => {
    settings.persistSettings = jest.fn(resolvePromise(true))

    return store.dispatch(completeSetup()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([{ type: COMPLETE_SETUP }])
      )
    })
  })
})

describe('Changing base currency', () => {
  it('filters base currency from secondary currencies', () => {
    settings.persistSettings = jest.fn(resolvePromise(true))
    currency.fetchExchangeRates = jest.fn(resolvePromise({}))

    return store
      .dispatch(changeCurrency('EUR', ['USD', 'EUR', 'JPY']))
      .then(() => {
        const changeAction = store
          .getActions()
          .find(action => action.type === CHANGE_CURRENCY)
        expect(changeAction.base).toEqual('EUR')
        expect(changeAction.secondary).toEqual(['USD', 'JPY'])
      })
  })

  it('creates UPDATE_EXCHANGE_RATE_SUCCESS action after fetching rates', () => {
    settings.persistSettings = jest.fn(resolvePromise(true))
    currency.fetchExchangeRates = jest.fn(resolvePromise({ USD: 1, EUR: 0.75 }))

    return store.dispatch(changeCurrency('USD', ['EUR'])).then(() => {
      const updateRatesAction = store
        .getActions()
        .find(action => action.type === UPDATE_EXCHANGE_RATE_SUCCESS)
      expect(updateRatesAction.exchangeRate).toEqual({ USD: 1, EUR: 0.75 })
    })
  })
})
