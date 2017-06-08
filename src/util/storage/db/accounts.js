import PouchDB from 'pouchdb'

export default new PouchDB('accounts', { auto_compaction: true })
