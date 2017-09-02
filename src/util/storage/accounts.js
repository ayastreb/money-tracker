import { accountsDB, remoteAccountsDB } from './pouchdb'
import Account from '../../entities/Account'

export default {
  sync,
  loadAll,
  save,
  changeBalance,
  remove
}

async function sync() {
  if (!remoteAccountsDB()) return
  let accounts

  const from = await accountsDB().replicate.from(remoteAccountsDB())
  if (from.docs_written > 0) {
    accounts = await loadAll()
    updateLastSyncedBalance(accounts)
  }

  const to = await accountsDB().replicate.to(remoteAccountsDB())
  if (to.docs_written > 0) {
    accounts = await loadAll()
    updateLastSyncedBalance(accounts)
  }
}

function loadAll() {
  return accountsDB()
    .allDocs({ include_docs: true, conflicts: true })
    .then(response => Promise.all(response.rows.map(resolveConflicts)))
    .then(docs => docs.map(Account.fromStorage))
}

function save(account) {
  return accountsDB()
    .get(account.id)
    .then(doc => accountsDB().put({ ...doc, ...Account.toStorage(account) }))
    .catch(err => {
      if (err.status !== 404) throw err
      return accountsDB().put({
        _id: account.id,
        ...Account.toStorage(account)
      })
    })
}

function changeBalance(id, currency, amount) {
  return accountsDB()
    .get(id)
    .then(doc =>
      accountsDB().put({
        ...doc,
        balance: {
          ...doc.balance,
          [currency]: parseInt(doc.balance[currency], 10) + amount
        }
      })
    )
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}

function remove(id) {
  return accountsDB()
    .get(id)
    .then(doc => accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}

function updateLastSyncedBalance(accounts) {
  accounts.forEach(account => {
    localStorage.setItem(account.id, JSON.stringify(account.balance))
  })
}

async function resolveConflicts(row) {
  if (!row.doc._conflicts) return row.doc

  const lastSyncedBalance = JSON.parse(localStorage.getItem(row.doc._id))
  const conflictedBalances = await Promise.all(
    row.doc._conflicts.map(async rev =>
      accountsDB()
        .get(row.doc._id, { rev })
        .then(doc => doc.balance)
    )
  )
  conflictedBalances.push(row.doc.balance)
  row.doc.balance = resolveBalance(lastSyncedBalance, conflictedBalances)

  return Promise.all(
    row.doc._conflicts.map(async rev => accountsDB().remove(row.doc._id, rev))
  )
    .then(() => accountsDB().put(row.doc))
    .then(() => row.doc)
}

function resolveBalance(lastSynced, conflictedBalances) {
  return Object.keys(lastSynced).reduce((balance, code) => {
    balance[code] =
      lastSynced[code] +
      conflictedBalances.reduce(
        (delta, conflicted) => delta + (conflicted[code] - lastSynced[code]),
        0
      )
    return balance
  }, {})
}
