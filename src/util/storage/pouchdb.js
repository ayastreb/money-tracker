import PouchDB from 'pouchdb'

export default (() => {
  const instancePool = {}

  function instance(name) {
    if (instancePool[name] === undefined) {
      instancePool[name] = new PouchDB(name, { auto_compaction: true })
    }

    return instancePool[name]
  }

  return {
    settingsDB: () => instance('settings'),
    accountsDB: () => instance('accounts')
  }
})()
