import PouchDB from 'pouchdb'

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
