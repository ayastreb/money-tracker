import omit from 'lodash/omit'
import { accountsDB, remoteAccountsDB } from './pouchdb'

export async function syncAccounts() {
  if (!remoteAccountsDB()) return
  let accounts

  const from = await accountsDB().replicate.from(remoteAccountsDB())
  if (from.docs_written > 0) {
    accounts = await retrieveAccounts()
    updateLastSyncedBalance(accounts)
  }

  const to = await accountsDB().replicate.to(remoteAccountsDB())
  if (to.docs_written > 0) {
    accounts = await retrieveAccounts()
    updateLastSyncedBalance(accounts)
  }

  return accounts
}

function updateLastSyncedBalance(accounts) {
  accounts.forEach(account => {
    localStorage.setItem(account.id, JSON.stringify(account.balance))
  })
}

export async function retrieveAccounts() {
  return accountsDB()
    .allDocs({ include_docs: true, conflicts: true })
    .then(response => Promise.all(response.rows.map(resolveConflicts)))
    .then(docs =>
      docs.map(doc => ({
        id: doc._id,
        name: doc.name,
        group: doc.group,
        balance: doc.balance
      }))
    )
}

async function resolveConflicts(row) {
  if (!row.doc._conflicts) return row.doc

  const lastSyncedBalance = JSON.parse(localStorage.getItem(row.doc._id))
  const conflictedBalances = await Promise.all(
    row.doc._conflicts.map(async rev =>
      accountsDB().get(row.doc._id, { rev }).then(doc => doc.balance)
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

export async function persistAccount(data) {
  const account = omit(data, 'id')
  return accountsDB()
    .get(data.id)
    .then(doc => accountsDB().put({ ...doc, ...account }))
    .catch(err => {
      if (err.status !== 404) throw err
      return accountsDB().put({ _id: data.id, ...account })
    })
}

export async function deleteAccount(id) {
  return accountsDB()
    .get(id)
    .then(doc => accountsDB().put({ ...doc, _deleted: true }))
    .catch(err => {
      if (err.status !== 404) throw err
      return true
    })
}

export async function persistBalanceChange(id, currency, amount) {
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
