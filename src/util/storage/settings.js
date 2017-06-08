import SettingsDB from './db/settings'

export async function retrieveSettings() {
  return SettingsDB.get('settings').catch(err => {
    if (err.status !== 404) throw err
    return false
  })
}

export async function persistSettings(settings) {
  return SettingsDB.get('settings')
    .then(doc => SettingsDB.put({ ...doc, ...settings }))
    .catch(err => {
      if (err.status !== 404) throw err
      return SettingsDB.put({ _id: 'settings', ...settings })
    })
}
