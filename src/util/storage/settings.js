import Storage from './pouchdb'

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
      return Storage.settingsDB().put({ _id: 'settings', ...settings })
    })
}
