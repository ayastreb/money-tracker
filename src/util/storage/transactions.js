import { transactionsDB, remoteTransactionsDB } from './pouchdb'
import Transaction from '../../entities/Transaction'

export default {
  sync,
  load,
  loadRecent,
  save,
  remove,
  removeByAccount
}

async function sync() {
  if (!remoteTransactionsDB()) return

  await transactionsDB().replicate.from(remoteTransactionsDB())
  await transactionsDB().replicate.to(remoteTransactionsDB())
}

function load(id) {
  return transactionsDB()
    .get(id)
    .catch(error => {
      if (error.status !== 404) throw error
      return undefined
    })
}

function loadRecent(limit = Transaction.recentListLimit) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      startkey: 'T\uffff',
      endkey: 'T',
      limit
    })
    .then(response =>
      response.rows.map(row => Transaction.fromStorage(row.doc))
    )
}

function save(transaction) {
  return transactionsDB()
    .get(transaction.id)
    .then(doc =>
      transactionsDB().put({ ...doc, ...Transaction.toStorage(transaction) })
    )
    .catch(err => {
      if (err.status !== 404) throw err

      return transactionsDB().put({
        _id: transaction.id,
        ...Transaction.toStorage(transaction)
      })
    })
}

function remove(id) {
  return transactionsDB()
    .get(id)
    .then(doc => transactionsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}

function removeByAccount(accountId) {
  return transactionsDB()
    .createIndex({
      index: {
        fields: ['accountId']
      }
    })
    .then(() => transactionsDB().find({ selector: { accountId } }))
    .then(response =>
      Promise.all(
        response.docs.map(doc =>
          transactionsDB().put({ ...doc, _deleted: true })
        )
      )
    )
}
