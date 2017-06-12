import Storage from './pouchdb'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'

export async function retrieveSettings() {
  return Storage.settingsDB().get('settings').catch(err => {
    if (err.status !== 404) throw err
    return false
  })
}

export async function persistSettings(settings) {
  return Storage.settingsDB()
    .get('settings')
    .then(doc => Storage.settingsDB().put({ ...doc, ...settings }))
    .catch(err => {
      if (err.status !== 404) throw err
      return Storage.settingsDB().put({
        _id: 'settings',
        currency: { base: DEFAULT_BASE_CURRENCY, secondary: [] },
        exchangeRate: { [DEFAULT_BASE_CURRENCY]: 1 },
        ...settings
      })
    })
}
