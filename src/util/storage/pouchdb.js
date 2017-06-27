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

export const settingsDB = () => instance('settings')
export const accountsDB = () => instance('accounts')
export const transactionsDB = () => instance('transactions')
export const tagsDB = () => instance('tags')
