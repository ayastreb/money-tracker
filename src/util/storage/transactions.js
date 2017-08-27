import { transactionsDB, remoteTransactionsDB } from './pouchdb'
import Transaction from '../../models/Transaction'

export default {
  sync,
  loadRecent,
  save
}

async function sync() {
  if (!remoteTransactionsDB()) return

  await transactionsDB().replicate.from(remoteTransactionsDB())
  await transactionsDB().replicate.to(remoteTransactionsDB())
}

function loadRecent(limit = Transaction.recentListLimit) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      limit
    })
    .then(response =>
      response.rows.map(row => new Transaction({ id: row.doc._id, ...row.doc }))
    )
}

function save(transaction) {
  return transactionsDB()
    .get(transaction.id)
    .then(doc => transactionsDB().put({ ...doc, ...transaction.toJSON() }))
    .catch(err => {
      if (err.status !== 404) throw err

      return transactionsDB().put({
        _id: transaction.id,
        ...transaction.toJSON()
      })
    })
}
