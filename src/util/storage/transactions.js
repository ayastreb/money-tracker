import omit from 'lodash/omit'
import { transactionsDB } from './pouchdb'

export async function retrieveRecentTransactions(limit) {
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
