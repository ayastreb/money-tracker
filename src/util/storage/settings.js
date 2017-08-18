import { settingsDB, remoteSettingsDB } from './pouchdb'
import { fetchExchangeRates } from '../currency'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'
import union from 'lodash/union'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'

const defaultLocalSettings = {
  _id: '_local/settings',
  collapsedSections: []
}
const defaultSettings = {
  _id: 'settings',
  currency: { base: DEFAULT_BASE_CURRENCY, secondary: [] },
  exchangeRate: { [DEFAULT_BASE_CURRENCY]: 1 }
}

export async function persistLocalSettings(settings) {
  return settingsDB()
    .get('_local/settings')
    .then(doc => doc, err => defaultLocalSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }))
}

export async function persistSettings(settings) {
  if (remoteSettingsDB()) {
    await remoteSettingsDB()
      .get('settings')
      .then(remote => remote, err => defaultSettings)
      .then(doc => remoteSettingsDB().put({ ...doc, ...settings }))
  }

  return settingsDB()
    .get('settings')
    .then(local => local, err => defaultSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }))
}

export async function retrieveSettings() {
  return settingsDB()
    .get('_local/settings')
    .then(local => local, err => defaultLocalSettings)
    .then(local => mergeLocalWithSyncedSettings(local))
}

async function mergeLocalWithSyncedSettings(local) {
  return settingsDB()
    .get('settings')
    .then(settings => settings, err => defaultSettings)
    .then(settings => syncSettings(settings))
    .then(settings => ({ ...settings, ...local }))
}

async function syncSettings(settings) {
  if (!remoteSettingsDB()) return settings

  const remote = await remoteSettingsDB().get('settings')
  const base = remote.currency.base
  const secondary = union(
    settings.currency.base,
    settings.currency.secondary,
    remote.currency.secondary
  ).filter(code => code !== base)

  const synced = {
    currency: { base, secondary },
    exchangeRate: settings.currency.base === base
      ? { ...settings.exchangeRate, ...remote.exchangeRate }
      : await fetchExchangeRates(base, secondary),
    isSetupComplete: remote.isSetupComplete
  }

  if (!isEqual(pick(settings, Object.keys(synced)), synced)) {
    await persistSettings(synced)
  }

  return synced
}
