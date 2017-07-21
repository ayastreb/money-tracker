import omit from 'lodash/omit'
import { accountsDB, remoteAccountsDB } from './pouchdb'

export function syncAccounts(onChange) {
  if (!remoteAccountsDB()) return

  accountsDB()
    .sync(remoteAccountsDB(), { live: true, retry: true })
    .on('change', onChange)
}

export async function retrieveAccounts() {
  return accountsDB().allDocs({ include_docs: true }).then(response =>
    response.rows.map(row => ({
      id: row.doc._id,
      ...omit(row.doc, '_id', '_rev')
    }))
  )
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
