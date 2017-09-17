import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

const instancePool = {}

function instance(name) {
  if (instancePool[name] === undefined) {
    instancePool[name] = new PouchDB(name, { auto_compaction: true })
  }

  return instancePool[name]
}

function remoteInstance(name) {
  const instanceName = `remote_${name}`
  if (instancePool[instanceName] === undefined) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
      instancePool[instanceName] = new PouchDB(userInfo.couchDB[name], {
        skipSetup: true,
        auth: {
          username: userInfo.couchDB.username,
          password: userInfo.couchDB.password
        }
      })
    }
  }

  return instancePool[instanceName]
}

export const settingsDB = () => instance('settings')
export const accountsDB = () => instance('accounts')
export const transactionsDB = () => instance('transactions')
export const tagsDB = () => instance('tags')
export const remoteSettingsDB = () => remoteInstance('settings')
export const remoteAccountsDB = () => remoteInstance('accounts')
export const remoteTransactionsDB = () => remoteInstance('transactions')
export const remoteTagsDB = () => remoteInstance('tags')
