import PouchDB from 'pouchdb'

export default new PouchDB('settings', { auto_compaction: true })
