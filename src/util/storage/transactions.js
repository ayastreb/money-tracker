import {
  transactionsDB,
  remoteTransactionsDB,
  destroyTransactionsDB
} from './pouchdb'
import Transaction from '../../entities/Transaction'
import intersection from 'lodash/intersection'

export default {
  sync,
  load,
  loadFiltered,
  loadRecent,
  save,
  remove,
  removeByAccount,
  destroy
}

async function sync() {
  if (!remoteTransactionsDB()) return

  await transactionsDB().replicate.from(remoteTransactionsDB())
  await transactionsDB().replicate.to(remoteTransactionsDB())
}

function destroy() {
  return destroyTransactionsDB()
}

function load(id) {
  return transactionsDB()
    .get(id)
    .catch(error => {
      if (error.status !== 404) throw error
      return undefined
    })
}

function loadFiltered(filters) {
  return transactionsDB()
    .createIndex({ index: { fields: ['date'] } })
    .then(() => findByDate(filters.date.start, filters.date.end))
    .then(docs => filterByAccount(docs, filters.accounts))
    .then(docs => filterByTags(docs, filters.tags))
    .then(docs => docs.map(doc => Transaction.fromStorage(doc)))
}

function findByDate(start, end) {
  return transactionsDB()
    .find({
      selector: {
        $and: [{ date: { $gte: start } }, { date: { $lte: end } }]
      },
      sort: [{ date: 'desc' }]
    })
    .then(response => response.docs)
}

/**
 * Filter transactions by account.
 *
 * @param {array} transactions
 * @param {Set} accounts
 * @return {array}
 */
function filterByAccount(transactions, accounts) {
  return accounts.size > 0
    ? transactions.filter(
        tx => accounts.has(tx.accountId) || accounts.has(tx.linkedAccountId)
      )
    : transactions
}

/**
 * Filter transactions by tag.
 *
 * @param {array} transactions
 * @param {array} tags
 * @return {array}
 */
function filterByTags(transactions, tags) {
  return tags.length > 0
    ? transactions.filter(tx => intersection(tx.tags, tags).length > 0)
    : transactions
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
