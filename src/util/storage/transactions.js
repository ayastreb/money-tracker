import omit from 'lodash/omit'
import { transactionsDB, remoteTransactionsDB } from './pouchdb'
import { RECENT_TRANSACTIONS_LIMIT } from '../../constants/transaction'

export async function syncTransactions() {
  if (!remoteTransactionsDB()) return
  let transactions

  const from = await transactionsDB().replicate.from(remoteTransactionsDB())
  if (from.docs_written > 0) transactions = await retrieveRecentTransactions()

  await transactionsDB().replicate.to(remoteTransactionsDB())

  return transactions
}

export async function retrieveRecentTransactions(
  limit = RECENT_TRANSACTIONS_LIMIT
) {
  return transactionsDB()
    .allDocs({
      include_docs: true,
      descending: true,
      limit
    })
    .then(response =>
      response.rows.map(row => ({
        id: row.doc._id,
        ...omit(row.doc, '_id', '_rev')
      }))
    )
}

export async function persistTransaction(data) {
  const transaction = omit(data, 'id')
  return transactionsDB()
    .get(data.id)
    .then(doc => transactionsDB().put({ ...doc, ...transaction }))
    .catch(err => {
      if (err.status !== 404) throw err

      return transactionsDB().put({ _id: data.id, ...transaction })
    })
}
