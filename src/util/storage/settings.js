import union from 'lodash/union';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import { settingsDB, remoteSettingsDB, destroySettingsDB } from './pouchdb';
import { fetchExchangeRates } from '../currency';
import Currency from '../../entities/Currency';

export default {
  load,
  save,
  saveLocal,
  destroy
};

const defaultLocalSettings = {
  _id: '_local/settings',
  collapsedSections: []
};
const defaultSettings = {
  _id: 'settings',
  currency: { base: Currency.defaultBase, secondary: [] },
  exchangeRate: { [Currency.defaultBase]: 1 }
};

function destroy() {
  return destroySettingsDB();
}

async function save(settings) {
  if (remoteSettingsDB()) {
    await remoteSettingsDB()
      .get('settings')
      .then(remote => remote, err => defaultSettings)
      .then(doc => remoteSettingsDB().put({ ...doc, ...settings }))
      .catch(error => {
        if (error.status !== 403) throw error;
      });
  }

  return settingsDB()
    .get('settings')
    .then(local => local, err => defaultSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }));
}

function saveLocal(settings) {
  return settingsDB()
    .get('_local/settings')
    .then(doc => doc, err => defaultLocalSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }));
}

function load() {
  return settingsDB()
    .get('_local/settings')
    .then(local => local, err => defaultLocalSettings)
    .then(local => mergeLocalWithSyncedSettings(local));
}

async function mergeLocalWithSyncedSettings(local) {
  return settingsDB()
    .get('settings')
    .then(settings => settings, err => defaultSettings)
    .then(settings => syncSettings(settings))
    .then(settings => ({ ...settings, ...local }));
}

async function syncSettings(settings) {
  if (!remoteSettingsDB()) return settings;

  try {
    const remote = await remoteSettingsDB().get('settings');
    const base = remote.currency.base;
    const secondary = union(
      settings.currency.base,
      settings.currency.secondary,
      remote.currency.secondary
    ).filter(code => code !== base);

    const synced = {
      currency: { base, secondary },
      exchangeRate:
        settings.currency.base === base
          ? { ...settings.exchangeRate, ...remote.exchangeRate }
          : await fetchExchangeRates(base, secondary),
      isSetupComplete: remote.isSetupComplete
    };

    if (!isEqual(pick(settings, Object.keys(synced)), synced)) {
      await save(synced);
    }

    return synced;
  } catch (error) {
    return settings;
  }
}
